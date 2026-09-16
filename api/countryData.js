import * as api from "../services/apis.js"

export default async function handler(req, res) {
    try{

      const country = req.query.country;
    
    if (!country) {
            return res.status(400).json({
                error: "O país não foi informado."
            });
        }

    const countryPageData = {
      country: {},

      weather: {},

      economy: {},

      society: {},

      holidays: {},

      neighbors: {},

      news: {},

      gallery: {}
    };

    countryPageData.country = (await api.restCountry(country)).data.objects[0];
      
    const params = {
      name: countryPageData.country.names.common,
      lat: countryPageData.country.coordinates.lat,
      lon: countryPageData.country.coordinates.lng,
      alpha2: countryPageData.country.codes.alpha_2,
      alpha3: countryPageData.country.codes.alpha_3,
      currency: countryPageData.country.currencies[0].code,
      borders: countryPageData.country.borders
    }
    
    const [openMeteo, frankfurter, worldBank, undp, nagerHolidays, neighbors, newsApi, unsplash] = await Promise.all([
      api.openMeteo(params.lat, params.lon),
      api.frankfurter(params.currency),
      Promise.all([...await api.worldBank(params.alpha3)]),
      api.undp(params.alpha3),
      api.nagerHolidays(params.alpha2),
      Promise.all([...await api.neighbors(params.borders)]),
      api.newsApi(params.name),
      Promise.all([...await api.unsplash(params.name)])
    ]);
    
    countryPageData.weather = openMeteo;
    countryPageData.economy["indicators"] = worldBank.map(indicator => indicator[1][0]);
    const IDH = undp.reduce((acc, att) => Number(acc.year) > Number(att.year)? acc : att);
    countryPageData.economy.indicators.push(IDH);
    countryPageData.economy["exchange"] = frankfurter;
    countryPageData.holidays = nagerHolidays;
    countryPageData.neighbors = neighbors.map(neighbor => neighbor.data.objects[0]);
    countryPageData.news = newsApi.articles;
    countryPageData.gallery = unsplash.map(photo => ({alt_description: photo.results[0].alt_description, url: photo.results[0].urls.regular}));
    
    res.status(200).json(countryPageData);

    }catch(error){

      return res.status(500).json({
            error: "Não foi possível carregar os dados do país."
        });

    }
    
}