require("dotenv").config();

module.exports = {
  port: Number(process.env.API_PORT) || 3000,
  baseURL: String(process.env.API_BASE_URL) || "",
  apiKey: String(process.env.API_KEY) || "",
  host: String(process.env.HOST) || "localhost",
  api2Url: String(process.env.APIURL) ||"",
};