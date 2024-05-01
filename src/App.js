import "./App.css";
// import "./Sass";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/user/headers/Header";
import Home from "./components/user/home/Home";
import Product from "./components/user/home/prouduct/Product";
import UserCart from "./components/user/cart/UserCart";
import Status from "./components/user/status/Status";
import Login from "./Authentication/Login";
import Dashboard from "./components/admin/dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/usercart/:id" element={<UserCart />} />
          <Route path="/status/:id" element={<Status />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
