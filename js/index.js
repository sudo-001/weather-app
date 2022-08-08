const container = document.querySelector(".container");
const countryName = document.querySelector(".countryName");
const form = document.querySelector(".search-form");
const nomVille = document.querySelector(".title > h2");
const date = document.querySelector(".date");
const image = document.querySelector(".weather-prev > img");
const temperature = document.querySelector(".temperature > span");
const feels_like_temp = document.querySelector(".temperature > div > span");
const description = document.querySelector(".description");
const hotDeg = document.querySelector(".temp");

var today = new Date();

// Openweathermap API KEY
const apiKey = "5ec51b06b4b50eb88b8ef1b906190344";

// Country coordonates
var coordonates = [];

// Onsubmit a search background color will change (test)
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    getCoordonates(countryName.value);

});


function getCoordonates(name) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=10&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            coordonates = data;
            console.log(coordonates);
            getWeatherData(coordonates[0].lat, coordonates[0].lon);
        })
        .catch(err => console.log({ err }))
}

function getWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=fr&units=metric`)
        .then(res => res.json())
        .then(data => {
            currentDate = today.getFullYear() +"/"+(today.getMonth()+1)+"/"+today.getDate();
            
            console.log(data);

            nomVille.innerHTML = data.name + " , " + data.sys.country;
            date.innerHTML = currentDate;
            description.innerHTML = data.weather[0].description;
            temperature.innerHTML = data.main.temp + "°";
            feels_like_temp.innerHTML = data.main.feels_like + "°";
            let icon = data.weather[0].icon.replace('n', 'd');
            console.log(icon);
            
            image.setAttribute("src", ` https://openweathermap.org/img/wn/${icon}.png`);
            if (data.main.temp <= 25 ) {
                hotDeg.style.backgroundColor = `rgba(255, 255, 255, 0.${(Math.floor(data.main.temp))})`;   
            } else {
                hotDeg.style.backgroundColor = `rgba(${(Math.floor(data.main.temp))}, 0,0, 0.4)`;
            }
            
        })
        .catch(err => console.log({ err }))
}
