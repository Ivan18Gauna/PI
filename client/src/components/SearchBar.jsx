import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { getNameVideogames } from "../actions";



export default function SearchBar (){
    const dispach = useDispatch();
    const [name,setName] = useState(' ')

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
       
    }

    function handlesudmit(e){
        e.preventDefault();
        dispach(getNameVideogames(name))
        
    }

    return(
        <div>
            <input type="text" placeholder="Buscar..." onChange={(e)=> handleInput(e)}/>
            <button type="sudmit" onClick={(e)=>handlesudmit(e)}>Buscar</button>
        </div>
    )
}

