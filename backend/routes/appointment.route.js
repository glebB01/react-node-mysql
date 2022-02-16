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
    router.put('/appointment/allow/:id', appointments.allow);
    router.put('/appointment/cancel/:id', appointments.cancel);
    router.delete('/appointment/:id', appointments.delete);
    router.post('/appointment/user/:id/', appointments.getUserAppointment);
    router.post('/appointment/business/:id', appointments.getBusinessAppointment);
    router.post('/appointment/business/:id/:date', appointments.getDateBusinessAppointment);
    app.use(router);
}