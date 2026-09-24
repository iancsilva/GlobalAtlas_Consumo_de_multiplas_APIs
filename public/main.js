import * as render from "./render.js"

const form = document.querySelector("#countrySearch");
const searchScreen = document.querySelector("#searchScreen");
const header = document.querySelector("header");
const main = document.querySelector("main");
const loading = document.querySelector(".loading");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const country = document.querySelector("#countryInput").value.trim();

    try{

    searchScreen.style.display = "none";
    loading.style.display = "block";
    await init(country);

    }catch(error){
        searchScreen.style.display = "grid";
        loading.style.display = "none";
        alert(error);
        throw new Error(error);
    }
    
    loading.style.display = "none";
    header.style.display = "block";
    main.style.display = "block";
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", async (event) => {
    if(event.key === "Enter") await init(searchInput.value)
})

async function init (country){

    const response = await fetch(`/api/countryData?country=${encodeURIComponent(country)}`);
    const countryPageData = await response.json();

    if (!response.ok) {
        throw new Error(countryPageData.error);
    }

    render.countryHeader(countryPageData.country, countryPageData.gallery.shift());
    render.statRow(countryPageData.country);
    render.weather(countryPageData.weather, countryPageData.country.names.common, countryPageData.country.capitals[0].name);
    render.map(countryPageData.country.capitals[0].coordinates.lat, countryPageData.country.capitals[0].coordinates.lng);
    render.economy(countryPageData.economy, countryPageData.country.currencies[0]);
    render.society(countryPageData.economy);
    render.holidays(countryPageData.holidays)
    render.neighbors(countryPageData.neighbors)
    render.news(countryPageData.news)
    render.gallery(countryPageData.gallery)

}
