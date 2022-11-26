import axios from 'axios'; 

const base_url = "http://localhost:8080/v1/cards";

export default async function findAll(filters = {})  {
    try {
        const response = await axios.get(`${base_url}/selects`, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}