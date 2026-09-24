export async function request(url, options = {}) {
    try {
        console.log("INICIANDO:", url);

        const response = await fetch(url, options);

        console.log("RESPONDEU:", url, response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("FALHOU:", url);
        console.error(error);
        throw error;
    }
}

const currentDate = new Date();

export async function restCountry(country) {

  const headers = {
    Authorization: `Bearer ${process.env.API_KEY_RESTCOUNTRIES}`
  };

  let response = await request(`https://api.restcountries.com/countries/v5?q=${country}`, { headers });

  if (response.data.objects.length > 0) {
    return response;
  }

  response = await request(`https://api.restcountries.com/countries/v5/names.translations?q=${country}`, { headers });

  return response;
}

export async function openMeteo(lat, lon) {

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,is_day",

    daily: "weather_code,temperature_2m_max,temperature_2m_min",

    forecast_days: 5,

    timezone: "auto"
});

  return request(`https://api.open-meteo.com/v1/forecast?${params}`);

}

export async function worldBank(countryCode) {

  const indicators = [
    "NY.GDP.MKTP.CD",     
    "NY.GDP.PCAP.CD",
    "SP.DYN.LE00.IN", 
    "SE.ADT.LITR.ZS", 
    "NY.GNP.PCAP.CD", 
    "SP.URB.TOTL.IN.ZS" 
];

  const promisses = indicators.map(indicator => request(`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&MRV=1`));
  
  return promisses;

}

export async function frankfurter(currency) {

  const from = new Date();
  from.setFullYear(from.getFullYear() - 1)
  
  return request(`https://api.frankfurter.dev/v2/rates?base=${currency}&quotes=USD,BRL&from=${from.toISOString().slice(0, 10)}&to=${currentDate.toISOString().slice(0, 10)}&group=month`);

}

export async function nagerHolidays(countryCode) {

    return request(`https://nagerholidays.com/api/v4/Holidays/${countryCode}/${currentDate.getFullYear()}`);

}

export async function neighbors(borders) {

  const promisses = borders.map(code => request(`https://api.restcountries.com/countries/v5/codes.alpha_3/${code}?response_fields=names.common,codes.alpha_3,flag.url_png`, { headers: { 'Authorization': `Bearer ${process.env.API_KEY_RESTCOUNTRIES}` }}));

  return promisses;
}

export async function newsApi(country) {

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const params = new URLSearchParams({
      q: `${country} AND (government OR politics OR economy OR disaster OR security OR weather OR health OR business)`,
      searchIn: "title",
      language: "en",
      sortBy: "relevancy",
      pageSize: 3,
      from: oneMonthAgo.toISOString(),
      apiKey: process.env.API_KEY_NEWSAPI
    });

    return request(`https://newsapi.org/v2/everything?${params}`);
  }

export async function unsplash(country) {

    const queries = [
    `${country} landmark`,
    `${country} city`,
    `${country} nature`,
    `${country} landmark`,
    `${country} culture`
  ];

    const promisses = queries.map(query => request(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${process.env.API_KEY_UNSPLASH}`));

    return promisses;
}

export async function undp(countryCode) {

    return request(`https://hdrdata.org/api/CompositeIndices/query?apikey=${process.env.API_KEY_UNDP}&countryOrAggregation=${countryCode}&indicator=HDI`);

}