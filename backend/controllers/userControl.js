const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const secretKey = "KTJ Secret Key";

exports.login = async (req, res) => {
    try {
        if(req.body && req.body.username && req.body.password) {
            const result = await User.findOne({
                where: {
                    username: req.body.username
                },
            })
            if(result === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'User Not Exist'
                })
            } else {
                if(bcrypt.compareSync(result.password, req.body.password)) {
                    checkUserAndGenerateToken(result, req, res);
                } else {
                    res.status(400).json({
                        errorMessage: 'Username or Password is incorrect',
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
        res.status(400).json({
            status: false,
            errorMessage: "Something went wrong"
        })
    }
}

exports.register = async (req, res) => {
    try {
        if(req.body && req.body.username && req.body.password) {
            const { count, results } = await User.findAndCountAll({
                where: {
                    username: req.body.username
                }
            })
            if(count > 0) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'User already exists'
                })
            } else {
                const newUser = await User.create({ username: req.body.username, password: req.body.password });
                res.status(200).json({
                    status: true,
                    response: newUser
                })
            }
        } else {
            res.status(400).json({
                status: false,
                errorMessage: 'Input Correct Data'
            })
        }
    } catch(e) {
        res.json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

checkUserAndGenerateToken = (data, req, res) => {
    jwt.sign({ user: data.username, id: data.id }, secretKey, {expiresIn: '1d'}, (err, token) => {
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