import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);
  const mydetails = useSelector((state) => state.detail);

  return (
    <div>
      {mydetails ? (
        <div>
          <h1>Nombre: {mydetails.name}</h1>
          <img src={mydetails.img} alt="img not found" width='300px' height='400px'/>
          <h2>Genero: {mydetails.genres.map(x => `-${x.name}`)}</h2>
          <h3>Fecha de lanzamiento: {mydetails.dataLan}</h3>
          <h4>Raiting: {mydetails.rating}</h4>
          <h3>Plataformas: {mydetails.platforms.map(x => `-${x}`)}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to='/home'>
        <button>volver</button>
      </Link>
    </div>
  );
}
