import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import CustomCursor from "./CustomCursor";
import "./App.css";
import HomePage from "./pages/HomePage";
import WiiTemplate from "./pages/WiiTemplate";
import HealthWarningScreen from "./components/StartScreen";
import { SoundProvider } from "./contexts/SoundContext";

// Simple mobile device check
const isMobileDevice = () => /Mobi|Android|iPhone/i.test(navigator.userAgent);

// Fallback page shown on mobile
function MobileFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen bg-zinc-950 text-white relative">
      <span className="absolute top-4 text-sm text-zinc-400">
        visit on desktop for full experience
      </span>
      <a href="https://l.willwhitehead.com/">linkedin</a>
      <a href="https://g.willwhitehead.com/">github</a>
    </div>
  );
}

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath) {
      sessionStorage.removeItem("redirect");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  if (isMobileDevice()) {
    return <MobileFallback />;
  }

  return (
    <SoundProvider>
      <div className="gridlines">
        <CustomCursor />
        <Router>
          <RedirectHandler />
          <Routes>
            <Route path="/" element={<HealthWarningScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/*" element={<WiiTemplate />} />
          </Routes>
        </Router>
      </div>
    </SoundProvider>
  );
}

export default App;
