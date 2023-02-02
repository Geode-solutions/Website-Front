exports.handler = async function (event) {
  try {
    console.log(event)
    const { data } = await useFetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`, { method: 'POST' })
    console.log(data)
    if (data) {
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