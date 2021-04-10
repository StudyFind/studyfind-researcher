import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { firestore } from "database/firebase";
import lodash from "lodash";

function useAccount(user) {
  const original = {
    bio: user.bio || "",
    timezone: user.timezone || "",
    organization: user.organization || "",
  };

  const toast = useToast();
  const [inputs, setInputs] = useState(original);

  const isDifferent = !lodash.isEqual(original, inputs);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setInputs(original);
  };

  const handleUpdate = () => {
    firestore
      .collection("researchers")
      .doc(user.id)
      .update({
        timezone: inputs.timezone,
        organization: inputs.organization,
        bio: inputs.bio,
      })
      .then(() =>
        toast({
          title: "Your account was successfully updated!",
          status: "success",
          duration: 2500,
        })
      )
      .catch(() =>
        toast({
          title: "Your account could not be updated. Please try again later!",
          status: "error",
          duration: 2500,
        })
      );
  };

  return [inputs, isDifferent, handleChange, handleUpdate, handleCancel];
}

export default useAccount;
