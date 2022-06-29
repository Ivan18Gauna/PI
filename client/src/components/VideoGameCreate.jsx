import React, {useState,useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postGenres, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";


export default function VideogameCreate (){
    const dispatch = useDispatch()
    const history = useHistory()

    const genres = useSelector((state)=> state.genres)

    const [input,setInput] = useState({
        name:"",
        description:"",
        data:"",
        rating:"",
        genres:[],
    })
    function handleChange (e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    // function handleCheck (){
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             genres: e.target.value
    //         })
    //     }
    // }

    function handleSelect (e){
        setInput({
            ...input,
            genres: [...input.genres,e.target.value]
        })
    }

    function handleSudmit (e){
    e.preveventDefault();
    console.log(input)
    dispatch(postGenres(input))
    alert('personaje creado')
    setInput({
        name:"",
        description:"",
        data:"",
        rating:"",
        genres:[],
    })
    history.push('/home')
    }

    useEffect(()=>{
        dispatch(getGenres())
    },[]);


    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu videogame</h1>
            <form onSubmit={(e)=>handleSudmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input type="text" value={input.description} name="description" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Fecha de lanzamiento:</label>
                    <input type="text" value={input.data} name="data" onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Raiting:</label>
                    <input type="text" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}/>
                </div>
               
                    <div>
                        <label>Generos:</label>
                        <select onChange={(e)=>handleSelect(e)}>
                        {genres.map(x => (
                            <option value={x.name}>{x.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.genres.map(x => x+" ,")}</li></ul>
                    </div>
                
                <button type="submit">Crear videogame</button>
            </form>
        </div>
    )

}