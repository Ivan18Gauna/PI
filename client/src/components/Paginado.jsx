import React from "react";

export default function Paginado ({videogamesPerPage,allVideoGames,paginado}){
    const pageNumbers = []

for (let i = 1; i <=Math.ceil(allVideoGames/videogamesPerPage); i++) {
pageNumbers.push(i)    
}
return(
    <div>
        <ul className="paginado">
            {pageNumbers &&
                pageNumbers.map(number=>(
                    <li className="number" key={number}>
                        <a onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
        </ul>
    </div>
)
}