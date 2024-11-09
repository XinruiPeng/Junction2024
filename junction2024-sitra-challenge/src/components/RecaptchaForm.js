// src/components/RecaptchaForm.js
import React, { useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.grecaptcha.getResponse();

    if (!token) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    const response = await fetch('/.netlify/functions/verify-recaptcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();
    if (result.success) {
      window.location.href = "/login";
    } else {
      setMessage(result.message || "Verification failed. Please try again.");
    }

    window.grecaptcha.reset(); // Reset reCAPTCHA after submission
  };

  return (
    <div>
      <h1 className="recaptcha-title">Verify you are human</h1>
      <form onSubmit={handleSubmit} className="recaptcha-form">
        <ReCAPTCHA
          sitekey="6LfwZXkqAAAAADQrIZ_E5QPpmp6qVG8Dhxuc7wWW"
          onChange={(token) => window.grecaptchaResponse = token}
        />
        <button type="submit" className="recaptcha-button">Submit</button>
      </form>
      <p id="result" className="recaptcha-result">{message}</p>
    </div>
  );
};

export default RecaptchaForm;