import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGenres, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "El campo Nombre es obligatorio";
  }
  if (!input.description) {
    errors.description = "El campo Descripcion es obligatorio";
  }
  if (!input.data) {
    errors.data = "El campo Fecha de lanzamiento es obligatorio";
  }
  if (!input.rating) {
    errors.rating = "El campo Raiting es obligatorio";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    data: "",
    rating: "",
    genres: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  // function handleCheck (){
  //     if(e.target.checked){
  //         setInput({
  //             ...input,
  //             genres: e.target.value
  //         })
  //     }
  // }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSudmit(e) {
    e.preveventDefault();
    console.log(input);
    dispatch(postGenres(input));
    alert("personaje creado");
    setInput({
      name: "",
      description: "",
      data: "",
      rating: "",
      genres: [],
    });
    history.push("/home");
  }

  function handleDelete(x){
    setInput({
      ...input,
      genres: input.genres.filter(genre => genre !== x)
    })
  }

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu videogame</h1>
      <form onSubmit={(e) => handleSudmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Fecha de lanzamiento:</label>
          <input
            type="text"
            value={input.data}
            name="data"
            onChange={(e) => handleChange(e)}
          />
          {errors.data && <p>{errors.data}</p>}
        </div>
        <div>
          <label>Raiting:</label>
          <input
            type="text"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p>{errors.rating}</p>}
        </div>

        <label>Generos:</label>
        <select onChange={(e) => handleSelect(e)}>
          {genres.map((x) => (
            <option value={x.name}>{x.name}</option>
          ))}
        </select>
        <br />
        <br />

        <button type="sudmit">Crear videogame</button>
      </form>
      {input.genres.map(el =>
        <div>
          <p>
            {el}
          </p>
          <button onClick={()=> handleDelete(el)}>X</button>
        </div>
        )}
    </div>
  );
}
