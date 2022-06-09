import {getJSONFile,setJSONFile, isExist} from './system.service.js';

const saveCityValue = async (key,value) => {
    let data = {};

    if(await isExist()){
        data = await getJSONFile();
    }

    data[key] = value;
    setJSONFile(data);
}

const getCityValue = async (key) => {

    if(await isExist()){
        const data = await getJSONFile();
        return data[key];
    }
    return undefined;
}

export {saveCityValue,getCityValue};