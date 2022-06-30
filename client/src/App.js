import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import VideogameCreate from './components/VideoGameCreate';
import Detail from './components/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path='/' component={LandingPage}/>
    <Route path='/home/:id' component={Detail}/>
    <Route path='/home' component={Home}/>
    <Route path='/videogames' component={VideogameCreate}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;