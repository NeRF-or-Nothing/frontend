import { Container, Group, ActionIcon, rem, Text, Stack, Box } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';

function Footer() {
  return (
    <Box
      component="footer"
      bg="gray.1"
      py="md"
    >
      <Container size="lg">
        <Stack gap="md">
          <Group justify="space-between">
            <Group>
              {/* Replace this Text component with your actual icon component */}
              <Text size="xl" fw={700}>Our Icon Here</Text>
            </Group>
            <Group>
              <ActionIcon 
                size="lg" 
                color="gray" 
                variant="subtle" 
                component="a" 
                href="https://discord.gg/6QAc3FgNSc" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Join our Discord"
              >
                <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon 
                size="lg" 
                color="gray" 
                variant="subtle" 
                component="a" 
                href="https://github.com/NeRF-or-Nothing" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our GitHub"
              >
                <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">© 2023 NeRF-or-Nothing. All rights reserved.</Text>
            <Text size="sm" c="dimmed">Powered by Neural Radiance Fields (NeRF) Technology</Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;