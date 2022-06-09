import { getKeyValue} from "./storage.service.js";
import {TOKEN_DICTIONARY} from './system.service.js';
import { getCityValue} from "./city.service.js";

import axios from "axios";

const getWeather = async () =>{
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const city = await getCityValue(TOKEN_DICTIONARY.city);
    if(!token){
        throw new Error('Не задан ключ API, подробнее -h');
    }

    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params:{
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data;
}
export {getWeather};