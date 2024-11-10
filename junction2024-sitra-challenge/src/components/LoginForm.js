import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Import CSS for styling

// Helper function to generate a "Metamask-like" address
const generateRandomAddress = () => {
  const randomBytes = new Uint8Array(16); // 16 bytes (128 bits)
  crypto.getRandomValues(randomBytes);
  let address = "0x";
  randomBytes.forEach((byte) => {
    address += byte.toString(16).padStart(2, "0");
  });
  return address;
};

const LoginForm = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");  // Store the generated user ID
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (username && password) {
      // Generate a unique user ID (simulating a wallet address)
      const generatedId = generateRandomAddress();
      setUserId(generatedId);  // Set user ID state

      setLoginMessage("Login successful!");

      // Save the generated user ID in localStorage
      localStorage.setItem("userId", generatedId);

      // Redirect to DAO page after successful login
      setTimeout(() => {
        navigate("/forum");  // Navigate to the DAO page
      }, 1000);  // Delay the redirection for 1 second (to show the success message)
    } else {
      setLoginMessage("Please fill in both fields.");
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-container">
        <h1>Sign in</h1>
        <p>to continue to your account</p>
        <form id="login-form" onSubmit={handleLoginSubmit} className="login-form">
          <input
            type="text"
            placeholder="Email address or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Continue</button>
        </form>

        {userId && (
          <div className="user-id-container">
            <p>Your unique ID: <strong>{userId}</strong></p>
          </div>
        )}

        <p id="login-result">{loginMessage}</p>

      </div>
      
      {/* Background Elements */}
      <div className="background-decorations">
        <div className="green-star"></div>
        <div className="pink-cloud"></div>
      </div>
    </div>
  );
};

export default LoginForm;


