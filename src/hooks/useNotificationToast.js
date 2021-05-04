import { useEffect } from "react";
import { useCollection } from "hooks";
import { useToast } from "@chakra-ui/react";

import { auth, firestore } from "database/firebase";
import { notifications as templates } from "templates";

function useNotificationToast() {
  const toast = useToast();
  const [notifications] = useCollection(
    firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("notifications")
      .orderBy("time")
      .limit(1)
  );

  useEffect(() => {
    if (notifications) {
      const mostRecent = notifications[0];
      const { type, meta, read } = mostRecent;

      const generateTemplate = templates[type] || templates["defaultTemplate"];
      const { title, description } = generateTemplate(meta);

      if (read === false) {
        toast({
          title: title,
          description: description,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  }, [notifications]);
}

export default useNotificationToast;
