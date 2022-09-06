// super-secret.js

const jwt = require("jsonwebtoken")

exports.handler = async (event, context) => {
  // If method not post return err
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "",
    }
  }

  // If not authorized return err, and auth doesn't start with
  if (
    !event.headers.authorization ||
    !event.headers.authorization.startsWith("Bearer ")
  ) {
    return {
      statusCode: 401,
      body: "",
    }
  }

  // Get token from header
  const token = event.headers.authorization.split(" ")[1]
  // If token not verifyed return err
  if (!jwt.verify(token, process.env.TOKEN_SECRET)) {
    return {
      statusCode: 403,
      body: "",
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  }
}
