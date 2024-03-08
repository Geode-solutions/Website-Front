const axios = require("axios")

exports.handler = async function (event) {
  try {
    const slackToken = process.env.SLACK_TOKEN
    const slackEndpoint =
      "https://opengeode-community.slack.com/api/users.admin.invite"

    const email = event.queryStringParameters.email

    const data = { token: slackToken, email }

    const response = await axios.post(slackEndpoint, null, { params: data })

    if (response.data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Invitation sent successfully",
        }),
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: response.data.error }),
      }
    }
  } catch (error) {
    console.error("Slack Invitation Error:", error)
    return {
      statusCode: 500,
      body: "Internal error",
    }
  }
}
