import AccountResearcher from "components/feature/Account/AccountResearcher";
import { useContext } from "react";
import { UserContext } from "context";

import { researcher } from "database/mutations";
import { changePassword, deleteAccount, signout } from "database/auth";

function Account() {
  const user = useContext(UserContext);

  const handleUpdate = (updated) => {
    return researcher.update(updated);
  };

  return (
    <AccountResearcher
      user={user}
      handleUpdate={handleUpdate}
      handleSignOut={signout}
      handleChangePassword={changePassword}
      handleDeleteAccount={deleteAccount}
    />
  );
}

export default Account;
