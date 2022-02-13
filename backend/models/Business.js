module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define('Business', {
        businessname: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        service: {
            type: Sequelize.STRING
        }
    });

    return Business;
}