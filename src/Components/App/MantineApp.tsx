import {
  MantineProvider,
  AppShell,
  useMantineColorScheme,
  ColorSchemeScript,
} from "@mantine/core";
import { AuthProvider } from "../../Context/AuthContext";
import { MantineHeader } from "../Header/MantineHeader";
import MantineHome from "../Home/MantineHome";
import { theme } from "../../theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function MantineApp() {

  return (
      <MantineProvider theme={{ ...theme }} >
        <ColorSchemeScript defaultColorScheme="dark" />
        <Router>
          <AuthProvider>
            <AppShell header={{ height: 60 }} padding="md">
              <AppShell.Header>
                <MantineHeader />
              </AppShell.Header>

              <AppShell.Main>
                <Routes>
                  <Route path="/" element={<MantineHome />} />
                  <Route path="/Home" element={<MantineHome />} />
                  {/* Add other routes here */}
                </Routes>
              </AppShell.Main>
            </AppShell>
          </AuthProvider>
        </Router>
      </MantineProvider>
  );
}

export default MantineApp;
