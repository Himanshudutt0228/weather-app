let form = document.querySelector('#weatherform');
let cityname = document.querySelector('#cityname');
let temp = document.querySelector('#temp');
let forcast = document.querySelector('#Forcast')
let city = document.querySelector('#city');
let body = document.querySelector('body')
let feels = document.querySelector("#feels");
let high = document.querySelector("#high");
let low = document.querySelector("#low");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");




async function getweather(){
    
    let cityvalue = city.value.trim();
    if (!cityvalue) {
    cityname.innerText = "Enter a city";
    return null;
}
    let url = `https://api.weatherapi.com/v1/forecast.json?key=a5d6e0ecfab34a578df214151262007 &q=${encodeURIComponent(cityvalue)}&days=1&aqi=no&alerts=no`;
    try{let response = await axios.get(url);                  
   
    return response.data
    }catch(e){ if (e.response?.status === 400) {
        cityname.innerText = "City not found";
    } else {
        cityname.innerText = "Unable to load weather";
    }

    temp.innerText = "--";
    forcast.innerText = "Please try again";
    return null;
    }
    
    

}

async function displayweather(){
    let weather = await getweather();
    if(!weather){
        console.log('No data found');
        return;
        
    }
    console.log(weather.location.name);
    console.log(Math.floor(weather.current.temp_c));
    console.log(weather.current.condition.text);
    cityname.innerText = weather.location.name;
    temp.innerHTML = `${Math.floor(weather.current.temp_c)} &deg;C`;
    forcast.innerText = weather.current.condition.text;
    feels.innerText =
    `Feels Like: ${Math.round(weather.current.feelslike_c)}°C`;

high.innerText =
    `High: ${Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°C`;

low.innerText =
    `Low: ${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°C`;

humidity.innerText =
    `Humidity: ${weather.current.humidity}%`;

wind.innerText =
    `Wind: ${Math.round(weather.current.wind_kph)} km/h`


    
    city.value='';
    bodyimage(weather.current.condition.text);


}

form.addEventListener('submit',async function(event){
    event.preventDefault();
    await displayweather();
    console.log('done');
    
    
    
})

function bodyimage(forcast) {
    let conditions = forcast.toLowerCase();

    if (
        conditions.includes("sunny") ||
        conditions.includes("clear")
    ) {
        body.style.backgroundImage = "url('./images/sunny.jpg')";
    } else if (conditions.includes("partly cloudy")) {
        body.style.backgroundImage =
            "url('./images/partlycloudy.jpg')";
    } else if (
        conditions.includes("rain") ||
        conditions.includes("drizzle") ||
        conditions.includes("shower")
    ) {
        body.style.backgroundImage = "url('./images/rainy.jpg')";
    } else if (
        conditions.includes("cloud") ||
        conditions.includes("mist") ||
        conditions.includes("fog")
    ) {
        body.style.backgroundImage = "url('./images/cloudy.jpg')";
    } else {
        body.style.backgroundImage = "url('./images/default.jpg')";
    }
}

