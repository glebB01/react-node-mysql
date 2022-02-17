var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
    const businesses = require('../controls/businessControl');
    var router = express.Router();
  
    router.get('/business', businesses.getall);
    router.post('/business/login', businesses.login);
  
    router.post('/business/register', businesses.register);
  
    app.use(router);
}