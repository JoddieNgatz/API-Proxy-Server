const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const {port,baseURL,apiKey, host}= require("./src/utils/env");
// Create Express Server
const app = express();

// Configuration
const PORT = port;
const HOST = host;
const API_SERVICE_URL = baseURL;
// Logging
app.use(morgan('dev'));
// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });
 // Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });
 // Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
 }));