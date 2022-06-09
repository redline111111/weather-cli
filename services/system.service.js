import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const getJSONFile = async () => {
    const file = await promises.readFile(filePath);
    const parseFile = await JSON.parse(file);
    return parseFile;
}

const setJSONFile = async (data) => {
    await promises.writeFile(filePath, JSON.stringify(data));
}

const isExist = async () =>{
    try{
        await promises.stat(filePath);
        return true;
    } catch(e){
        return false;
    }
    
}
export {getJSONFile, setJSONFile, isExist,TOKEN_DICTIONARY};