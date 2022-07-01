const { Router, response } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Videogame, Genero } = require("../db");
// const genero = require("../models/Genero");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const API_KEY = "e609f940a0864a2bb2fbba5560fb1189";
  const api1 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`
  );
  const api2 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`
  );
  const api3 = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`
  );

  const allApi = api1.data.results
    .concat(api2.data.results)
    .concat(api3.data.results);
  const apiInfo = await allApi.map((x) => {
    return {
      name: x.name,
      id: x.id,
      img: x.background_image,
      released: x.released,
      rating: x.rating,
      genres: x.genres.map((x) => x.name),
      platforms: x.platforms.map((x) => x.platform.name),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genero,
      atributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
};

const getAllVideogame = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get('/videogame/:id', async (req,res)=>{
  const {id} = req.params
  const apiUrl = await axios.get("https://api.rawg.io/api/games?key=e609f940a0864a2bb2fbba5560fb1189");
  const apiInfo = await apiUrl.data.results.find(x => x.id ===  parseInt(id))

  if(apiInfo){
    const xo = {
      id: apiInfo.id,
      name: apiInfo.name,
      img: apiInfo.background_image,
      dataLan: apiInfo.released,
      rating: apiInfo.rating,
      platforms: apiInfo.platforms.map(x => x.platform.name),
      genres: apiInfo.genres,
    }
  res.status(200).send(xo)
  }else{
    res.status(404).send(`el id:${id} no fue encontrado`)
  }
})

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  const allVg = await getAllVideogame();
  
  if (name) {
    let nameVg = await allVg.filter((x) =>
      x.name.toLowerCase().includes(name.toLowerCase())
    );
    nameVg.length
      ? res.status(200).send(nameVg)
      : res.status(404).send(`no existe el videogame ${name}`);
  } else {
    res.status(200).send(allVg);
  }
});


router.post('/videogames', async(req,res)=>{
const {name,desciption,dataInfo,rating,genres,createInDb} = req.body
let videogameCreated = await Videogame.create({name,desciption,dataInfo,rating,createInDb})

let genresDb = await Genero.findAll({
  where:{name: genres}
})
videogameCreated.addGenero(genresDb)
res.send(`Videogame ${name} creado con exito`)

})

router.get("/genres", async (req, res) => {
  const apiUrl = await axios.get(
    "https://api.rawg.io/api/games?key=e609f940a0864a2bb2fbba5560fb1189"
  );
  const genres1 = apiUrl.data.results.map((x) => x.genres.map((y) => y.name));
  const mflat = genres1.flat(2);

  const arr2 = [];
  for (i = 0; i < mflat.length; i++) {
    if (!arr2.includes(mflat[i])) {
      arr2.push(mflat[i]);
    }
  }

  for (let i = 0; i < arr2.length; i++) {
    Genero.findOrCreate({
      where: { name: arr2[i] },
    });
  }
  const allGenres = await Genero.findAll();

  res.send(allGenres);
});

module.exports = router;
