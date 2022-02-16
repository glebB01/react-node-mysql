var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
    const businesses = require('../controllers/businessControl');
    var router = express.Router();
  
    router.use(cors());
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }))
  
    router.get('/business', businesses.getall);
    router.post('/business/login', businesses.login);
  
    router.post('/business/register', businesses.register);
  
    app.use(router);
}