import { useEffect } from "react";
import { firestore } from "database/firebase";

import moment from "moment";
import useDetectTimezone from "hooks";

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
