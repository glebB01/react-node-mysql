const dbConfig = require('../configs/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Business = require('./Business')(sequelize, Sequelize);
db.Appointment = require('./Appointment')(sequelize, Sequelize);

db.Appointment.belongsTo(db.User);
db.Appointment.belongsTo(db.Business);

module.exports = db;