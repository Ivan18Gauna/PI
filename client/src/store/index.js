// import {createStore,applyMiddleware} from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
 import rootReducer from '../reducer';

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



// Importaciones
import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'


export const store = createStore(rootReducer, applyMiddleware(thunk));

// El thunk sirve para que podamos hacer acciones con promesas. Notita ya que no sabía eso

//export default store;