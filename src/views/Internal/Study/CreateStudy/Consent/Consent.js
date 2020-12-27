import React, { useState } from "react";
import { storage } from "database/firebase";
import {
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Progress,
  Grid,
} from "@chakra-ui/react";

function Consent({ study, setTab }) {
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleFileUpload = () => {
    if (!file) {
      setError("File has not been selected");
      return;
    }

    if (!study.id) {
      setError("Study ID is missing");
    }

    setLoading(true);

    const ref = storage.ref(`consent/${study.id}.pdf`);
    const task = ref.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        const filesize = snapshot.totalBytes;
        const uploaded = snapshot.bytesTransferred;
        const percent = Math.round((100 * uploaded) / filesize);
        setStatus(percent);

        if (percent === 100) {
          setLoading(false);
          setTab("review");
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <Heading size="lg" mb="10px">
        Upload Consent Form
      </Heading>
      <Text mb="10px" color="gray.500">
        This Consent Form will be displayed to interested participants when they decide to enroll
        for this study. They will have to agree to the terms of this consent form before completing
        their enrollment.
      </Text>
      <Grid gap="10px" w="250px">
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <FormControl isInvalid={error}>
            <Input
              bg="white"
              p="4px !important"
              type="file"
              onChange={handleFileSelect}
              isInvalid={error}
              accept="application/pdf"
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        )}
        <Button
          colorScheme="blue"
          onClick={handleFileUpload}
          loadingText="Uploading..."
          isLoading={loading}
          type="submit"
        >
          Upload
        </Button>
      </Grid>
    </div>
  );
}

export default Consent;
