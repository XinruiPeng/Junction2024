import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import the new GoogleLogin component

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
  const [userId, setUserId] = useState("");  // Store the generated user ID
  const navigate = useNavigate();

  // Handle Google login success
  const handleGoogleLoginSuccess = (response) => {
    if (response && response.credential) {
      const user = response; // Get user data from the Google response
      // Use Gmail email or other profile data for user ID generation
      const generatedId = generateRandomAddress();
      setUserId(generatedId);  // Set user ID state

      setLoginMessage("Login successful!");

      // Save the generated user ID in localStorage
      localStorage.setItem("userId", generatedId);

      // Redirect to DAO page after successful login
      setTimeout(() => {
        navigate("/forum");  // Navigate to the DAO page
      }, 1000);  // Delay the redirection for 1 second (to show the success message)
    }
  };

  // Handle Google login failure
  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error: ", error);
    setLoginMessage("Google login failed, please try again.");
  };

  return (
    <div className="login-form-container">
      <h1>Welcome to the Demo Login Page</h1>

      {/* Google Login Button */}
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}  // On success callback
        onError={handleGoogleLoginFailure}  // On failure callback
      />

      <p id="login-result">{loginMessage}</p>

      {userId && (
        <div className="user-id-container">
          <p>Your unique ID: <strong>{userId}</strong></p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;


