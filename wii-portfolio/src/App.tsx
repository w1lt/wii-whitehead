import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import "./App.css";
import HomePage from "./pages/HomePage";
import WiiTemplate from "./pages/WiiTemplate";

function App() {
  return (
    <div className="gridlines">
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Wrap all non-home routes with the single WiiTemplate */}
          <Route path="/*" element={<WiiTemplate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
