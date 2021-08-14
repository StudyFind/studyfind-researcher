import AccountResearcher from "components/feature/Account/AccountResearcher";

function Account() {
  const handleUpdate = (updated) => {};

  const handleSignOut = () => {};

  const handleChangePassword = ({ password, newPassword }) => {};

  const handleDeleteAccount = ({ email, password }) => {};

  return (
    <AccountResearcher
      user={{}}
      handleUpdate={handleUpdate}
      handleSignOut={handleSignOut}
      handleChangePassword={handleChangePassword}
      handleDeleteAccount={handleDeleteAccount}
    />
  );
}

export default Account;
