var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
  const users = require('../controllers/userControl');
  var router = express.Router();

  router.use(cors());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: false }))

  router.post('/user/login', users.login);
  router.post('/user/register', users.register);
  router.post('/user', users.getUserInfo);

  app.use(router);
}