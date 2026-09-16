import Chart from "https://cdn.jsdelivr.net/npm/chart.js/auto/+esm";

export function countryHeader(data, photo){

    const elements = {};
    document.querySelectorAll(".country-header [id]").forEach(element => elements[element.id] = element)

    document.querySelector(".country-header-card").style.backgroundImage = `url(${photo.url})`;
    elements.continentBadge.textContent = data.continents[0];
    elements.countryFlagLarge.src = data.flag.url_png;
    elements.countryHeaderCapital.textContent = data.capitals[0].name;
    elements.countryHeaderCurrency.textContent = `${data.currencies[0].name}(${data.currencies[0].code})`;
    elements.countryHeaderPopulation.textContent = data.population;
    elements.countryHeaderTimezone.textContent = data.timezones[0];
    elements.countryName.textContent = data.names.common;
    elements.countryNativeName.textContent = data.names.official;
    elements.description.textContent = data.descriptions.long;

}

export function statRow(data){

    const elements = {};
    document.querySelectorAll(".stat-row [id]").forEach(element => elements[element.id] = element);

    elements.statPopulation.textContent = data.population;
    elements.statArea.textContent = `${data.area.kilometers} km²`;
    elements.statCurrencyName.textContent = data.currencies[0].name;
    elements.statOfficialLanguage.textContent = data.languages[0].name;
    elements.statContinent.textContent = data.region;
    elements.statCallingCode.textContent = `+${data.calling_codes[0]}`;

}

const weatherInfo = {
    0: {
        description: "Clear sky",
        dayIcon: "☀️",
        nightIcon: "🌙"
    },
    1: {
        description: "Mainly clear",
        dayIcon: "🌤️",
        nightIcon: "🌙"
    },
    2: {
        description: "Partly cloudy",
        dayIcon: "⛅",
        nightIcon: "☁️"
    },
    3: {
        description: "Overcast",
        dayIcon: "☁️",
        nightIcon: "☁️"
    },
    45: {
        description: "Fog",
        dayIcon: "🌫️",
        nightIcon: "🌫️"
    },
    48: {
        description: "Depositing rime fog",
        dayIcon: "🌫️",
        nightIcon: "🌫️"
    },
    51: {
        description: "Light drizzle",
        dayIcon: "🌦️",
        nightIcon: "🌧️"
    },
    53: {
        description: "Moderate drizzle",
        dayIcon: "🌦️",
        nightIcon: "🌧️"
    },
    55: {
        description: "Dense drizzle",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    56: {
        description: "Light freezing drizzle",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    57: {
        description: "Dense freezing drizzle",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    61: {
        description: "Slight rain",
        dayIcon: "🌦️",
        nightIcon: "🌧️"
    },
    63: {
        description: "Moderate rain",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    65: {
        description: "Heavy rain",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    66: {
        description: "Light freezing rain",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    67: {
        description: "Heavy freezing rain",
        dayIcon: "🌧️",
        nightIcon: "🌧️"
    },
    71: {
        description: "Slight snow fall",
        dayIcon: "🌨️",
        nightIcon: "🌨️"
    },
    73: {
        description: "Moderate snow fall",
        dayIcon: "🌨️",
        nightIcon: "🌨️"
    },
    75: {
        description: "Heavy snow fall",
        dayIcon: "❄️",
        nightIcon: "❄️"
    },
    77: {
        description: "Snow grains",
        dayIcon: "🌨️",
        nightIcon: "🌨️"
    },
    80: {
        description: "Slight rain showers",
        dayIcon: "🌦️",
        nightIcon: "🌧️"
    },
    81: {
        description: "Moderate rain showers",
        dayIcon: "🌦️",
        nightIcon: "🌧️"
    },
    82: {
        description: "Violent rain showers",
        dayIcon: "⛈️",
        nightIcon: "⛈️"
    },
    85: {
        description: "Slight snow showers",
        dayIcon: "🌨️",
        nightIcon: "🌨️"
    },
    86: {
        description: "Heavy snow showers",
        dayIcon: "❄️",
        nightIcon: "❄️"
    },
    95: {
        description: "Thunderstorm",
        dayIcon: "⛈️",
        nightIcon: "⛈️"
    },
    96: {
        description: "Thunderstorm with slight hail",
        dayIcon: "⛈️",
        nightIcon: "⛈️"
    },
    99: {
        description: "Thunderstorm with heavy hail",
        dayIcon: "⛈️",
        nightIcon: "⛈️"
    }
};

export function weather(data, country, capital){

    const elements = {};
    document.querySelectorAll(".weather [id]").forEach(element => elements[element.id] = element)

    const dayOrNightIcon = data.current.is_day === 0? "dayIcon" : "nightIcon";

    elements.weatherTitle.textContent = `Current weather in ${capital}`
    elements.weatherLocation.textContent = `${capital}, ${country}`
    elements.weatherIcon.textContent = weatherInfo[data.current.weather_code][dayOrNightIcon]
    elements.weatherTemperature.textContent = `${data.current.temperature_2m}°C`;
    elements.weatherCondition.textContent = weatherInfo[data.current.weather_code].description;
    elements.weatherFeelsLike.textContent = `Feels-like temperature: ${data.current.apparent_temperature}°C`;
    elements.weatherHumidity.textContent = `${data.current.relative_humidity_2m}%`;
    elements.weatherWind.textContent = `${data.current.wind_speed_10m}km/h`;
    elements.weatherPressure.textContent = `${data.current.surface_pressure}hPa`;

    for(let day = 0; day < 5; day++){

        const weekday = new Date(data.daily.time[day]).toLocaleString("en-US", {weekday: "short"}).replace(".", "");

        elements.forecast.insertAdjacentHTML("beforeend", `
           <div class="day">
            <span>${weekday}</span>
            <div class="icon">${weatherInfo[data.daily.weather_code[day]].dayIcon}</div>
            <strong >${data.daily.temperature_2m_max[day]}° / ${data.daily.temperature_2m_min[day]}°</strong>
          </div>
            `)
    }

}

export function map(lat, lon){
    const map = document.querySelector("iframe");
    map.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;

    const coordinates = document.getElementById("mapCoordinates");
    coordinates.textContent = `Coordinates: ${lat}, ${lon}`
}

export function economy(data, currency){

    const elements = {};
    document.querySelectorAll(".economy [id]").forEach(element => elements[element.id] = element);

    const variationBrl = (((data.exchange.at(-2).rate / data.exchange.at(0).rate) - 1) * 100).toFixed(2);
    const variationUsd = (((data.exchange.at(-1).rate / data.exchange.at(1).rate) - 1) * 100).toFixed(2);

    elements.gdpNominal.textContent = `US$ ${data.indicators[0].value}`;
    elements.gdpPerCapita.textContent = `US$ ${data.indicators[1].value}`;
    elements.inflationAnnual.textContent = `${data.indicators[2].value}%`;
    elements.economyCurrency.textContent = `${currency.name} (${currency.code})`;
    elements.exchangeBrl.textContent = `1 ${currency.code} = R$ ${data.exchange.at(-2).rate}`;
    elements.exchangeBrlTrend.textContent = `${variationBrl}%`;
    elements.exchangeUsd.textContent = `1 ${currency.code} = USD ${data.exchange.at(-1).rate}`;
    elements.exchangeUsdTrend.textContent = `${variationUsd}%`;

    if(variationBrl < 0){
        elements.exchangeBrlTrend.style.color = "#e55454";
    }else{
        elements.exchangeBrlTrend.style.color = "#54e58d"
    }

    if(variationUsd < 0){
        elements.exchangeUsdTrend.style.color = "#e55454";
    }else{
        elements.exchangeUsdTrend.style.color = "#54e58d"
    }

    const labels = data.exchange.filter((item, i) => {if(i%2 === 0) return item}).map(item => item.date.slice(2, 7).replaceAll("-", "/"));
    const brlData = data.exchange.filter(item => item.quote === "BRL").map(item => item.rate);
    const usdData = data.exchange.filter(item => item.quote === "USD").map(item => item.rate);
    
    const chart = new Chart(elements.chart, {
        type: "line",

        data:{
            labels: labels,
            datasets: [{
                label: `${currency.code} → BRL`,
                data: brlData,
                borderColor: "#16a34a",
                backgroundColor: "rgba(22, 163, 74, 0.1)",
                borderWidth: 2,
                pointRadius: 2.5,
                tension: 0.3,
                fill: true
            },{
                label: `${currency.code} → USD`,
                data: usdData,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                borderWidth: 2,
                pointRadius: 2.5,
                tension: 0.3,
                fill: true
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    })
}

export function society(data){

    const elements = {};
    document.querySelectorAll(".society [id]").forEach(element => elements[element.id] = element);

    elements.lifeExpectancy.textContent = `${data.indicators[2].value.toFixed(1)} years`;
    elements.literacy.textContent = `${data.indicators[3].value.toFixed(2)}%`;
    elements.humanDevelopmentIndex.textContent = `${data.indicators[6].value}•${classifyHDI(data.indicators[6].value)}`;
    elements.incomeLevel.textContent = getIncomeLevel(data.indicators[4].value);
    elements.urbanPopulation.textContent = `${data.indicators[5].value.toFixed(2)}%`;

}

export function holidays(data){
    
    const listHolidays = document.querySelector(".holidays .list");

    for (const holiday of data) {

        const dateHoliday = new Date(holiday.date);
        let timeDistanceinDays = ((dateHoliday.getTime() - new Date()) / (1000 * 60 * 60 * 24)).toFixed(0)
        const dateFormated = dateHoliday.toLocaleDateString("en-US", {
            dateStyle: "long"
        });

        if(timeDistanceinDays < 0){
            timeDistanceinDays = ""
        }else{
            timeDistanceinDays = `${timeDistanceinDays} days`
        }

        listHolidays.insertAdjacentHTML("beforeend", `
        <div class="row">
            <div class="left">
              <span class="sico red">▣</span>
              <div>
                <h3>${holiday.name}</h3>
                <p>${dateFormated}</p>
              </div>
            </div>
              <div class="right">${timeDistanceinDays}</div>
            </div>
        `)
    }
    

}

export function neighbors(data){

    const listNeighbors = document.querySelector(".neighbors .list");

    for (const neighbor of data) {

        listNeighbors.insertAdjacentHTML("beforeend", `
        <div class="row">
            <div class="left">
              <img src="${neighbor.flag.url_png}" class="sico blue">
              <div>
                <h3>${neighbor.names.common}</h3>
              </div>
            </div>
            </div>
        `)
    }
    

}

export function news(data){

    const listNews = document.querySelector(".news .news-list");

    for (const news of data) {

        listNews.insertAdjacentHTML("beforeend", `
        <div class="news-item">
            <div class="thumb mountain"></div>
            <div class="news-copy">
              <h3>Japão lança novo plano para energia renovável até 2040</h3>
              <div class="news-meta">NHK World · 2h atrás</div>
            </div>
          </div>
        `)
    }
    
}

export function gallery(data) {
    const elements = {};
    document.querySelectorAll(".gallery [id]").forEach(element => elements[element.id] = element);

    console.log(elements)

    for(let photo = 0; photo < 4; photo++){
        elements[`gallery_image_${photo + 1}`].src = data[photo].url;
        elements[`gallery_label_${photo + 1}`].textContent = data[photo].alt_description;
    }
}

function classifyHDI(hdi) {
    hdi = Number(hdi)
    if (hdi < 0.550) return "Low";
    if (hdi < 0.700) return "Medium";
    if (hdi < 0.800) return "High";
    return "Very High";
}

function getIncomeLevel(gni) {
    if (gni <= 1175) return "Low income";
    if (gni <= 4635) return "Lower-middle income";
    if (gni <= 14375) return "Upper-middle income";
    return "High income";
}