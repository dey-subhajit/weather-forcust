const initialState = {
    pincode: null,
    currentLocation: {
        status: null,
        message: '',
        Latitude: null,
        Longitude: null,
    },
    ip: null,
    WeatherReport: {
        status: 0,
        location: {
            city: '',
            country: '',
        },
        icon: null,
        todays_date: '',
        temperature: {
            celsius: null,
            fahrenheit: null
        },
        humidity: '',
        wind: '',
    },
    NextDayWeather: {
        status: 0,
        weather: [{
            next_date: null,
            temperature: {
                celsius: null,
            },
            icon: null
        }],
    }
};

const reducer = (state = initialState, action) => {
    if(action.type === 'ChangePinCode'){
        return{
            ...state,
            pincode: action.newPinCode.replace('-', ''),
            ip: null,
            currentLocation: {
                status: null,
                message: '',
                Latitude: null,
                Longitude: null,
            },
        }
    }
    if(action.type === 'ChangeCurrentLocation'){
        return{
            ...state,
            pincode: null,
            ip: null,
            currentLocation: {
                status: action.newLocation.status,
                message: action.newLocation.message,
                Latitude: action.newLocation.latitude,
                Longitude: action.newLocation.longitude,
            },
        }
    }
    if(action.type === 'ChangeIp'){
        return{
            ...state,
            ip: action.newIP,
            pincode: null,
            currentLocation: {
                status: null,
                message: '',
                Latitude: null,
                Longitude: null,
            },
        }
    }

    // ------------------------------------------------------------------------------------------------
    //      Weather Report update start
    // ------------------------------------------------------------------------------------------------
    if(action.type === 'ChangeWeatherReport'){
        return {
            ...state,
            pincode: null,
            currentLocation: {
                status: null,
            },
            ip: null,
            WeatherReport: {
                status: 1,
                location: {
                    city: action.WeatherReport.area,
                    country: action.WeatherReport.cuntry,
                },
                todays_date: action.WeatherReport.date_time,
                temperature: {
                    celsius: action.WeatherReport.temp_c,
                    fahrenheit: action.WeatherReport.temp_f,
                },
                humidity: action.WeatherReport.humidity,
                wind: action.WeatherReport.wind,
            }
        }
    }

    // ---------------------------------------------------------------------------------------------------
    // Next day report
    // ---------------------------------------------------------------------------------------------------
    if(action.type === 'NextDayReport'){
        let weather_repot = action.WeatherData.reports;
        if(weather_repot.length > 2){
            weather_repot.shift();
        }
        let data = new Array();
        weather_repot.map((report_data) => {
            data.push({
                next_date: report_data.date,
                temperature: {
                    celsius: report_data.day.avgtemp_c
                }
            })
        })
        if(weather_repot[1]) {
            let today = new Date();
            today.setDate(new Date(weather_repot[1].date).getDate()+1);
            
            var month = today.getUTCMonth() + 1;
            var day = today.getUTCDate();
            var year = today.getUTCFullYear();
            data.push({
                next_date: year+'-'+month+'-'+day,
                temperature: {
                    celsius: weather_repot[1].day.avgtemp_c
                }
            })

            today = new Date();
            today.setDate(new Date(weather_repot[1].date).getDate()+2);
            
            month = today.getUTCMonth() + 1;
            day = today.getUTCDate();
            year = today.getUTCFullYear();
            data.push({
                next_date: year+'-'+month+'-'+day,
                temperature: {
                    celsius: weather_repot[1].day.avgtemp_c
                }
            })
        }
        
        return {
            ...state,
            NextDayWeather: {
                status: 1,
                weather: data,
            }

        }
    }

    return state;
}

export default reducer;