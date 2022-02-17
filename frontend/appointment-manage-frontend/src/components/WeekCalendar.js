import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import usePrevious from '../functions/usePrevious';
import React from 'react';

const WeekCalendar = (props) => {
    const [myEvents, setEvents] = React.useState([]);
    const prevData = usePrevious(props.appointments);
    React.useEffect(() => {
        // getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
        //     console.log(events);
        //     setEvents(events);
        // }, 'jsonp');
        if(!props.users.length) return ;
            setEventData();
    }, [props.users.length, props.appointments]);

    const setEventData = () => {
        const events = props.appointments.map((appointment, idx) => {
            return ({
                start: makeDate(appointment.start),
                end: makeDate(appointment.end),
                title: props.users[props.users.findIndex(user => user.id == appointment.UserId)].username,
                color: appointment.allowed ? '#6495ED' : '#A9A9A9',
                id: idx
            })
        })
        setEvents(events);
    }
    
    const makeDate = (timeStr) => {
        const timeArr = timeStr.split(':');
        const date = timeArr.slice(0, 3).map(v => String(v).padStart(2, '0')).join('-');
        const time = [Math.floor(timeArr[3] / 2), timeArr[3] % 2 * 30]
                    .map(v => String(v).padStart(2, '0'))
                    .join(':');
        const result = date + 'T' + time + ':00.000Z';
        return result;
    }

    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title + "'s Appointment"
        });
        props.eventClick(event);
    }, []);
    
    const view = React.useMemo(() => {
        return {
            schedule: { type: 'week' }
        };
    }, []);

    return (
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
//            clickToCreate={true}
//            dragToCreate={true}
//            dragToMove={true}
//            dragToResize={true}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
       />
    ); 
}

export default WeekCalendar;