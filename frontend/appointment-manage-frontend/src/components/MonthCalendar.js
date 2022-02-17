import * as React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, setOptions, } from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function Calendar(props) {
    const [invalids, setInvalids] = React.useState();
    const myLabels = React.useMemo(() => {
        return [{
            start: new Date().toLocaleDateString(),
            textColor: '#e1528f',
        }];
    }, []);

    React.useEffect(() => {
        setInvalids(props.invalidTime);
    });

    const myInvalid = React.useMemo(() => {
        return props.invalidTime;
    });

    const changeDate = (e) =>{
        console.log(e);
        props.dateSelected(e.date);
    }

   return(                 
        <div style={{marginTop:'10%'}}>
            <Datepicker
                calendarScroll="vertical"
                showWeekNumbers={false}
                showOuterDays={false}
                controls={['calendar', 'timegrid']}
                min="2022-02-17T00:00"
                max="2022-08-14T00:00"
                minTime="00:00"
                maxTime="23:59"
                stepMinute={30}
                labels={myLabels}
                invalid={invalids}
                display="inline"
                onCellClick={(e) => {changeDate(e)}}
            />
        </div>
    ); 
}


export default Calendar;