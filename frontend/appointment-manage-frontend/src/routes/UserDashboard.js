import React, { useEffect, useState } from 'react';
import Calendar from '../components/MonthCalendar';
import { connect } from 'react-redux';
import usePrevious from '../functions/usePrevious';
import BusinessSelect from '../components/BusinessSelect';
import { businessGet } from '../actions/businessAction';
import { getAvailableTime, getUserAppointment, makeAppointment } from '../actions/appointmentAction';
import UserAppointment from '../components/UserAppointment';
import AppointmentMap from '../components/AppointmentMap';

const UserDashboard = (props) => {
    const [businessName, setBusinessName] = useState('');
    const [businessId, setBusinessId] = useState(0);
    const [date, setDate] = useState('');
    const [invalidTimes, setInvalidTimes] = useState([]);
    const [location, setLocation] = useState({
        longitude: -90.95534916605851,
        latitude: 55.658012906351075,
    });
    
    const prevAvail = usePrevious(props.availableTime);
    const prevInvalid = usePrevious(invalidTimes);
    
    let isMounted = true;

    const getBusinessArray = () => {
        props.businessGet();
        props.getUserAppointment();
        setDate(new Date());
    }

    useEffect(() => {
        getBusinessArray();
    }, [])
    useEffect(() => {
        const sDate = new Date(date);
        if(prevAvail != props.availableTime && isMounted) {
            let newInvalid = [];
            for(var i = 0 ; i < props.availableTime.length ; i ++) {
                if(props.availableTime[i] == 0) {
                    const start = String(`${sDate.getFullYear()}-${String(Math.floor(sDate.getMonth()-1+2)).padStart(2,'0')}-${String(Math.floor(sDate.getDate())).padStart(2,'0')}T${String(Math.floor(i / 2)).padStart(2,'0')}:${String(Math.floor((i % 2) * 30)).padStart(2,'0')}`);
                    const end = String(`${sDate.getFullYear()}-${String(Math.floor(sDate.getMonth()-1+2)).padStart(2,'0')}-${String(Math.floor(sDate.getDate())).padStart(2,'0')}T${String(Math.floor((i + 1) / 2)).padStart(2,'0')}:${String(Math.floor(((i + 1) % 2) * 30)).padStart(2,'0')}`);
                    newInvalid = [...newInvalid, {start, end}]
                }
            }
            const temp_state = [...newInvalid];
            if(temp_state != prevInvalid && isMounted)
                setInvalidTimes( temp_state );
        }
        return() => {isMounted = false;}
    }, [props.availableTime, invalidTimes])

    const update = (e) => {
        const index = e.target.selectedIndex;
        setBusinessName(e.target.value);    
        if(index) setBusinessId(props.businessArr[e.target.selectedIndex - 1].id);
        availtTime(props.businessArr[e.target.selectedIndex - 1].id, date);
    }

    const makeDate = (sDate) => {
        return `${sDate.getFullYear()}:${sDate.getMonth() + 1}:${sDate.getDate()}`;
    }

    const availtTime = (bId, sDate) => {
        if(bId && sDate) {
            props.getAvailableTime(bId, makeDate(new Date(sDate)));
           // console.log(props.availableTime);
        }
    }

    const dateSelected = (date) => {
        setDate(date.toString());
        const selectedDate = new Date(date);
        availtTime(businessId, selectedDate);
    }

    const validate = (start, end) => {
        for(let i = start ; i <= end ; i ++) {
            if(props.availableTime[i] === 0)
                return 0;
        }
        return 1;
    }

    const addAppointment = (e) => {
        e.preventDefault();
        const sDate = new Date(date);
        const startTime = e.target.elements.start.value.split(':');
        const endTime = e.target.elements.end.value.split(':');
        const start = 2 * startTime[0] + Math.floor(startTime[1] / 30);
        const end = 2 * endTime[0] + Math.floor(endTime[1] / 30);
        const latitude = location.latitude;
        const longitude = location.longitude;
        if(validate(start, end)){
             if(startTime && endTime) props.makeAppointment(businessId, makeDate(sDate) + `:${start}`, makeDate(sDate) + `:${end}`, latitude, longitude);
        } else {
            alert('Invalid Time!');
        }
    }

    const clickPosition = (locationData) => {
        setLocation(locationData);
    }

    return (
        <div>
            <div className='row mt-5'>
                <div className='col' style={{marginTop: '50px'}}>
                    <AppointmentMap clickPosition = {(locationData) => {clickPosition(locationData)}} location = { location }/>
                    <div className='mt-3'>
                        <form onSubmit={(e) => addAppointment(e)} className='form' style={{width: '70%'}}>
                            <div>
                                <BusinessSelect 
                                    businessArr={props.businessArr}
                                    change={(e) => update(e)}
                                    val = {businessName}
                                />
                            </div>
                            <input type='time' className='form-control mr-5' placeholder='Start time' name='start'/>
                            <input type='time' className='form-control mr-5' placeholder='End time' name='end'/>
                            <button type="submit" className='btn btn-primary mr-5' style={{width:'100%'}}>Send Appointment</button>
                        </form>
                    </div>
                </div>
                <div className='col'>
                    <Calendar dateSelected={dateSelected} invalidTime = {invalidTimes}/>
                </div>
            </div>
            
            {<ul className='mt-5' key={props.userSchedule.length}>
                <h3 className='text-center'>User Appointments</h3>
                {props.userSchedule.map((schedule, idx) => (
                    <UserAppointment appointment={schedule} key={idx} location={location}/>
                ))}
            </ul>}
        </div>
    )
}

const mapStateToProps = state => ({
    businessArr: state.businessState.businessArr,
    availableTime: state.appointmentState.availableTime,
    userSchedule: state.appointmentState.userSchedule
})

function mapDispatchToProps(dispatch) {
    return {
        businessGet: () => dispatch(businessGet()),
        getAvailableTime: (businessId, date) => dispatch(getAvailableTime(businessId, date)),
        getUserAppointment: () => dispatch(getUserAppointment()),
        makeAppointment: (businessId, start, end, latitude, longitude) => dispatch(makeAppointment(businessId, start, end, latitude, longitude)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);