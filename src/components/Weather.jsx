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

        if (isCelsious > 30){
            document.body.style.backgroundImage = `url(https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg)`
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        } else {
            document.body.style.backgroundImage = `url(https://www.stormshieldapp.com/static/images/section1.1-bg.jpg)`
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        }

        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        
        
      

        return (
            
            <div className='card' style={{color: "purple"}}>
                <h1>Weather App</h1>
                <h4>{data.name}{","}{" "}{data.sys?.country}.</h4>
                <p>{output}</p>
                <div className='row'>
                <div className='col1'>
                    <img src={` http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} style={{ fontSize: "10px" }} alt="" />
                    <p>Temperature:{" "}{celsious.toFixed(2)}{" "}{isCelsious ? "°C." : "°F."}</p>
                </div>
                <div className='col2'>
                   <li>Wind speed:{" "}{data.wind?.speed} m/s</li>
                   <li>Humidity:{" "}{data.main?.humidity}%</li>
                   <li>Clouds:{" "}{data.clouds?.all}%</li>
                    <p></p>
                </div>
                </div>
                <button className='button' onClick={convertToFahren}>{isCelsious ? "Convertir a Fahrenheit." : "Convertir a Celsius."}</button>
            </div>
        );

        }
export default Weather;