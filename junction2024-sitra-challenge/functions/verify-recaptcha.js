const fetch = require('node-fetch');

const RECAPTCHA_SECRET_KEY = '6LfwZXkqAAAAADfdmGryaW7XC_6VzoTvyx_UBfKw';

exports.handler = async (event) => {
  try {
    const recaptchaResponse = JSON.parse(event.body).token;

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

    const response = await fetch(verificationURL, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Verification successful' }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Verification failed. Please try again.' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server error. Please try again later.' }),
    };
  }
};
