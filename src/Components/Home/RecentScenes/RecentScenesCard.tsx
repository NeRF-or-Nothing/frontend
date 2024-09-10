import { Card, Title, Grid, Text, Image } from '@mantine/core';

interface Scene {
  id: string;
  name: string;
  thumbnailUrl: string;
}

interface RecentScenesCardProps {
  scenes: Scene[];
}

export function RecentScenesCard({ scenes }: RecentScenesCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} ta="center" mb="md">Recent Scenes</Title>
      <Grid>
        {scenes.map((scene) => (
          <Grid.Col key={scene.id} span={3}>
            <Card shadow="sm" padding="xs" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={scene.thumbnailUrl}
                  height={100}
                  alt={`Thumbnail for ${scene.name}`}
                />
              </Card.Section>
              <Text size="sm" fw={500} mt="sm">
                {scene.name}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
}