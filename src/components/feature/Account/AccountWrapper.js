import { useContext } from "react";
import MediaContext from "context/MediaContext";

import { Grid } from "@chakra-ui/react";
import AccountButtons from "./AccountButtons";

function AccountWrapper({
  children,
  loading,
  handleCancel,
  handleUpdate,
  showButtons,
}) {
  const { isPhone } = useContext(MediaContext);

  return (
    <Grid gap="30px" paddingLeft={isPhone ? "0" : "40px"} maxWidth="400px">
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
