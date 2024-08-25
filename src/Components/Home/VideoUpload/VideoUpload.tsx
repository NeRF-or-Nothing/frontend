import React, { useState } from 'react';
import { FileInput, Button, Alert, Stack } from '@mantine/core';
import { IconUpload, IconAlertCircle } from '@tabler/icons-react';
import { RequestMetaData } from '../../../Types/Responses';
import { fetchPostVideo } from '../../../Fetch/CommonApiCalls';
import ConfigSelector from './ConfigSelector';
import { TrainingConfig } from '../../../Types/TrainingConfig';
import { useAuthFetchRetry } from '../../../Fetch/Retry';

interface VideoUploadProps {
  onUpload: (data: RequestMetaData) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<TrainingConfig>({
    trainingMode: 'gaussian',
    outputTypes: [],
    saveIterations: [],
    sceneName: '',
  });

  const authRetryFetchPostVideo = useAuthFetchRetry(fetchPostVideo);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFile(file);
      setError(null);
    }
  };

  const handleConfigChange = (newConfig: typeof config) => {
    setConfig(newConfig);
  };

  const isConfigValid = () => {
    return (
      config.trainingMode !== '' &&
      config.outputTypes.length > 0 &&
      config.saveIterations.length > 0
    );
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const response = await authRetryFetchPostVideo(file, config);
    
    setUploading(false);

    if (response !== null) {
      onUpload(response);
    } else {
      setError('Upload failed');
    }
  };

  return (
    <Stack >
      <FileInput
        accept=".mp4"
        label="Choose video file"
        placeholder="Click to select file"
        rightSection={<IconUpload size="1rem" />}
        onChange={handleFileChange}
      />
      
      {file && (
        <>
          <ConfigSelector onConfigChange={handleConfigChange} />
          <Button
            onClick={handleUpload}
            disabled={uploading || !isConfigValid()}
            loading={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </Button>
        </>
      )}
      
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default VideoUpload;