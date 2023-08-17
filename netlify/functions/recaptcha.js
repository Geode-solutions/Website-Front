exports.handler = async function (event) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        return {
          statusCode: 400,
          body: JSON.stringify(response)
        }
      }
      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      }
    };


    xhr.open("POST", `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${event.queryStringParameters.token}`);
    xhr.send();
  } catch (e) {
    console.log('ReCaptcha error:', e)
    return {
      statusCode: 500,
      body: 'Internal error'
    }
  }
}