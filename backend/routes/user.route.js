var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
  const users = require('../controls/userControl');
  var router = express.Router();

  router.post('/user/login', users.login);
  router.post('/user/register', users.register);
  router.post('/user', users.getUserInfo);

  app.use(router);
}