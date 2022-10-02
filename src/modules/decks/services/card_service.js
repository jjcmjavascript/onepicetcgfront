import axios from 'axios'; 

const base_url = "http://localhost:8080/v1/cards";
const headers = {
    'Content-Type': 'application/json',
}; 

async function findAll(filters = {})  {
    try {
        let formatedFilters = ''; 
        Object.keys(filters).forEach(function(key){
            return formatedFilters = formatedFilters.concat(`${key}=${filters[key]}&`);
        });

        let options = {headers};
        const response = await axios.get(`${base_url}?${formatedFilters}`, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



export default {
    findAll
};