import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import "./App.css";
import HealthWarningScreen from "./components/StartScreen";

function App() {
  return (
    <div className="gridlines">
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/*" element={<HealthWarningScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
