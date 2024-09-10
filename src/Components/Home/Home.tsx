import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppShell,
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  BackgroundImage,
  Overlay,
  SimpleGrid,
  ThemeIcon,
  Card,
  List,
  Accordion,
  rem,
} from "@mantine/core";
import { IconLock, IconBrain, Icon3dCubeSphere, IconUpload, IconRefresh, IconEye, IconBrandGithub, IconBulb, IconCamera, IconDeviceLaptop } from '@tabler/icons-react';
import { RequestMetaData, SceneProgressResponse } from "../../Types/Responses";
import { fetchSceneProgress } from "../../Fetch/CommonApiCalls";
import { useAuthFetchRetry } from "../../Fetch/Retry";
import { AuthContext } from "../../Context/AuthContext";
import { VideoUploadCard } from "./VideoUpload/VideoUploadCard";
import { JobProgressCard } from "./JobProgress/JobProgressCard";
import { RecentScenesCard } from "./RecentScenes/RecentScenesCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NotificationSystem } from "../Common/NotificationSystem";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const [sceneID, setSceneId] = useState<string | null>(null);
  const [progress, setProgress] = useState<SceneProgressResponse | null>(null);
  const [wasProcessing, setWasProcessing] = useState(false);
  const [sceneFinished, setSceneFinished] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const navigate = useNavigate();

  const authRetryFetchSceneProgress = useAuthFetchRetry(fetchSceneProgress);

  useEffect(() => {
    if (sceneID) {
      const interval = setInterval(async () => {
        const progress = await authRetryFetchSceneProgress(sceneID);

        if (progress !== null) {
          if (progress.error) {
            console.error(progress.error);
            setNotification({ message: 'Error fetching progress', type: 'error' });
            return;
          }
          setProgress(progress);

          if (!wasProcessing && progress.processing) {
            setWasProcessing(true);
            setNotification({ message: 'Scene processing started', type: 'info' });
          }

          if (wasProcessing && !progress.processing) {
            setWasProcessing(false);
            setSceneFinished(true);
            setNotification({ message: 'Scene processing finished', type: 'success' });
          }
        }
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [authRetryFetchSceneProgress, sceneID, wasProcessing]);

  const handleUpload = (newJobInfo: RequestMetaData) => {
    if (newJobInfo.error) {
      console.error(newJobInfo.error);
      setNotification({ message: 'Error uploading video', type: 'error' });
      return;
    }
    setSceneId(newJobInfo.id);
    setNotification({ message: 'Video uploaded successfully', type: 'success' });
  };

  const HeroSection = () => (
    <BackgroundImage
      src="https://images.unsplash.com/photo-1633127365943-3e3a23163d57?auto=format&fit=crop&w=2070&q=80"
      h={600}
    >
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      <Container size="lg" h="100%" pos="relative" style={{ zIndex: 2 }}>
        <Stack h="100%" justify="center" align="center" gap="xl">
          <Title order={1} ta="center" c="white" size={48}>
            NeRF-or-Nothing
          </Title>
          <Text size="xl" ta="center" c="white" maw={600}>
            Transform your videos into immersive 3D scenes with cutting-edge Neural Radiance Fields technology.
          </Text>
          <Group mt="xl">
            <Button size="lg" onClick={() => navigate("/Signup")}>Get Started</Button>
            <Button size="lg" variant="outline" color="gray" onClick={() => navigate("/Login")}>Sign In</Button>
            <Button size="lg" variant="subtle" color="gray" onClick={() => navigate("/About")}>Discover More</Button>
          </Group>
        </Stack>
      </Container>
    </BackgroundImage>
  );

  const KeyFeaturesSection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Key Features</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {[
          { icon: IconLock, title: 'Secure Processing', description: 'Your data is protected with state-of-the-art encryption and security measures.' },
          { icon: IconBrain, title: 'AI-Powered Reconstruction', description: 'Advanced algorithms transform your videos into detailed, interactive 3D scenes.' },
          { icon: Icon3dCubeSphere, title: 'Immersive Exploration', description: 'Interact with your created scenes in a fully immersive 3D environment.' },
        ].map((feature, index) => (
          <Card key={index} shadow="md" padding="lg" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" variant="light" color="blue">
              <feature.icon size={30} />
            </ThemeIcon>
            <Text fw={700} size="lg" mt="md">{feature.title}</Text>
            <Text size="sm" c="dimmed" mt="sm">{feature.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );

  const HowItWorksSection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">How It Works</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {[
          { icon: IconUpload, title: 'Upload Your Video', description: 'Select and upload your video file to our secure cloud platform.' },
          { icon: IconRefresh, title: 'AI Processing', description: 'Our advanced AI processes your video, reconstructing it into a detailed 3D scene.' },
          { icon: IconEye, title: 'Explore in 3D', description: 'Dive into your newly created 3D scene and explore it from any angle.' },
        ].map((step, index) => (
          <Card key={index} shadow="md" padding="lg" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" variant="light" color="green">
              <step.icon size={30} />
            </ThemeIcon>
            <Text fw={700} size="lg" mt="md">{step.title}</Text>
            <Text size="sm" c="dimmed" mt="sm">{step.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );

  const TechnologySection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">The Technology Behind NeRF</Title>
      <Group align="flex-start" grow>
        <Stack>
          <Text size="lg">
            NeRF-or-Nothing leverages the power of Neural Radiance Fields (NeRF) to revolutionize 3D scene reconstruction. This cutting-edge AI technology transforms 2D videos into stunning, highly detailed 3D environments.
          </Text>
          <Text size="lg" mt="md">
            Our advanced algorithms capture intricate details, lighting effects, and spatial relationships with unprecedented accuracy, opening up new possibilities in computer vision and 3D modeling.
          </Text>
          <Card withBorder radius="md" padding="lg" mt="xl">
            <Text fw={700} size="lg" mb="sm">Key Advantages of NeRF Technology:</Text>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={24} radius="xl" color="blue">
                  <IconBulb style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              }
            >
              <List.Item>Photorealistic 3D Reconstruction</List.Item>
              <List.Item>Accurate Lighting and Reflection Modeling</List.Item>
              <List.Item>Seamless View Synthesis</List.Item>
              <List.Item>Efficient Compression of Complex 3D Scenes</List.Item>
            </List>
          </Card>
        </Stack>
        <Stack>
          <Card withBorder radius="md" padding="lg" mb="md">
            <Group wrap="nowrap">
              <ThemeIcon size={60} radius="md" color="blue" variant="light">
                <IconCamera style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">Input: 2D Video Frames</Text>
                <Text size="sm" c="dimmed">Multiple viewpoints captured in your video</Text>
              </div>
            </Group>
          </Card>
          <Card withBorder radius="md" padding="lg" mb="md">
            <Group wrap="nowrap">
              <ThemeIcon size={60} radius="md" color="green" variant="light">
                <Icon3dCubeSphere style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">NeRF Processing</Text>
                <Text size="sm" c="dimmed">AI-powered 3D scene reconstruction</Text>
              </div>
            </Group>
          </Card>
          <Card withBorder radius="md" padding="lg">
            <Group wrap="nowrap">
              <ThemeIcon size={60} radius="md" color="orange" variant="light">
                <IconDeviceLaptop style={{ width: rem(30), height: rem(30) }} />
              </ThemeIcon>
              <div>
                <Text fw={700} size="lg">Output: Interactive 3D Scene</Text>
                <Text size="sm" c="dimmed">Explore your scene from any angle</Text>
              </div>
            </Group>
          </Card>
        </Stack>
      </Group>
    </Container>
  );

  const BenefitsSection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Benefits of Using NeRF-or-Nothing</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {[
          { title: 'User-Friendly Interface', description: 'Upload videos and create 3D scenes with just a few clicks.' },
          { title: 'High-Precision AI', description: 'Our advanced AI ensures unparalleled accuracy in 3D scene reconstruction.' },
          { title: 'Versatile Applications', description: 'Easily integrate your 3D scenes into VR, AR, and gaming projects.' },
        ].map((benefit, index) => (
          <Card key={index} shadow="md" padding="lg" radius="md" withBorder>
            <Text fw={700} size="lg">{benefit.title}</Text>
            <Text size="sm" c="dimmed" mt="sm">{benefit.description}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );

  const DeveloperSection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Join Our Developer Community</Title>
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Text size="lg" ta="center">
          Are you a developer or creator? Join our open-source community on GitHub and contribute to the future of 3D technology.
        </Text>
        <Group justify="center" mt="xl">
          <Button
            size="lg"
            leftSection={<IconBrandGithub size={rem(18)} />}
            component="a"
            href="https://github.com/NeRF-or-Nothing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute on GitHub
          </Button>
        </Group>
      </Card>
    </Container>
  );

  const FAQSection = () => (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">Frequently Asked Questions</Title>
      <Accordion variant="separated">
        <Accordion.Item value="file-formats">
          <Accordion.Control>What video formats are supported?</Accordion.Control>
          <Accordion.Panel>We currently support MP4, MOV, and AVI video formats for 3D scene creation.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="file-size">
          <Accordion.Control>Is there a limit on video file size?</Accordion.Control>
          <Accordion.Panel>Yes, we support video files up to 500MB in size. For optimal results, we recommend videos between 30 seconds to 2 minutes in length.</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="processing-time">
          <Accordion.Control>How long does it take to process a video?</Accordion.Control>
          <Accordion.Panel>Processing time varies depending on the length and complexity of the video. Typically, it takes between 15-45 minutes for a standard video. Longer or more complex scenes may take up to a few hours.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );

  if (!isAuthenticated) {
    return (
      <AppShell
        padding={0}
        header={{ height: 60 }}
        footer={{ height: 60 }}
      >
        <AppShell.Header><Header /></AppShell.Header>
        <AppShell.Main>
          <HeroSection />
          <KeyFeaturesSection />
          <HowItWorksSection />
          <TechnologySection />
          <BenefitsSection />
          <DeveloperSection />
          <FAQSection />
        </AppShell.Main>
        <AppShell.Footer><Footer /></AppShell.Footer>
      </AppShell>
    );
  }

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 60 }}
    >
      <AppShell.Header><Header /></AppShell.Header>
      <AppShell.Main>
        <Container size="lg">
          <Stack gap="xl">
            <Title order={2} ta="center">
              Next-Generation Interactive Scene Reconstruction Powered by Deep Learning
            </Title>

            <VideoUploadCard onUpload={handleUpload} />

            {sceneID && <JobProgressCard sceneID={sceneID} progress={progress} />}

            {sceneFinished && (
              <Group justify="center">
                <Button onClick={() => navigate("/SceneHistory")}>View All My Scenes</Button>
                <Button onClick={() => navigate(`/Scene?scene_id=${sceneID}`)}>Explore This Scene</Button>
              </Group>
            )}

            <RecentScenesCard scenes={[
              { id: '1', name: 'Urban Landscape', thumbnailUrl: '/placeholder.svg?height=100&width=200' },
              { id: '2', name: 'Nature Trail', thumbnailUrl: '/placeholder.svg?height=100&width=200' },
              { id: '3', name: 'Historic Building', thumbnailUrl: '/placeholder.svg?height=100&width=200' },
              { id: '4', name: 'Futuristic City', thumbnailUrl: '/placeholder.svg?height=100&width=200' },
            ]} />
          </Stack>
        </Container>
      </AppShell.Main>
      <AppShell.Footer><Footer /></AppShell.Footer>
      <NotificationSystem
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </AppShell>
  );
}

export default Home;