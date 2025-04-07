import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import "./App.css";
import HomePage from "./pages/HomePage";
import WiiTemplate from "./pages/WiiTemplate";
import HealthWarningScreen from "./components/StartScreen";

function App() {
  return (
    <div className="gridlines">
      <CustomCursor />
      <Router>
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
