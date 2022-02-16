import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BusinessSelect from './BusinessSelect';
import { businessGet } from '../actions/businessAction';
import { editAppointment, deleteAppointment } from '../actions/appointmentAction'

class UserAppointment extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
        this.makeDate = this.makeDate.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            businessId: '',
            businessName: '',
            date: '',
            startTime: '',
            endTime: ''
        }
    }

    update(e) {
        e.preventDefault();        
        const index = e.target.selectedIndex;
        this.setState({
            businessName: e.target.value,
            businessId: index ? this.state.businessId : this.props.businessArr[e.target.selectedIndex - 1].id
        })
    }

    delete(e) {
        e.preventDefault();
        this.props.deleteAppointment(this.props.appointment.id);
    }

    makeDate(time)  {
        const tm = time.split(':');
        const result = this.state.date.split('-').join(':') + ':' + Number(2 * tm[0] + Math.floor(tm[1] / 30));
        return result;
    }

    edit(e) {
        e.preventDefault();
        const businessId = this.state.businessId;
        const appointId = this.props.appointment.id;
        const start = this.makeDate(this.state.startTime);
        const end = this.makeDate(this.state.endTime);
        this.props.editAppointment(appointId, businessId, start, end);
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.props.businessGet();
        if(this._isMounted) {
            this.setState({
                businessId: this.props.businessArr[this.props.businessArr.findIndex((business => business.id == this.props.appointment.BusinessId))].id,
                businessName: this.props.businessArr[this.props.businessArr.findIndex((business => business.id == this.props.appointment.BusinessId))].businessname,
                date: this.props.appointment.start.split(':').slice(0, 3).map(num => String(num).padStart(2,'0')).join('-'),
                startTime: `${String(Math.floor(this.props.appointment.start.split(':')[3] / 2)).padStart(2,'0')}:${String(this.props.appointment.start.split(':')[3] % 2 * 30).padStart(2,'0')}`,
                endTime: `${String(Math.floor(this.props.appointment.end.split(':')[3] / 2)).padStart(2,'0')}:${String(this.props.appointment.end.split(':')[3] % 2 * 30).padStart(2,'0')}`,
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <li className = {'list-group-item mt-2 ' + (this.props.appointment.allowed ? 'bg-success' : 'bg-secondary')}>
                <div className='row'>
                    <div className='col'>
                        <BusinessSelect 
                            businessArr={this.props.businessArr}
                            change={(e) => this.update(e)}
                            val = {this.state.businessName}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "date" 
                            onChange={(e) => {this.setState({date: e.target.value})}}
                            value = {this.state.date}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "time" 
                            onChange={(e) => this.setState({startTime: e.target.value})}
                            value = {this.state.startTime}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            className = "form-control" type = "time" 
                            onChange={(e) => this.setState({endTime: e.target.value})}
                            value = {this.state.endTime}
                        />
                    </div>
                    <div className='col'>
                        <button className = "form-control btn-info btn" onClick={this.edit}>Edit</button>
                    </div>
                    <div className='col'>
                        <button className = "form-control btn-danger btn" onClick={this.delete}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}

UserAppointment.propTypes = {
    businessArr: PropTypes.array.isRequired,
    businessGet: PropTypes.func.isRequired,
    editAppointment: PropTypes.func.isRequired,
    deleteAppointment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    businessArr: state.businessState.businessArr
})

export default connect(mapStateToProps, 
    { businessGet, editAppointment, deleteAppointment })(UserAppointment)