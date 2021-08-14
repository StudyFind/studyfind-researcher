import { useEffect } from "react";
import { firestore } from "database/firebase";

import moment from "moment";

function useDetectTimezone(user) {
  useEffect(() => {
    if (user) {
      const { region, autodetect } = user.timezone;

      moment.tz.setDefault(region);

      if (autodetect) {
        const guessed = moment.tz.guess(true);

        if (guessed !== region) {
          firestore
            .collection("researchers")
            .doc(user.id)
            .update({ timezone: { region: guessed, autodetect } });

          moment.tz.setDefault(guessed);
        }
      }
    }
  }, [user]);
}

export default useDetectTimezone;
