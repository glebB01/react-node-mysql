const db = require('../models');
const Appointment = db.Appointment;

exports.make = async (req, res) => {    
    try {
        if(req.body && 
            req.body.UserId && 
            req.body.BusinessId && 
            req.body.start &&
            req.body.end && 
            req.body.latitude && 
            req.body.longitude) {
            const newAppointment = await Appointment.create({
                 ...req.body,
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
        console.log(req.body);
        if(req.body && 
            req.body.UserId && 
            req.body.BusinessId && 
            req.body.start &&
            req.body.end && 
            req.body.latitude && 
            req.body.longitude) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                const resultAppointment = await Appointment.update({
                    ...req.body,
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
                    let availableTime = await calcAvailableTime(req.body.BusinessId, req.body.start.split(':').slice(0, 3).join(':'));
                    res.status(200).json({
                        status: true,
                        response: resultAppointment,
                        availableTime: availableTime
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

exports.allow = async (req, res) => {
    try {
        if(req.params.id) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                const resultAppointment = await Appointment.update({
                    allowed: true
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

exports.cancel = async (req, res) => {
    try {
        if(req.params.id) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                const resultAppointment = await Appointment.update({
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
    console.log(req.params.id);
    try {
        if(req.params.id) {
            const targetAppointment = await Appointment.findByPk(req.params.id);
            if(targetAppointment === null) {
                res.status(400).json({
                    status: false,
                    errorMessage: 'Appointment Not Exist!'
                })
            } else {
                const deletedData = targetAppointment;
                await targetAppointment.destroy();
                let availableTime = await calcAvailableTime(deletedData.BusinessId, deletedData.start.split(':').slice(0, 3).join(':'));
                res.status(200).json({
                    status: true,
                    errorMessage: 'Delete Successfully',
                    availableTime: availableTime
                })
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
            errorMessage: 'Something went wrong'
        })
    }
}

exports.getUserAppointment = async (req, res) => {
    try {
        if(req.params.id) {
            const userid = req.params.id;
            const recordSet = await Appointment.findAll();
            const results = recordSet.filter((record => {
                return (record.UserId == userid);
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

exports.getDateBusinessAppointment = async (req, res) => {
    try {
        if(req.params.id && req.params.date) {
            const businessid = req.params.id;
            let availableTime = await calcAvailableTime(businessid, req.params.date);
            res.status(200).json({
                status: true,
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

const calcAvailableTime = async (businessid, date) => {
    const recordSet = await Appointment.findAll();
    let availableTime = Array(48).fill(1);
    const results = recordSet.filter((record => {
        const appointmentStart = record.start.split(":").splice(0,3);
        const requestDate = date.split(":");
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
    return availableTime;
}

exports.getBusinessAppointment = async (req, res) => {
    try {
        if(req.params.id) {
            const businessid = req.params.id;
            const recordSet = await Appointment.findAll();
            const results = recordSet.filter((record => {
                return (record.BusinessId == businessid);
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


const compareArr = (arr1, arr2) => {
    if(arr1.length != arr2.length) return 0;
    for(let i = 0 ; i < arr1.length ; i ++) {
        if(Number(arr1[i]) != Number(arr2[i])) return 0;
    }
    return 1;
}