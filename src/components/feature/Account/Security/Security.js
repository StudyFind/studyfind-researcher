import { Divider } from "@chakra-ui/react";

import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Security({ handleChangePassword, handleDeleteAccount }) {
  return (
    <>
      <ChangePassword handleChangePassword={handleChangePassword} />
      <Divider />
      <DeleteAccount handleDeleteAccount={handleDeleteAccount} />
    </>
  );
}

export default Security;
