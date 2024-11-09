// src/components/RecaptchaForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setResultMessage('Please complete to verify you are human');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/verify-recaptcha', {
        method: 'POST',
        body: JSON.stringify({ token: recaptchaToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success) {
        setResultMessage("Verification successful! Redirecting...");
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setResultMessage('reCAPTCHA verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during reCAPTCHA verification:', error);
      setResultMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="recaptcha-form-container">
      <h1 className="recaptcha-title">Verify you are human</h1>
      <form id="recaptcha-form" onSubmit={handleSubmit} className="recaptcha-form">
        <ReCAPTCHA
          sitekey="6LfwZXkqAAAAADQrIZ_E5QPpmp6qVG8Dhxuc7wWW"
          onChange={handleRecaptchaChange}
        />
        <button type="submit" className="recaptcha-button">Submit</button>
      </form>
      <p id="result" className="recaptcha-result">{resultMessage}</p>
    </div>
  );
};

export default RecaptchaForm;