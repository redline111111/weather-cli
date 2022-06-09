import {getJSONFile,setJSONFile, isExist} from './system.service.js';



const saveKeyValue = async (key,value) => {
    let data = {};

    if(await isExist()){
        data = await getJSONFile();
    }

    data[key] = value;
    setJSONFile(data);
}   

const getKeyValue = async (key) => {

    if(await isExist()){
        const data = await getJSONFile();
        return data[key];
    }
    return undefined;
}

export {saveKeyValue,getKeyValue};