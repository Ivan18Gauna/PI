import axios from 'axios';


export function getVideoGames (){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{
            
        });
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload:json.data
        })
    }
   
}

export function filterVideogamesByGenres(payload){
    
    return{
        type:'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated (payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}