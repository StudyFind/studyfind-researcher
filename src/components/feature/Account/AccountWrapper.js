import { useDetectDevice } from "hooks";

import { Grid } from "@chakra-ui/react";
import AccountButtons from "./AccountButtons";

function AccountWrapper({
  children,
  loading,
  handleCancel,
  handleUpdate,
  showButtons,
}) {
  const { isPhone } = useDetectDevice();

  return (
    <Grid
      gap="30px"
      marginLeft={isPhone ? "0" : "40px"}
      marginTop={isPhone ? "40px" : "0"}
      maxWidth="400px"
    >
      {children}
      {showButtons && (
        <AccountButtons
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
    </Grid>
  );
}

export default AccountWrapper;
