// src/components/RecaptchaForm.js
import React, { useState } from "react";

const RecaptchaForm = () => {
  const [resultMessage, setResultMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Skip the reCAPTCHA validation for now
    setResultMessage("Verification successful! Redirecting...");

    // Simulate redirection
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to the login page
    }, 1000);
  };

  return (
    <div className="recaptcha-form-container">
      <h1 className="recaptcha-title">Verify you are human</h1>
      <form id="recaptcha-form" onSubmit={handleFormSubmit} className="recaptcha-form">
        <button type="submit" className="recaptcha-button">Submit</button>
      </form>
      <p id="result" className="recaptcha-result">{resultMessage}</p>
    </div>
  );
};

export default RecaptchaForm;