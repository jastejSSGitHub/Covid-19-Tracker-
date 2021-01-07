import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Tracker from "./Tracker.js";
import logomain from "./logomain.png";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav">
        <Link to="/"> 
        <div className="logo">
            <img src={logomain} alt="logo" />
              <h2>COVID-19 TRACKER</h2>
          </div>
        </Link>            

          
          <div className="nav__links">
            <Redirect to="/"></Redirect>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/tracker">TRACKER</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="app__body">
          <Switch>
            <Route  path="/tracker">
              <Tracker />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;