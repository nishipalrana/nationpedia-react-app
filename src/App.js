import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from "./components/layout/Navbar";
import ViewAllCountryList from './components/pages/ViewAllCountryList';
import ViewCountriesByRegion from './components/pages/ViewCountriesByRegion';
import ViewCountryInfo from './components/pages/ViewCountryInfo';
import HomePage from './components/pages/HomePage';
import AboutUs from './components/layout/AboutUs';
function App() {
  return (
    <div className="App">
      <Router> 
        <NavBar/> 
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/AllCountries" component={ViewAllCountryList}></Route>
          <Route path="/CountriesByRegion" component={ViewCountriesByRegion}></Route>
          <Route path="/viewCountryInfo/:name" component={ViewCountryInfo }></Route>
          <Route path="/aboutus" component={AboutUs}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
