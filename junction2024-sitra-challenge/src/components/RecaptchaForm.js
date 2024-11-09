// src/components/RecaptchaForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA, validate you are humanbeings');
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
        console.log('Verification successful');
        navigate('/login');
      } else {
        alert('reCAPTCHA verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during reCAPTCHA verification:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Please complete the reCAPTCHA</h3>
        <ReCAPTCHA
          sitekey="6LfwZXkqAAAAADQrIZ_E5QPpmp6qVG8Dhxuc7wWW"
          onChange={handleRecaptchaChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecaptchaForm;
