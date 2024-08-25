import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title order={1}>Welcome to NeRF-or-Nothing</Title>
      <Text>Next generation interactive scene reconstruction powered by Deep Learning</Text>
      <Group mt="xl">
        <Button onClick={() => navigate('/Scene/UploadASplatScene')}>
          Upload a Scene
        </Button>
        <Button onClick={() => navigate('/MyScenes')}>
          View My Scenes
        </Button>
      </Group>
    </Container>
  );
}

export default Home;