import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenido a la pagina de video juegos</h1>
            <Link to='/home'>
                <button>Iniciar</button>
            </Link>
        </div>
    )
}
