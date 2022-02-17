import React, { Component } from 'react';
import WeekCalendar from '../components/WeekCalendar';
import { connect } from 'react-redux';
import { getBusinessAppointment, allowAppointment, cancelAppointment } from '../actions/appointmentAction';
import { getUserData } from '../actions/userAction';
import AppointmentMap from '../components/AppointmentMap';

class BusinessDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start:'',
            end:'',
            id: -1
        };
        this.allowAppointment = this.allowAppointment.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
    }
    componentDidMount () {
        const businessId = localStorage.getItem('business_id');
        this.props.getBusinessAppointment(businessId);
        this.props.getUserData();
        this.eventClick = this.eventClick.bind(this);
    }

    eventClick(eventData){
        this.setState({
            ...eventData.event,
            location: {
                latitude: this.props.businessSchedule[eventData.event.id].latitude,
                longitude: this.props.businessSchedule[eventData.event.id].longitude
            }
        });
    }

    allowAppointment() {
        const appointmentId = this.props.businessSchedule[this.state.id].id;
        this.props.allowAppointment(appointmentId);
    }

    cancelAppointment() {
        const appointmentId = this.props.businessSchedule[this.state.id].id;
        this.props.cancelAppointment(appointmentId);
    }

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                <div className='row'>
                    <div className='col mt-3' style={{height: "600px"}}>
                        <WeekCalendar 
                            appointments = {this.props.businessSchedule} 
                            users = {this.props.users}
                            eventClick = {(eventData) => this.eventClick(eventData)}
                        />
                    </div>
                    <div className='col mt-5'>
                        <AppointmentMap clickPosition = {() => {}} location={this.state.location ? this.state.location : {longitude: -90, latitude: 55}}/>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col'>
                        {
                            this.state.id === -1 ? <label className='form-control'>Status:</label> :
                            <label className='form-control'>Status: {this.props.businessSchedule[this.state.id].allowed ? 'Allowed' : 'Not Allowed'}</label>
                        }
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "date" 
                            value = {this.state.start.slice(0, 10)}
                            onChange = {() => {}}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "time" 
                            value = {this.state.start.slice(11, 16)}
                            onChange = {() => {}}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "time" 
                            value = {this.state.end.slice(11, 16)}
                            onChange = {() => {}}
                        />
                    </div>
                    <div className='col'>
                        {
                            this.state.id == -1 ? <label className='form-control'>Allow Management</label> :
                            <div>
                                {!this.props.businessSchedule[this.state.id].allowed?
                                <button className='btn btn-primary form-control' onClick={this.allowAppointment}>Allow Appointment</button> : 
                                <button className='btn btn-danger form-control' onClick={this.cancelAppointment}>Cancel Allow</button>}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    businessSchedule: state.appointmentState.businessSchedule,
    users: state.userState.users
})

export default connect(mapStateToProps, { getBusinessAppointment, getUserData, allowAppointment, cancelAppointment })(BusinessDashboard);