const axios = require('axios')

exports.handler = async function(event) {    
        const headers = {
          'Access-Control-Allow-Origin': 'https://next.geode-solutions.com'
          // 'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`, {headers})
    return response
}