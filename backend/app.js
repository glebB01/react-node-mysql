var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var cors = require('cors');
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var businessRoute = require('./routes/business.route');
var appointmentRoute = require('./routes/appointment.route');

const db = require('./models');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


db.sequelize.sync();

const secretKey = "KTJ Secret Key";

app.use("/", (req, res, next) => {
    try {
        if(req.path == "/user/register" || 
            req.path == "/user/login" || 
            req.path == "/business/register" || 
            req.path == "/business/login") {
            next();
        } else {
            jwt.verify(req.headers.token, secretKey, function (err, decoded) {
                if (decoded && decoded.user) {
                  req.user = decoded;
                  next();
                } else {
                  return res.status(401).json({
                    errorMessage: 'User unauthorized!',
                    status: false
                  });
                }
              })
        }
    } catch(e) {
        res.status(400).json({
            errorMessage: 'Something went wrong!',
            status: false
        })
    }
})

userRoute(app);
businessRoute(app);
appointmentRoute(app);

app.listen(5000);