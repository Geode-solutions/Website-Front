import fetch from 'node-fetch';

exports.handler = async function (event) {
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`, { method: 'POST' })
      .then(response => response.data)
    console.log(response)
    if (response.success) {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }
    return {
      statusCode: 400,
      body: JSON.stringify(response)
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    return {
      statusCode: 500,
      body: 'Internal error'
    }
  }
}