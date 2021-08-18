import { useEffect } from "react";
import { useDetectTimezone } from "hooks";
import { firestore } from "database/firebase";

import moment from "moment";

function useAutoUpdateTimezone(user) {
  const detected = useDetectTimezone();

  useEffect(() => {
    if (user) {
      const { region, autodetect } = user.timezone;

      if (autodetect && region !== detected) {
        firestore
          .collection("researchers")
          .doc(user.id)
          .update({ timezone: { ...user.timezone, region: detected } });

        moment.tz.setDefault(detected);
      } else {
        moment.tz.setDefault(region);
      }
    }
  }, [user]);
}

export default useAutoUpdateTimezone;
