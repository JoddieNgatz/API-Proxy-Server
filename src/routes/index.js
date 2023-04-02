const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const {port,baseURL,apiKey, host}= require("../utils/env");
const router = require("express").Router();
const { default: axios } = require("axios");
const env = require("../utils/env");

// Configuration
const PORT = port;
const HOST = host;
const API_SERVICE_URL = baseURL;
// Logging
router.use(morgan('dev'));
// Info GET endpoint
router.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });
 // Authorization
 router.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });
 // Proxy endpoints
 router.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
 }));

 
// [GET] Current weather data
router.get("/weather", async (request, response, next) => {
    try {
      const query = request.query || {}; 
      const params = {
        appid: env.apiKey, // required field
        ...query,
      };
      const { data } = await axios.get(env.baseURL, { params });
  
      return response.status(200).json({
        message: "Current weather data fetched!",
        details: { ...data },
      });
    } catch (error) {
      const {
        response: { data },
      } = error;
      const statusCode = Number(data.cod) || 400;
      return response
        .status(statusCode)
        .json({ message: "Bad Request", details: { ...data } });
    }
  });
  module.exports = router;