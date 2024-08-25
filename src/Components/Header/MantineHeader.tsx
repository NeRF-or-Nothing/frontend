import React, { useState } from "react";
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
  Switch,
  useMantineTheme,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconSun,
  IconMoonStars,
  IconMoon,
} from "@tabler/icons-react";
import { AuthContext } from "../../Context/AuthContext";
import classes from "./MantineHeader.module.css";

const HEADER_HEIGHT = rem(60);

const links = [
  { link: "/Home", label: "Home" },
  { link: "/About", label: "About" },
  { link: "/Scene/UploadASplatScene", label: "Render Local Scene" },
  // { link: '/MyScenes', label: 'My Scenes' },
];

export function MantineHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark");

  const navigate = useNavigate();
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

  function cx(icon: string, light: string): string | undefined {
    return `${icon} ${light}`;
  }

  return (
    <header className={classes.root}>
      <Container size="md" className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text size="lg" fw={700}>
            NeRF-or-Nothing
          </Text>
          <Group h="100%" gap={0} visibleFrom="sm">
            {items}
          </Group>

          <Group visibleFrom="sm">
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
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
                      <IconChevronDown
                        style={{ width: rem(12), height: rem(12) }}
                        stroke={1.5}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconSettings
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    Account settings
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
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
                <UnstyledButton
                  className={classes.link}
                  onClick={() => navigate("/Signup")}
                >
                  Sign up
                </UnstyledButton>
                <UnstyledButton
                  className={classes.link}
                  onClick={() => navigate("/Login")}
                >
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
