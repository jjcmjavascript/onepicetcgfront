import axios from 'axios'; 

const base_url = 'http://localhost/decks'; 
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ....passport'
}; 

function findAll(request){
    return axios.post(`${base_url}/create`, {request, headers});
}

async function find(request){

}

export {
    findAll,
    find
};