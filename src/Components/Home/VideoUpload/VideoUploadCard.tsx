import { Card, Stack, Title, Text, Tooltip } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import VideoUpload from './VideoUpload';
import { RequestMetaData } from '../../../Types/Responses';

interface VideoUploadCardProps {
  onUpload: (newJobInfo: RequestMetaData) => void;
}

export function VideoUploadCard({ onUpload }: VideoUploadCardProps) {
  const { ref } = useHover();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={3} ta="center">Upload Your Video for 3D Reconstruction</Title>
        <Text ta="center" size="sm" c="dimmed">
          Select a video file (max 16MB, .mp4 format) to start the magic of 3D scene reconstruction.
        </Text>
        <Tooltip
          label="Click to upload your video"
          position="bottom"
          withArrow
          transitionProps={{ duration: 200 }}
        >
          <div ref={ref}>
            <VideoUpload onUpload={onUpload} />
          </div>
        </Tooltip>
      </Stack>
    </Card>
  );
}