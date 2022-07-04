import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Weather = () => {
    
    const [data, setData] = useState({});
    const [celsious, setCelsious] = useState(0);
    const [isCelsious, setIsCelsious] = useState(true);
    


    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bfb0862eefbd279ab99b1745802224a7`)
                .then(res => {
                    setData(res.data)
                    setCelsious(res.data.main?.temp - 273.15);
                   
                })

        }

        navigator.geolocation.getCurrentPosition(success);
    }, [])

    console.log(data);

        const convertToFahren = () =>{
             if(isCelsious){
                    setCelsious((celsious * 1.8)+32)
                    setIsCelsious(false);
                }else{
                    setCelsious((celsious - 32)/1.8)
                    setIsCelsious(true);
                }


        }

       
        document.body.style.backgroundImage = `url(https://cdn.dribbble.com/users/2129935/screenshots/12694549/media/ef7f3acd5ca3da6c0e492bbadda809a0.gif)`
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "repeat";
        document.body.style.backgroundSize = "cover";

        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        
        
      console.log(isCelsious);

        return (
            
            <div className='card' style={{color: "yellow"}}>
                <h1>Weather App</h1>
                <h4>{data.name}{","}{" "}{data.sys?.country}.</h4>
                <p>{output}</p>
                <div className='row'>
                <div className='col1'>
                    <img src={` http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} style={{ fontSize: "10px" }} alt="" />
                    <p><i className="fa-solid fa-temperature-high"></i>{" "}Temperature:{" "}{celsious.toFixed(2)}{" "}{isCelsious ? "°C." : "°F."}</p>
                </div>
                <div className='col2'>
                    <i className="fa-solid fa-wind"></i>
                   <li>Wind speed:{" "}{data.wind?.speed} m/s</li>
                   <i className="fa-solid fa-smog"></i>
                   <li>Humidity:{" "}{data.main?.humidity}%</li>
                   <i className="fa-solid fa-cloud"></i>
                   <li>Clouds:{" "}{data.clouds?.all}</li>
                    <p></p>
                </div>
                </div>
                <button className='button' onClick={convertToFahren}>{isCelsious ? "Convertir a Fahrenheit." : "Convertir a Celsius."}</button>
            </div>
        );

        }
export default Weather;