
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "../src/components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
