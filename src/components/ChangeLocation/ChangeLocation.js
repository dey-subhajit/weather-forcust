import React, { Component } from 'react';
import './ChangeLocation.css';
import { WiCloudRefresh } from "weather-icons-react";

import { connect } from 'react-redux';

class ChangeLocation extends Component{
    state = {
        pincode: '',
        keycode: '',
    }

    ChangePincode = (event) => {
        // console.log(event.target.value, this.state.keycode);
        if(this.state.keycode !== 8){
            if(event.target.value.length < 4){
                this.setState({pincode: event.target.value});
            }
            if(event.target.value.length === 3){
                this.setState({pincode: event.target.value+'-'});
            }
            if(event.target.value.length < 8 && event.target.value.length > 3){
                this.setState({pincode: event.target.value});
            }
        }
        else{
            this.setState({pincode: this.state.pincode.slice(0, -1)});
        }
    }

    GetKeyCode = (event) => {
        this.setState({keycode: event.keyCode});
    }

    ChangeGlobalPinCode = () => {
        if(this.state.pincode.length === 7)
            this.props.onChangeGlobalPincode(this.state.pincode);
    }

    GetLocation = (props) => {
        /*navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        },
        function(error) {
            console.log(error);
            this.setState({
                currentLocation: 0,
                message: 'Browser Deny To Pick Your Location',
            });
        });*/
        
        const success = (position ) => {
            // console.log(position);
            // console.log(position.coords.latitude, position.coords.longitude);
            this.props.onClickGetLocation({
                status: 1,
                message: '',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }

        const error = ( e ) => {
            this.props.onClickGetLocation({
                status: 0,
                message: 'Your Browser Location Not Allow',
                latitude: null,
                longitude: null,});
        }

        navigator.geolocation.getCurrentPosition(success, error);
        // this.props.onChangeGlobalPincode(this.state.pincode);
    }

    render(){
        return (
            <React.Fragment>
                {(this.props.GeoLocationMessage !== "")? 
                    <div>
                        <small>{ this.props.GeoLocationMessage }</small>
                    </div>
                : null
                }
                <div className="change_location">                    
                    <button onClick={this.GetLocation}><WiCloudRefresh size={35} color='#000' /> Get Current Location</button>
                </div>
                <div className="change_pincode">
                    <span className="pincode_textbox">
                        <input type="text" placeholder="Enter your 6 digit pincode" readOnly value={this.state.pincode} onKeyDown={this.GetKeyCode} onChange={this.ChangePincode} onKeyUp={this.ChangeGlobalPinCode} />
                        <span>Coming Soon</span>
                    </span>
                </div>
                {/* {console.log('asdasd', this.props.globalPincode, this.props.ip)} */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        globalPincode: state.pincode,
        ip: state.ip,
        GeoLocationMessage: state.currentLocation.message
    };
};

const mapDespatchToProps = dispatch => {
    return {
        onChangeGlobalPincode: (newPinCode) => dispatch({type: 'ChangePinCode', newPinCode: newPinCode}),
        onClickGetLocation: (newLocation) => dispatch({type: 'ChangeCurrentLocation', newLocation: newLocation}),
    }
}

export default connect(mapStateToProps, mapDespatchToProps) (ChangeLocation);