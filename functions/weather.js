import fetch from "node-fetch";
export async function handler(event) {
  const { lat, lon } = event.queryStringParameters;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}`
  );
  return {
    statusCode: 200,
    body: await res.text()
  };
}
