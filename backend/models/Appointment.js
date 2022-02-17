const User = require('./User');
const Business = require('./Business');

module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define('Appointment', {
        start: {
            type: Sequelize.STRING
        },
        end: {
            type: Sequelize.STRING
        },
        allowed: {
            type: Sequelize.BOOLEAN
        },
        latitude: {
            type: Sequelize.DOUBLE
        },
        longitude: {
            type: Sequelize.DOUBLE
        }
    });
    return Appointment;
}