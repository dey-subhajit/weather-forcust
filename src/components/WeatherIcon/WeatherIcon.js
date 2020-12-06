import React from 'react';
import { WiDaySunny, WiThermometer, WiStrongWind } from "weather-icons-react";

const WeatherIcon = (props) => {
    let Icon = "";
    if(props.data === "WiDaySunny")
        Icon = <WiDaySunny size={35} color='#fff' />;
    if(props.data === "WiThermometer")
        Icon = <WiThermometer size={35} color='#fff' />;
    if(props.data === "WiStrongWind")
        Icon = <WiStrongWind size={35} color='#fff' />;
    return (
        Icon
    );
};

export default WeatherIcon;