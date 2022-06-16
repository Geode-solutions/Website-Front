const axios = require('axios')

exports.handler = async function(event) {
    if (event.httpMethod !== 'GET') {
        return { 
            statusCode: 405 
        }
    }
    if (!(RECAPTCHA_SECRET_KEY in process.env)) {
        console.error('RECAPTCHA_SECRET_KEY environment variable is not set.')
        return {
            statusCode: 500
        }
    }
    if (!('token' in event.queryStringParameters)) {
        console.error('Client response token not found in URL query string.')
        return {
            statusCode: 400
        }
    }
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env[RECAPTCHA_SECRET_KEY]}&response=${event.queryStringParameters.token}`)
    return response
}