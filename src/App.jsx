import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp";
import WeatherApp from "./pages/WeatherApp";
import ShoppingApp from "./pages/ShoppingApp";
import Chess from "./pages/Chess";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project-one" element={<TodoApp />} />
          <Route path="/project-two" element={<WeatherApp />} />
          <Route path="/project-three" element={<ShoppingApp />} />
          <Route path="/project-four" element={<Chess />} />
        </Routes>
      </div>
    </Router>
  );
}
