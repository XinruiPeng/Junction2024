import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecaptchaForm from "./components/RecaptchaForm";
import LoginForm from "./components/LoginForm";
import DAO from "./components/DAO";
import NavBar from "./components/NavBar";
import "./App.css"; // Import CSS for styling

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Add the Navbar here, before Routes */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />  {/* Login Route */}
        <Route path="/forum" element={<DAO />} />  {/* DAO Route */}
        <Route path="/" element={<RecaptchaForm />} />  {/* Default Route */}
      </Routes>
    </Router>
  );
};

export default App;
