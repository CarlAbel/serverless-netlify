// auth.js

const jwt = require("jsonwebtoken")

exports.handler = async (event, context) => {
  // If method not post return err
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify("Method not allowed"),
    }
  }

  // Get username and password from body
  const { username, password } = JSON.parse(event.body)
  // Checking data
  if (username !== "jens" || password !== "1234") {
    return {
      statusCode: 403,
      body: "",
    }
  }

  const token = jwt.sign({ user: username }, process.env.TOKEN_SECRET)

  console.log(token)

  return {
    statusCode: 201,
    body: JSON.stringify({ token }),
  }
}
