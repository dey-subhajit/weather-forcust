import React, { Component } from 'react';

class DateShow extends Component{
    render(){
        let today_date = this.props.today_date;
        var mydate = new Date(today_date);
        var weekname = mydate.toLocaleString('en-us', {  weekday: 'long' });
        var date = mydate.getDate();
        let l_date = (find_l_date) => {
            switch(find_l_date) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                case 31: return 'st';
                default: return 'th';
            }
        }
        let Month_name = (month_number) => {
            switch(month_number) {
                case 1: return 'January';
                case 2: return 'Febrary';
                case 3: return 'March';
                case 4: return 'April';
                case 5: return 'May';
                case 6: return 'June';
                case 7: return 'July';
                case 8: return 'August';
                case 9: return 'September';
                case 10: return 'October';
                case 11: return 'November';
                case 12: return 'December';
                default: return 'Error';
            }
        }

        // console.log(today_date, mydate, date);
        return (
        <h6>{ weekname }, {date}{ l_date(date) } { Month_name(mydate.getMonth()+1) }</h6>
        );
    };
}

export default DateShow;