const initialState = {
  videogames: [],
  allVideoGames: [],
  genres: [],
  deteil: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideoGames: action.payload,
      };
    case "FILTER_BY_STATUS":
      const allVideoGames = state.allVideoGames;

      const statusfiltered =
        action.payload === "All"
          ? allVideoGames
          : allVideoGames.filter((x) => x.genres.includes(action.payload));
      return {
        ...state,
        videogames: statusfiltered,
      };
    case "FILTER_CREATED":
      const allVideoGames2 = state.allVideoGames;
      const createdFilter = () => {
        if (action.payload === "Created") {
          return allVideoGames2.filter((x) => x.createInDb);
        }
        if (action.payload === "Api") {
          return allVideoGames2.filter((x) => !x.createInDb);
        }
        if (action.payload === "All") {
          return allVideoGames2;
        }
      };
      // action.payload === "Created"
      //   ? allVideoGames2.filter((x) => x.createInDb)
      //   : allVideoGames2.filter((x) => !x.createInDb);
      return {
        ...state,
        videogames: createdFilter(),
      };
    case "ORDER_BY_NAME":
      var sortArr;
      if(action.payload === 'atoz'){
        sortArr =  state.videogames.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          })
      }
      if(action.payload === 'ztoa'){
        sortArr =  state.videogames.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
      }
      if(action.payload === 'best'){
        sortArr =  state.videogames.sort(function (a, b) {
          if (a.rating < b.rating) {
            return 1;
          }
          if (a.rating > b.rating) {
            return -1;
          }
          return 0;
        });
      }
      if(action.payload === 'worst'){
        sortArr =  state.videogames.sort(function (a, b) {
          if (a.rating < b.rating) {
            return -1;
          }
          if (a.rating > b.rating) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        videogames: sortArr,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "POST_GENRES":
      return {
        ...state,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
