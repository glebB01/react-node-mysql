const db = require('../models');
const Business = db.Business;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const secretKey = "KTJ Secret Key";

exports.getall = async (req, res) => {
    try {
        const results = await Business.findAll();
        res.status(200).json({
            status: true,
            response: results
        })
    } catch(e) {
        res.status(400).json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

exports.login = async (req, res) => {
    try {
        if(req.body && req.body.businessname && req.body.password) {
            const result = await Business.findOne({
                where: {
                    businessname: req.body.businessname
                },
            })
            if(result === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Business Not Exist'
                })
            } else {
                if(bcrypt.compareSync(result.password, req.body.password)) {
                    checkBusinessAndGenerateToken(result, req, res);
                } else {
                    res.status(400).json({
                        errorMessage: 'Businessname or Password is incorrect',
                        status: false
                    })
                }
            }
        } else {
            res.status(400).json({
                status: false,
                errorMessage: 'Input Correct Data'
            })
        }
    } catch(e) {
        console.log(e);
        res.status(400).json({
            status: false,
            errorMessage: "Something went wrong"
        })
    }
}

exports.register = async (req, res) => {
    try {
        if(req.body && req.body.businessname && req.body.password && req.body.service) {
            const { count, results } = await Business.findAndCountAll({
                where: {
                    businessname: req.body.businessname
                }
            })
            if(count > 0) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Business already exists'
                })
            } else {
                const newBusiness = await Business.create({ businessname: req.body.businessname, password: req.body.password, service: req.body.service });
                res.status(200).json({
                    status: true,
                    response: newBusiness
                })
            }
        } else {
            res.status(400).json({
                status: false,
                errorMessage: 'Input Correct Data'
            })
        }
    } catch(e) {
        console.log(e);
        res.json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

checkBusinessAndGenerateToken = (data, req, res) => {
    jwt.sign({ business: data.businessname, id: data.id }, secretKey, {expiresIn: '1d'}, (err, token) => {
        if(err) {
            res.status(400).json({
                status: false,
                errorMessage: err
            });
        } else {
            res.json({
                message: 'Login Successful',
                token: token,
                id: data.id,
                status: true
            })
        }
    })
}