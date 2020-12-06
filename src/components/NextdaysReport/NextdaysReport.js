import React from 'react';
// import { Next } from 'react-bootstrap/esm/PageItem';
import { WiDayCloudyHigh } from "weather-icons-react";

const NextdaysReport = (props) => {
    let temparature = null;
    if(props.weather_data !== null && props.day === '3') {
        temparature = props.weather_data.temperature.celsius+3;
    }
    else if(props.weather_data !== null && props.day === '4') {
        temparature = props.weather_data.temperature.celsius+2;
    }
    else if(props.weather_data !== null) {
        temparature = props.weather_data.temperature.celsius;
    }

    if(props.weather_data !== null){
        // console.log(props.weather_data.next_date);
        var mydate = new Date(props.weather_data.next_date);
        var weekname = mydate.toLocaleString('en-us', {  weekday: 'short' });
    }
    
    return (
        <div className="col-md-3 col-6 next_day_reports_color">
            <div className="next_day">
                <div className="icon">
                    <WiDayCloudyHigh size={45} color='#fff' />
                </div>
                <div className="data">
                    <p>
                    <span>{ weekname }</span>
                    </p>
                    <p>
                    <span>{ temparature } <sup>o</sup>C</span>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default NextdaysReport;