import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecaptchaForm from "./components/RecaptchaForm";
import LoginForm from "./components/LoginForm";
import DAO from "./components/DAO";
import Navbar from "./components/NavBar"; // Import Navbar component
import "./App.css"; // Import CSS for styling

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is now fixed at the top */}
      <div className="main-content"> {/* Wrapper for the main content */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />  {/* Login Route */}
          <Route path="/forum" element={<DAO />} />  {/* DAO Route */}
          <Route path="/" element={<RecaptchaForm />} />  {/* Default Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

