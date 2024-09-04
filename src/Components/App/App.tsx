/**
 * @file MantineApp.tsx
 * @description The main component for the Mantine App. Contains MantineProvider to pass ui context to children
 * components. Contains AuthProvier to pass user context to children components. Contains AppShell to provide
 */

import {
  MantineProvider,
  AppShell,
  ColorSchemeScript,
} from "@mantine/core";
import { theme } from "../../theme";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "../../Context/AuthContext";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import SceneHistory from "../SceneHistory/SceneHistory";
import Scene from "../Scene/Scene";
import LocalScene from "../Scene/LocalScene/LocalScene";

function MantineApp() {

  return (
      <MantineProvider theme={{ ...theme }} >
        <ColorSchemeScript defaultColorScheme="dark" />
        <Router>
          <AuthProvider>
            <AppShell header={{ height: 60 }} padding="md">
              
              <AppShell.Header>
                <Header />
              </AppShell.Header>

              <AppShell.Main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Home" element={<Home />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/SceneHistory" element={<SceneHistory />} />\
                  <Route path="/Scene" element={<Scene />} />
                  <Route path="/Scene/LocalScene" element={<LocalScene />} />
                  {/* Add other routes here */}
                </Routes>
              </AppShell.Main>

              <AppShell.Footer>
                  <Footer />
              </AppShell.Footer>
              
            </AppShell>
          </AuthProvider>
        </Router>
      </MantineProvider>
  );
}

export default MantineApp;
