import { firestore } from "database/firebase";
import { getTimezone } from "database/getters";

const researcherRef = (uid) => firestore.collection("researchers").doc(uid);

export const researcher = {
  create: (uid, name) =>
    researcherRef(uid).set({
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
    uid,
    {
      organization,
      background,
      timezone: { region, autodetect },
      notifications: { local, email, phone },
    }
  ) =>
    firestore.collection("researchers").doc(uid).update({
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

  delete: (uid) => firestore.collection("researchers").doc(uid).reearcherRef.delete(),
};
