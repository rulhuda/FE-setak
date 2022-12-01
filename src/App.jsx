import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/Auth";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Play from "./pages/Play";
import { ThemeProvider } from "./contexts/Theme";
import { PlayingProvider } from "./contexts/IsPlaying";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { AudioProvider } from "./contexts/Audio";
import Guide from "./pages/Guide";

function App() {
  return (
    <>
      <ThemeProvider>
        <PlayingProvider>
          <AuthProvider>
            <AudioProvider>
              <Routes>
                <Route element={<Navbar />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/play" element={<Play />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </AudioProvider>
          </AuthProvider>
        </PlayingProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
