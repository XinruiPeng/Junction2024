const fetch = require('node-fetch');

exports.handler = async (event) => {
  const secretKey = 'YOUR_SECRET_KEY';
  const recaptchaResponse = JSON.parse(event.body).token;

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${6LfwZXkqAAAAADfdmGryaW7XC_6VzoTvyx_UBfKw}&response=${recaptchaResponse}`;
  const response = await fetch(verificationURL, { method: 'POST' });
  const data = await response.json();

  if (data.success) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Verification successful' }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Verification failed' }),
    };
  }
};
