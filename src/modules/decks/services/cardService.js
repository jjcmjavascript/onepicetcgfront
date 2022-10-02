import axios from 'axios'; 

const base_url = "http://localhost:8080/v1/cards";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ....passport'
}; 

function findAll(request){
    return axios.post(base_url, {request, headers});
}

async function find(request){

}

export {
    findAll,
    find
};