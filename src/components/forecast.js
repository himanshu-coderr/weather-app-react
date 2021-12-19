import React from "react";

import './forecast.scss'

class Forecast extends React.Component {
  render() {
    let flag = 0;
    const items = this.props.forecast.map((f, i) => {
      const image = {
        url: `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
        alt: `Image of  ${f.weather[0].description}`,
      };
      const description = f.weather[0].description;
      const unixTimestamp = f.dt;
      let hour = new Date(unixTimestamp * 1000).getHours();
      console.log(hour)
      

      if(hour !== 0 && flag === 0){
        let ampm = 'AM';
        if (hour === 0) hour = 12; 
        else if (hour > 12) {
          hour = hour - 12;
          ampm = 'PM';
        }
        return (
          <div key={i} className="forecast-item">
            <p className="forecast-item__time">{hour} {ampm}</p>
            <p className="forecast-item__temp">
              {f.temp} <span className="forecast-item__degree">°</span>
            </p>
            <img className="forecast-item__img" src={image.url} alt={image.alt} />
            <p className="forecast-item__description">{description}</p>
          </div>
        );
      }
      else{
        flag = 1
      }


    });

    let num = 1;
    const daily = this.props.forecastDaily.map((f,i) => {

      if(num !== 8){
        const image = {
          url: `http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`,
          alt: `Image of  ${f.weather[0].description}`,
        };
        const description = f.weather[0].description;
        const unixTimestamp = f.dt;
        let datetime = new Date(unixTimestamp * 1000);
        let day = `${datetime.toDateString().slice(0,4)}`;
        num += 1;
        // console.log(day)


      return (
        <div key={i} className="forecast-item">
          <p className="forecast-item__time">{day}</p>
          <p className="forecast-item__temp">
            {f.temp.day} <span className="forecast-item__degree">°</span>
          </p>
          <img className="forecast-item__img" src={image.url} alt={image.alt} />
          <p className="forecast-item__description">{description}</p>
        </div>
      );
      } // if ends
    })

    return (
      <div className="forecast">
        <h3 className="forecast__title">Hourly Forecast</h3>
        <div className="forecast-items">{items}</div>
        {/* -------------------------------------------------------------- */}
        <h3 className="forecast__title">Daily Forecast</h3>
        <div className="forecast-items">{daily}</div>
      </div>

    );
  }
}

export default Forecast;
