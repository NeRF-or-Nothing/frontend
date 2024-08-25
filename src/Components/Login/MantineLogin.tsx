import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Anchor,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { fetchLogin } from "../../Fetch/CommonApiCalls";
import { AuthContext } from "../../Context/AuthContext";
import { useFetchRetry } from "../../Fetch/Retry";
import classes from "./MantineLogin.module.css";

function MantineLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const retryFetchLogin = useFetchRetry(fetchLogin);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await retryFetchLogin(username, password);

      if (response?.jwtToken) {
        login(response.jwtToken, username);
        navigate("/");
      } else {
        setError(`Login failed. Please try again.\nError: ${response?.error}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{" "}
        <Anchor size="sm" component={Link} to="/Signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Username"
            placeholder="Your username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Anchor component={Link} to="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>

        {error && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Error"
            color="red"
            mt="md"
          >
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default MantineLogin;
