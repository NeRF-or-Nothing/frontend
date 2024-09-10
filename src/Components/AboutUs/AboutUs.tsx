import { useState } from 'react';
import { Container, Title, Text, Stack, Image, Group, Button, Card, SimpleGrid, Accordion, ThemeIcon, List, rem, useMantineTheme, ActionIcon, Box, Grid, Divider } from '@mantine/core';
import { IconBrandGithub, IconBrandDiscord, IconVideo, Icon3dCubeSphere, IconSun, IconMoon, IconUserShield, IconDeviceLaptop } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export default function Component() {
  const [activeTab, setActiveTab] = useState<string | null>('what-we-offer');
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const bgColor = colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[7];
  const textColor = colorScheme === 'light' ? theme.colors.dark[9] : theme.colors.gray[0];

  const offerItems = [
    { icon: IconUserShield, title: 'User Authentication', description: 'Secure and intuitive account management.', color: 'blue' },
    { icon: IconVideo, title: 'Video Upload', description: 'Easy upload and processing of video content.', color: 'green' },
    { icon: Icon3dCubeSphere, title: 'Scene Reconstruction', description: 'Turn 2D videos into detailed 3D visualizations.', color: 'yellow' },
    { icon: IconDeviceLaptop, title: '3D Visualization', description: 'Interact with and explore your 3D creations.', color: 'red' },
  ];

  return (
    <Box style={{ backgroundColor: bgColor, color: textColor, minHeight: '100vh' }}>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Group justify="space-between" align="center">
            <Title order={1} ta="center" style={{ fontWeight: 900, fontSize: rem(36) }}>
              Revolutionizing 3D Scene Creation
            </Title>
            <ActionIcon
              variant="outline"
              color={colorScheme === 'dark' ? 'yellow' : 'blue'}
              onClick={toggleColorScheme}
              title="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
          
          <Image
            src="https://images.unsplash.com/photo-1633127365943-3e3a23163d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            height={400}
            alt="NeRF-or-Nothing 3D Scene Example"
            radius="md"
            style={{ objectFit: 'cover' }}
          />
          <Text size="xl" ta="center" fw={700} style={{ fontStyle: 'italic' }}>
            Experience the Power of NeRF Technology
          </Text>
          
          <Text size="lg" style={{ lineHeight: 1.6 }}>
            Welcome to NeRF-or-Nothing, where we bring the next generation of 3D scene reconstruction technology directly to your fingertips. Our platform allows users to seamlessly create and interact with realistic 3D scenes, powered by cutting-edge Neural Radiance Fields (NeRF) technology.
          </Text>
          
          <Text size="lg" style={{ lineHeight: 1.6 }}>
            At NeRF-or-Nothing, we are revolutionizing the way 3D scenes are generated from video content. Our full-stack application enables users to upload their videos, which are then processed and transformed into dynamic, immersive 3D visualizations. By leveraging advanced AI and deep learning models, NeRF technology captures the intricate details of a scene, recreating it with stunning accuracy and realism.
          </Text>

          <Divider my="lg" />

          <Accordion
            value={activeTab}
            onChange={setActiveTab}
            variant="separated"
            styles={{
              item: {
                backgroundColor: colorScheme === 'light' ? theme.white : theme.colors.dark[6],
                border: `1px solid ${colorScheme === 'light' ? theme.colors.gray[3] : theme.colors.dark[4]}`,
                '&[data-active]': {
                  backgroundColor: colorScheme === 'light' ? theme.colors.blue[0] : theme.colors.dark[7],
                },
              },
              control: {
                '&:hover': {
                  backgroundColor: colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[5],
                },
              },
            }}
          >
            <Accordion.Item value="what-we-offer">
              <Accordion.Control>
                <Text fw={700} size="lg">Innovative Features</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Grid gutter="md">
                  {offerItems.map((item, index) => (
                    <Grid.Col key={index} span={isMobile ? 12 : 6}>
                      <Group wrap="nowrap" align="flex-start">
                        <ThemeIcon size={36} radius="md" variant="light" color={item.color}>
                          <item.icon size={rem(18)} />
                        </ThemeIcon>
                        <div>
                          <Text fw={500} size="md">{item.title}</Text>
                          <Text size="sm" c="dimmed" mt={4}>
                            {item.description}
                          </Text>
                        </div>
                      </Group>
                    </Grid.Col>
                  ))}
                </Grid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="our-mission">
              <Accordion.Control>
                <Text fw={700} size="lg">Our Vision</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="md" mb="md" style={{ lineHeight: 1.6 }}>
                  We are committed to pushing the boundaries of 3D technology, making scene reconstruction accessible and user-friendly for everyone. Whether you're an individual creator or a professional in fields such as gaming, virtual reality, or architecture, NeRF-or-Nothing empowers you to unlock new dimensions of creativity and exploration.
                </Text>
                <List
                  spacing="xs"
                  size="sm"
                  icon={
                    <ThemeIcon color="teal" size={20} radius="xl">
                      <Icon3dCubeSphere size={rem(12)} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>Democratize 3D scene reconstruction technology</List.Item>
                  <List.Item>Empower creators with cutting-edge AI tools</List.Item>
                  <List.Item>Foster innovation in virtual reality and digital twin applications</List.Item>
                  <List.Item>Build a community of passionate 3D enthusiasts and professionals</List.Item>
                </List>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="why-choose-us">
              <Accordion.Control>
                <Text fw={700} size="lg">Why NeRF-or-Nothing?</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="md" mb="md" style={{ lineHeight: 1.6 }}>
                  Our platform simplifies the complexity of NeRF technology, offering a streamlined and accessible experience for users. From secure video uploads to efficient scene processing and visualization, we handle the heavy lifting while you focus on bringing your ideas to life.
                </Text>
                <SimpleGrid cols={isMobile ? 1 : 2} spacing="sm">
                  {[
                    { title: 'User-Friendly Interface', description: 'Intuitive design for easy 3D scene creation.' },
                    { title: 'Cutting-Edge Technology', description: 'Powered by the latest in Neural Radiance Fields.' },
                    { title: 'Scalable Infrastructure', description: 'Handles projects of any size or complexity.' },
                    { title: 'Continuous Innovation', description: 'Regular updates to keep you at the forefront.' },
                  ].map((item, index) => (
                    <Card key={index} shadow="sm" padding="sm" radius="md" withBorder>
                      <Text fw={500} size="sm">{item.title}</Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {item.description}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Divider my="lg" />

          <Title order={2} ta="center" mt="xl" style={{ fontWeight: 700, fontSize: rem(28) }}>
            Join Our Innovative Community
          </Title>
          <Text size="md" ta="center" style={{ maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Be part of the NeRF revolution! Join our vibrant community of creators, developers, and 3D enthusiasts. Share your projects, get support, and collaborate on groundbreaking ideas.
          </Text>
          
          <Group justify="center" gap="md">
            <Button
              size="sm"
              component="a"
              href="https://github.com/NeRF-or-Nothing"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandGithub size={rem(14)} />}
              styles={(theme) => ({
                root: {
                  backgroundColor: colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                  color: colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
                  '&:hover': {
                    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                  },
                },
              })}
            >
              GitHub
            </Button>
            <Button
              size="sm"
              component="a"
              href="https://discord.gg/6QAc3FgNSc"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconBrandDiscord size={rem(14)} />}
              styles={{
                root: {
                  backgroundColor: '#5865F2',
                  '&:hover': {
                    backgroundColor: '#4752C4',
                  },
                },
              }}
            >
              Discord
            </Button>
          </Group>

          <Text size="md" ta="center" mt="xl" style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Join us on this exciting journey as we continue to innovate and redefine the possibilities of 3D scene creation. At NeRF-or-Nothing, the future of 3D is now – and it's nothing short of extraordinary.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}