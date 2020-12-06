import React, { Component } from 'react';

import { connect } from 'react-redux';

import Location from '../Location/Location';
import ChangeLocation from '../ChangeLocation/ChangeLocation';
import DateShow from '../DateShow/DateShow';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

class TodaysReport extends Component{
    render(){
        return (
            <div className="current_day_report">
                <Location area={this.props.area} country={this.props.country} />
                <DateShow today_date={this.props.date_time} />
                <div className="temparature">
                    <WeatherIcon data="WiDaySunny" />
                    <span>{ this.props.celsius } <sup>o</sup>C | </span>
                    <span>{ this.props.fahrenheit } <sup>o</sup>F </span>
                </div>
                <div className="humidity">
                    <WeatherIcon data="WiThermometer" />
                    <span>{ this.props.humidity }%</span>
                </div>
                <div className="wind">
                    <WeatherIcon data="WiStrongWind" />
                    <span>{ this.props.wind } km/h</span>
                </div>
                <ChangeLocation />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        celsius: state.WeatherReport.temperature.celsius,
        fahrenheit: state.WeatherReport.temperature.fahrenheit,
        area: state.WeatherReport.location.city,
        country: state.WeatherReport.location.country,
        date_time: state.WeatherReport.todays_date,
        humidity: state.WeatherReport.humidity,
        wind: state.WeatherReport.wind,
    };
};

export default connect(mapStateToProps, null) (TodaysReport);