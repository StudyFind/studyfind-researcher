const functions = require("firebase-functions");
const axios = require("axios");

const verifyIdToken = require("./utils/verify-id-token");
const getUser = require("./utils/get-user");
const addFirestoreEntry = require("./utils/add-firestore-entry");

// Take the nctID text parameter passed to this HTTP endpoint and use flask api to scrape
// its data, create a default unpublished study, and return the data
module.exports = ({ admin }) => async (req, res) => {
  // Disable CORS
  res.set("Access-Control-Allow-Origin", "*");

  // Grab the nctID and user idToken parameters.
  const { nctID, idToken } = req.query;

  if (!nctID) {
    res.status(400);
    return res.json({ error: "parameter nctID needs to be defined" });
  }

  if (!idToken) {
    res.status(400);
    return res.json({ error: "parameter idToken needs to be defined" });
  }

  const auth = admin.auth();
  const firestore = admin.firestore()
  return (
    Promise.all([
      // simultaneously query flask scraper and auth user
      axios
        .get(`https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy?nctID=${nctID}`)
        // check for fail in flask api
        .then((resp) => {
          const d = resp.data;

          if (!d || d.status === "failure") {
            throw Error(`parameter nctID '${nctID}' is likely invalid`);
          }
          delete d.status;

          return d["study"];
        }),
      verifyIdToken(auth, idToken)
        // convert token to user data
        .then((decodedToken) => {
          return getUser(auth, decodedToken.uid);
        })
        .catch((err) => {
          res.status(401);
          throw Error(`parameter idToken '${idToken}' is not a valid firebase user token: ${err}`);
        }),
    ])
      // check emails for match
      .then(([data, user]) => {
        if (data.contactEmail != user.email) {
          res.status(401);
          throw Error(
            `user email '${user.email}' does not match study contact email '${data.contactEmail}'; ownership cannot be verified`
          );
        }
        return [data, user];
      })
      // create questions from study
      .then(([data, user]) => {
        let inclusion = true;
        data.questions = data.additionalCriteria
          .split("\n")
          .map((i) => {
            if (i == "") return null;
            let norm = i.toLowerCase();
            if (norm.includes("exclusion")) {
              inclusion = false;
              return null;
            }
            if (norm.includes("criteria")) return null;
            if (norm.includes("following")) return null;

            return {
              type: inclusion ? "Inclusion" : "Exclusion",
              prompt: i,
            };
          })
          .filter((i) => i != null);

        return [data, user];
      })
      // convert to final study object
      .then(([data, user]) => dataToStudyEntry(data, user))
      // write data to firestore
      .then(async study => {
        const writeResult = await addFirestoreEntry({
          firestore,
          collection: "studies",
          document: nctID,
          data: study
        });
        return { study, entryId: writeResult._path.segments.pop(), error: null };
      })
      // respond
      .then((data) => res.json(data))
      // catch all errors
      .catch((err) => {
        // functions.logger.log(`[getStudy] failed: ${err}`)
        res.json({ study: null, error: err.toString() });
      })
  );
};

// returns default entry from given data/user combo. Designed to be adjustable
// @param data <obj> - data object scraped from nct website by flask app
// @param user <obj> - firebase user object authoring this study
function dataToStudyEntry(data, user) {
  return {
    published: false,
    activated: false,
    updatedAt: Date.now(),
    nctID: data.nctID,
    title: data.title,
    status: data.status,
    description: data.shortDescription,
    researcher: {
      id: user.uid,
      name: data.contactName,
      email: data.contactEmail,
    },
    sex: data.sex,
    age: `${data.minAge}-${data.maxAge}`,
    control: data.control,
    questions: data.questions,
    locations: data.locations,
    conditions: data.conditions
  };
}
