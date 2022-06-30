const initialState = {
  videogames: [],
  allVideoGames: [],
  genres: [],
  deteil:[]
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
      const createdFilter =
        action.payload === "Created"
          ? allVideoGames2.filter((x) => x.createInDb)
          : allVideoGames2.filter((x) => !x.createInDb);
      return {
        ...state,
        videogames: createdFilter,
      };
    case "ORDER_BY_NAME":
      const sortArr =
        action.payload === "az"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
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
    case 'GET_DETAILS':
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state;
  }
}
export default rootReducer;
