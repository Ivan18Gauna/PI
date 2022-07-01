import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoGames,
  filterVideogamesByGenres,
  filterCreated,
  orderByName,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVidegame = currentPage * videogamesPerPage;
  const indexOgFirstvideogame = indexOfLastVidegame - videogamesPerPage;
  const currentVideogames = allVideoGames.slice(
    indexOgFirstvideogame,
    indexOfLastVidegame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideoGames());
  }

  function handleFilterGenres(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/videogames">Crear Video Game</Link>
      <h1>Video games</h1>
      <SearchBar />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        volver a cargar todos los videogame
      </button>
      <div>
        <select onChange={(e) => handleFilterGenres(e)}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Indie">Indie</option>
          <option value="Platformer">Platformer</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="Api">Existente</option>
          <option value="Created">Creado</option>
        </select>
        <select onChange={(e) => handleSort(e)}>
          <option value="atoz">A-Z</option>
          <option value="ztoa">Z-A</option>
          <option value="best">Mejor rating</option>
          <option value="worst">Peor Rating</option>
        </select>
      

        {currentVideogames?.map((x) => {
          return (
            <div>
              <Link to={"/home/" + x.id}>
                <Card
                  name={x.name}
                  img={x.img}
                  genres={x.genres.map((x) => {
                    for (let i = 0; i < x.length; i++) {
                      return <ul>{x}</ul>;
                    }
                  })}
                  key={x.id}
                />
              </Link>
            </div>
          );
        })}

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideoGames={allVideoGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
