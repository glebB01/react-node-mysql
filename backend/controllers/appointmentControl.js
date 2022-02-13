const { all } = require('express/lib/application');
const db = require('../models');
const Appointment = db.Appointment;

exports.make = async (req, res) => {    
    try {
        if(req.body && req.body.UserId && req.body.BusinessId && req.body.start && req.body.end) {
            const newAppointment = await Appointment.create({
                 UserId: req.body.UserId,
                 BusinessId: req.body.BusinessId,
                 start: req.body.start,
                 end: req.body.end,
                 allowed: false
            });
            if(newAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Database Error!'
                })
            } else {
                res.status(200).json({
                    status: true,
                    response: newAppointment
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
        res.status(400).json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

exports.edit = async (req, res) => {
    try {
        if(req.body && req.body.UserId && req.body.BusinessId && req.body.start && req.body.end) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                const resultAppointment = await Appointment.update({
                    UserId: req.body.UserId,
                    BusinessId: req.body.BusinessId,
                    start: req.body.start,
                    end: req.body.end,
                    allowed: false
                }, {
                   where: {
                       id: req.params.id
                   }
               });
               if(resultAppointment === null) {
                   res.status(400).json({
                       status: false,
                       errorMessage: 'Update failed'
                   })
               } else {
                   res.status(200).json({
                       status: true,
                       response: resultAppointment
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
            errorMessage: 'Something went wrong'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        if(req.params.id) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                await targetAppointment.destroy();
                res.status(200).json({
                    status: false,
                    errorMessage: 'Delete Successfully'
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
        res.status(400).json({
            status: false,
            errorMessage: 'Something went wrong'
        })
    }
}

exports.getUserAppointment = async (req, res) => {
    try {
        if(req.params.id && req.params.date) {
            const userid = req.params.id;
            const recordSet = await Appointment.findAll();
            const results = recordSet.filter((record => {
                const appointmentDate = record.start.split(":").splice(0,3);
                const requestDate = req.params.date.split(":");
                return (record.UserId == userid && compareArr(appointmentDate, requestDate));
            }));
            res.status(200).json({
                status: true,
                response: results
            })
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
            errorMessage: 'Something went wrong'
        })
    }
}

exports.getBusinessAppointment = async (req, res) => {
    try {
        if(req.params.id && req.params.date) {
            const businessid = req.params.id;
            const recordSet = await Appointment.findAll();
            let availableTime = Array(48).fill(1);
            const results = recordSet.filter((record => {
                const appointmentStart = record.start.split(":").splice(0,3);
                const requestDate = req.params.date.split(":");
                return (record.BusinessId == businessid && compareArr(appointmentStart, requestDate));
            }));
            results.forEach(result => {
                const appointmentStart = Number(result.start.split(":")[3]);
                const appointmentEnd = Number(result.end.split(":")[3]);
                if(result.allowed) {
                    console.log(appointmentStart,appointmentEnd);
                    for(let i = appointmentStart ; i < appointmentEnd ; i ++) {                        
                        availableTime[i] = 0;
                    }
                }
            });
            res.status(200).json({
                status: true,
                response: results,
                availableTime: availableTime
            })
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
            errorMessage: 'Something went wrong'
        })
    }
}

const compareArr = (arr1, arr2) => {
    if(arr1.length != arr2.length) return 0;
    for(let i = 0 ; i < arr1.length ; i ++) {
        if(Number(arr1[i]) != Number(arr2[i])) return 0;
    }
    return 1;
}