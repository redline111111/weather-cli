#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import {printError, printHelp, printSuccess, printWeather} from './services/log.service.js';
import {saveKeyValue} from './services/storage.service.js';
import {TOKEN_DICTIONARY} from './services/system.service.js';
import {saveCityValue} from './services/city.service.js';


const saveCity = async (city) =>{
    if(!city.length){
        printError("Не введен город");
        return;
    }
    try{
        await saveCityValue(TOKEN_DICTIONARY.city, city);
        printSuccess("Город сохранен");
    } catch (e){
        printError(e);
    }

}

const saveToken = async (token) =>{
    if(!token.length){
        printError("Не передан токен");
        return;
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Токен сохранен");
    } catch (e){
        printError(e);
    }

}

const getForcast = async () => {
    try{
        const weather = await getWeather();
        printWeather(weather);
    } catch(e) {
        if (e?.response?.status == 404){
            printError('Неверно указан город');
        }
        if (e?.response?.status == 401){
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
   
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if(args.h){
        printHelp();
    }
    if(args.s){
        saveCity(args.s);
    }
    if(args.t){
        return saveToken(args.t);
    }
    getForcast();
}
initCLI();