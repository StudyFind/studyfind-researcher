import React from "react";
import { FileInput } from "components";
import { Button, Grid } from "@chakra-ui/react";

function ConsentForm({ error, status, loading, handleSelect, handleUpload }) {
  return (
    <Grid gap="10px" w="250px">
      <FileInput
        loading={loading}
        status={status}
        error={error}
        accept="application/pdf"
        onChange={handleSelect}
      />
      <Button
        colorScheme="blue"
        onClick={handleUpload}
        loadingText="Uploading..."
        isLoading={loading}
        type="submit"
      >
        Upload
      </Button>
    </Grid>
  );
}

export default ConsentForm;
