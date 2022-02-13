var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = app => {
    const appointments = require('../controllers/appointmentControl');
    var router = express.Router();
  
    router.use(cors());
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }))
  
    router.post('/appointment', appointments.make);
    router.put('/appointment/:id', appointments.edit);
    router.delete('/appointment/:id', appointments.delete);
    router.post('/appointment/user/:id/:date', appointments.getUserAppointment);
    router.post('/appointment/business/:id/:date', appointments.getBusinessAppointment);
    app.use(router);
}