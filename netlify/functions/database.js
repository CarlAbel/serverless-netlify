// database.js

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const { message } = JSON.parse(event.body)
    console.log(message)
    return {
      statusCode: 201,
      body: JSON.stringify("Very good"),
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify("Method not allowed"),
    }
  }
}
