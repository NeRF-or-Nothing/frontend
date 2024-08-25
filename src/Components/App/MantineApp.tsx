import {
  MantineProvider,
  AppShell,
  ColorSchemeScript,
} from "@mantine/core";
import { theme } from "../../theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "../../Context/AuthContext";
import MantineHeader from "../Header/MantineHeader";
import MantineHome from "../Home/MantineHome";
import MantineLogin from "../Login/MantineLogin";
import MantineSignup from "../Signup/MantineSignup";
import MantineSceneHistory from "../SceneHistory/MantineSceneHistory";

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
                  <Route path="/Login" element={<MantineLogin />} />
                  <Route path="/Signup" element={<MantineSignup />} />
                  <Route path="/MyScenes" element={<MantineSceneHistory />} />
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
