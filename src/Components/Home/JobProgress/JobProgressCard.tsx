import { Card, Stack, Title, Text, Progress, Tooltip } from '@mantine/core';
import { SceneProgressResponse } from '../../../Types/Responses';

interface JobProgressCardProps {
  sceneID: string;
  progress: SceneProgressResponse | null;
}

export function JobProgressCard({ sceneID, progress }: JobProgressCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title order={4} ta="center">Job Information</Title>
        <Tooltip label="Unique identifier for your scene" position="top" withArrow>
          <Text ta="center" fw={700}>Scene ID: {sceneID}</Text>
        </Tooltip>
        {progress && progress.processing && (
          <>
            <Title order={5} ta="center">
              Overall Progress: ({progress.overall_position}/{progress.overall_size})
            </Title>
            <Progress
              value={((progress.overall_size - progress.overall_position) / progress.overall_size) * 100}
              size="xl"
              radius="xl"
              animated
            />
            <Title order={5} ta="center">
              Stage {progress.stage} Progress: ({progress.current_position}/{progress.current_size})
            </Title>
            <Progress
              value={((progress.current_size - progress.current_position) / progress.current_size) * 100}
              size="xl"
              radius="xl"
              animated
            />
            <Text ta="center" size="sm" c="dimmed">
              Estimated time remaining: {Math.round(((progress.current_size - progress.current_position) / progress.current_size) * 100)} minutes
            </Text>
          </>
        )}
      </Stack>
    </Card>
  );
}