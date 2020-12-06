import React, { Component } from 'react';
import '../../Assets/css/WeatherReport.css';

import axios from 'axios';

import { connect } from 'react-redux';

import Header from '../../components/Heading/Heading';
import TodaysReport from '../../components/TodaysReport/TodaysReport';
import NextdaysReport from '../../components/NextdaysReport/NextdaysReport';

class WeatherReport extends Component{

    state = {
        ip: null,
        ShowLoader: true,
    }

    async componentDidMount() {
        await fetch(`https://geolocation-db.com/json/`)
        .then(res => res.json())
        .then(json => {this.setState({ip: json.IPv4})});

        this.ChangeGlobalIP();
    }

    async componentDidUpdate() {
        /* Get weather from Ip Address */
        if(this.props.IPSetup !== null) {
            this.setState({ShowLoader: true});
            this.props.onChangeGlobalWeatherReport({'temp_c': null});
            await axios.get('https://api.weatherapi.com/v1/current.json?key=e313ed0034064b40ac1134635200411&q='+this.props.IPSetup,{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
            .then(resp => {
                this.setState({ShowLoader: false});
                this.props.onChangeGlobalWeatherReport({
                    'temp_c': resp.data.current.feelslike_c,
                    'temp_f': resp.data.current.feelslike_f,
                    'date_time': resp.data.location.localtime,
                    'cuntry': resp.data.location.country,
                    'area': resp.data.location.name,
                    'humidity': resp.data.current.humidity,
                    'wind': resp.data.current.wind_kph,
                });
            })
            .catch(resp => {
                this.setState({ShowLoader: false});
                console.log(resp);
            })

            // axios.get('https://api.weatherapi.com/v1/forecast.json?key=06830f34f6714e62a6191013202510&q='+state.ip+'&dt=2020-11-1')
            await axios.get('https://api.weatherapi.com/v1/forecast.json?key=e313ed0034064b40ac1134635200411&q='+this.props.IPSetup+'&days=5')
            .then(resp => {
                // console.log('4 days api', resp);
                this.props.onChangeGlobalNextDayWeatherReport({
                    'reports': resp.data.forecast.forecastday
                })
            })
            .catch(resp => {
                console.log(resp);
            })
        }
        /* Get weather from Ip Address end */
        if(this.props.PincodeSetup !== null) {
            this.setState({ShowLoader: true});
            this.props.onChangeGlobalWeatherReport({'temp_c': null});
            console.log(this.props.PincodeSetup);
            this.setState({ShowLoader: false});
        }
        if(this.props.GeoLocationSetup.Status !== null && this.props.GeoLocationSetup.Latitude !== null) {
            this.setState({ShowLoader: true});
            this.props.onChangeGlobalWeatherReport({'temp_c': null});
            const GetLatitute = this.props.GeoLocationSetup.Latitude;
            const GetLongitute = this.props.GeoLocationSetup.Longitude;
            await axios.get('https://api.weatherapi.com/v1/current.json?key=e313ed0034064b40ac1134635200411&q='+this.props.GeoLocationSetup.Latitude+','+this.props.GeoLocationSetup.Longitude)
            .then(resp => {
                this.setState({ShowLoader: false});
                this.props.onChangeGlobalWeatherReport({
                    'temp_c': resp.data.current.feelslike_c,
                    'temp_f': resp.data.current.feelslike_f,
                    'date_time': resp.data.location.localtime,
                    'cuntry': resp.data.location.country,
                    'area': resp.data.location.name,
                    'humidity': resp.data.current.humidity,
                    'wind': resp.data.current.wind_kph,
                });
            })
            .catch(resp => {
                this.setState({ShowLoader: false});
                console.log(resp);
            })
            
            // axios.get('https://api.weatherapi.com/v1/forecast.json?key=06830f34f6714e62a6191013202510&q='+state.ip+'&dt=2020-11-1')
            await axios.get('https://api.weatherapi.com/v1/forecast.json?key=e313ed0034064b40ac1134635200411&q='+GetLatitute+','+GetLongitute+'&days=4')
            .then(resp => {
                // console.log(resp);
                this.props.onChangeGlobalNextDayWeatherReport({
                    'reports': resp.data.forecast.forecastday
                })
            })
            .catch(resp => {
                console.log(resp);
            })
        }
    }

    ChangeGlobalIP = () => {
        this.props.onChangeGlobalIp(this.state.ip);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <header>
                        <Header></Header>
                    </header>

                    {
                        (this.state.ShowLoader) ? 
                        <div className="show_reports">
                            <div className="loading_loader">Loading...</div>
                        </div>
                        :
                        <div className="show_reports">
                            <TodaysReport></TodaysReport>
                            <div className="next_day_reports">
                                <div className="row">
                                    <NextdaysReport day='1' weather_data={(this.props.NextDayWeatherReport.weather.length >= 2) ? this.props.NextDayWeatherReport.weather[0] : null} />
                                    <NextdaysReport day='2' weather_data={(this.props.NextDayWeatherReport.weather.length >= 2) ? this.props.NextDayWeatherReport.weather[1] : null} />
                                    <NextdaysReport day='3' weather_data={(this.props.NextDayWeatherReport.weather.length >= 2) ? this.props.NextDayWeatherReport.weather[2] : null} />
                                    <NextdaysReport day='4' weather_data={(this.props.NextDayWeatherReport.weather.length >= 2) ? this.props.NextDayWeatherReport.weather[3] : null} />
                                </div>
                            </div>
                        </div>
                    }

                    <footer>
                    <div className="footer">
                        <span>&copy; 2020 Weather Report . All rights reserved | Design & Developed by <a href="https://dey-subhajit.github.io/portfolio">{/* Dark screen developer */} Subhajit Dey</a></span>
                    </div>
                    </footer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        IPSetup: state.ip,
        PincodeSetup: state.pincode,
        GeoLocationSetup: {
            Status: state.currentLocation.status,
            Message: state.currentLocation.status,
            Latitude: state.currentLocation.Latitude,
            Longitude: state.currentLocation.Longitude,
        },
        NextDayWeatherReport: state.NextDayWeather,
    };
};

const mapDespatchToProps = dispatch => {
    return {
        onChangeGlobalIp: (IP) => dispatch({type: 'ChangeIp', newIP: IP}),
        onChangeGlobalWeatherReport: (WeatherReport) => dispatch({type: 'ChangeWeatherReport', 'WeatherReport': WeatherReport}),
        onChangeGlobalNextDayWeatherReport: (NextDayWeatherReport) => dispatch({type: 'NextDayReport', WeatherData: NextDayWeatherReport}),
    };
};

export default connect(mapStateToProps, mapDespatchToProps) (WeatherReport);