/**
 * @file Header.tsx
 * @desc This file defines the header component. Header component contains navigation links,
 * color toggle, and user account dropdown. The header supports authenticated only links/additions.
 */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Text,
  UnstyledButton,
  Avatar,
  Menu,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./Header.module.css";

function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark");
  const navigate = useNavigate();

  const links = useMemo(() => {
    const baseLinks = [
      { link: "/Home", label: "Home" },
      { link: "/About", label: "About Us" },
      { link: "/Scene/LocalScene", label: "Render Local Scene" },
    ];

    if (isAuthenticated) {
      baseLinks.push({ link: '/SceneHistory', label: 'My Scenes' });
    }

    return baseLinks;
  }, [isAuthenticated]);

  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  function cx(...args: (string | undefined)[]): string {
    return args.filter(Boolean).join(' ');
  }

  return (
    <header className={classes.root}>
      <Container size="md" className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Title order={3}>NeRF-or-Nothing</Title>
            <Text size="sm">Next-gen 3D Scene Reconstruction</Text>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            {items}
          </Group>

          <Group visibleFrom="sm">
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
            {isAuthenticated ? (
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
              >
                <Menu.Target>
                  <UnstyledButton className={classes.user}>
                    <Group gap={7}>
                      <Avatar radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {username}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  >
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <UnstyledButton className={classes.link} onClick={() => navigate("/Signup")}>
                  Sign up
                </UnstyledButton>
                <UnstyledButton className={classes.link} onClick={() => navigate("/Login")}>
                  Log in
                </UnstyledButton>
              </>
            )}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
            {isAuthenticated ? (
              <UnstyledButton
                className={classes.link}
                onClick={() => {
                  logout();
                  navigate("/login");
                  close();
                }}
              >
                Logout
              </UnstyledButton>
            ) : (
              <>
                <UnstyledButton
                  className={classes.link}
                  onClick={() => {
                    navigate("/Signup");
                    close();
                  }}
                >
                  Sign up
                </UnstyledButton>
                <UnstyledButton
                  className={classes.link}
                  onClick={() => {
                    navigate("/Login");
                    close();
                  }}
                >
                  Log in
                </UnstyledButton>
              </>
            )}
          </Paper>
        )}
      </Transition>
    </header>
  );
}

export default Header;