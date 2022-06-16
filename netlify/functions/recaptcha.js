const axios = require('axios')

exports.handler = async function (event) {
  try {
    const headers = {
      'Access-Control-Allow-Origin': 'https://next.geode-solutions.com'
      // 'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`).data
    console.log(response)
    if (response.success) {
      return {
        success: true,
        message: 'Token verifyed',
        response: response
      }
    }
    return {
      success: false,
      message: 'Invalid token',
      response: response
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    return {
      success: false,
      message: 'Internal error'
    }
  }
}