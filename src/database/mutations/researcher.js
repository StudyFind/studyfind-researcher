import { firestore } from "database/firebase";
import { getTimezone, getUID } from "database/getters";

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

  update: ({
    organization,
    background,
    timezone: { region, autodetect },
    notifications: { local, email, phone },
  }) =>
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

  delete: () => firestore.collection("researchers").doc(uid).reearcherRef.delete(),
};
