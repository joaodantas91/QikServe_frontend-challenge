const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { endpoint } = event.queryStringParameters; // Extract endpoint from query parameters
  const apiUrl = `https://cdn-dev.preoday.com/challenge/${endpoint}`; // Construct the API URL

  try {
    const response = await fetch(apiUrl);
    const data = await response.json(); // Parse the JSON response

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow CORS
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
