/**
 * @file Signup.tsx
 * @desc This component allows the user to sign up for the application. Upon successful registration,
 * user is redirected to login page.
 */

import { useState } from "react";
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
import { fetchRegister } from "../../Fetch/CommonApiCalls";
import { useFetchRetry } from "../../Fetch/Retry";
import classes from "./Signup.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const retryFetchRegister = useFetchRetry(fetchRegister);

  // Submit registration form to backend
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await retryFetchRegister(username, password);

      if (response?.success) {
        navigate("/Login");
      } else {
        setError(
          `Registration failed. Please try again.\nError: ${response?.error}`
        );
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Lets Get Nerfing!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component={Link} to="/Login">
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSignup}>
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
            Create Account
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

export default Login;
