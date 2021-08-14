import { firestore } from "database/firebase";
import { getTimezone } from "database/getters";

const researchersRef = firestore.collection("researchers");

export const researcher = {
  create: (researcherID, name) =>
    researchersRef.doc(researcherID).set({
      name,
      organization: "",
      background: "",
      timezone: {
        region: getTimezone(),
        autodetect: true,
      },
      notifications: {
        local: false,
        email: false,
        phone: false,
      },
    }),

  update: (
    researcherID,
    {
      organization,
      background,
      timezone: { region, autodetect },
      notifications: { local, email, phone },
    }
  ) =>
    researchersRef.doc(researcherID).update({
      organization,
      background,
      timezone: {
        region,
        autodetect,
      },
      notifications: {
        local,
        email,
        phone,
      },
    }),

  delete: (researcherID) => researchersRef.doc(researcherID).delete(),
};
