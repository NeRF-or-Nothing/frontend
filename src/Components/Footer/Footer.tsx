import { Container, Group, ActionIcon, rem, Text } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import classes from './Footer.module.css';

function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      <Group>
          {/* Replace this Text component with your actual icon component */}
          <Text size="xl" fw={700}> Our Icon Here</Text>
        </Group>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://discord.gg/6QAc3FgNSc" target="_blank" rel="noopener noreferrer">
            <IconBrandDiscord style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://github.com/NeRF-or-Nothing" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;