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

export function getNameVideogames(name){
   try {
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/videogames?name='+ name)
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
    }
   } catch (error) {
    console.log(error)
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

export function getGenres (){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type:"GET_GENRES",
            payload:info.data
        })
    }
}

export function postGenres (payload){
    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/videogames',payload)
        console.log(json)
        return json
    }
}

export function getDetail (id) {
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogame/'+ id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}