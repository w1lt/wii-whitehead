import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import CustomCursor from "./CustomCursor";
import "./App.css";
import HomePage from "./pages/HomePage";
import WiiTemplate from "./pages/WiiTemplate";
import HealthWarningScreen from "./components/StartScreen";
import { useEffect } from "react";

function App() {
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
  return (
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
  );
}

export default App;
