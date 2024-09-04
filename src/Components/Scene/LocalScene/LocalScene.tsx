/**
 * @file LocalScene.tsx
 * @desc LocalScene is a wrapper around the splat cloud viewer component that allows for users to 
 * upload their own .splat file from their computer.
 */

import React, { useState } from 'react';
import { Container, Paper, Title, FileInput, Button, Alert, Box } from '@mantine/core';
import SplatCloudHandler from '../OutputHandlers/SplatCloud/SplatCloudHandler';

const LocalScene: React.FC = () => {
  const [splatFile, setSplatFile] = useState<File | null>(null);
  const [splatData, setSplatData] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSplatFile(file);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (splatFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          setSplatData(new Uint8Array(result));
        }
      };
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
      };
      reader.readAsArrayBuffer(splatFile);
    } else {
      setError('Please select a .splat file first.');
    }
  };

  return (
    <Container size="lg" py="md">
      <Paper shadow="sm" p="md">
        <Title order={2} mb="md">Upload Splat Scene</Title>
        {error && (
          <Alert color="red" mb="md">
            {error}
          </Alert>
        )}
        <FileInput
          label="Choose a .splat file"
          placeholder="Select file"
          accept=".splat"
          onChange={handleFileChange}
          mb="md"
        />
        <Button
          onClick={handleUpload}
          disabled={!splatFile}
        >
          Upload and View
        </Button>
        {splatData && (
          <Box mt="xl">
            <Title order={3} mb="md">Splat Cloud Viewer</Title>
            <Box h={500}>
              <SplatCloudHandler data={splatData} />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default LocalScene;