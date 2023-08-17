import fetch from 'node-fetch';

exports.handler = async function (event) {
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`, { method: 'POST' })

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Internal error'
    }
  }
}