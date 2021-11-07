import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import './App.css';
import BasePage from "./controls/basePage";
import LandingPage from "./controls/landingPage";
import About from "./components/pages/About";
import Map_Search from "./components/pages/Map_Search";
import Rank_List from "./components/pages/Rank_List";
import Profile from "./components/pages/Profile/Profile";
import Login from "./components/auth/Login";
import Admin from "./components/pages/Admin/Admin";
import Admin_Login from "./components/auth/Admin_Login";
import Register_Profile from "./components/pages/Register_Profile";

// function to check for token
function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <div className='CurrentPage'>
        <Router>
          <Security issuer='https://dev-421687.oktapreview.com/oauth2/default'
                    client_id='0oagjuyhl83noRosP0h7'
                    redirect_uri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired} >
            <div className="App">
              <BasePage/>
                <div className='LandingPage'>
                  <Route path="/" exact={true} component={LandingPage} />
                </div>
              <Route path="/About" exact={true} component={About} />
              <Route path="/Map_Search" exact={true} component={Map_Search} />
              <Route path="/Rank_List" exact={true} component={Rank_List} />
              <SecureRoute path="/Profile" exact={true} component={Profile} />
              <SecureRoute path="/Admin" exact={true} component={Admin} />
              <Route
                path='/login'
                render={() => (
                  <Login baseUrl='https://dev-421687.oktapreview.com' />
                )}
              />
              <Route path="/Register_Profile" exact={true} component={Register_Profile} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
            </div>
          </Security>
        </Router>
      </div>
    );
  }
}

export default App;
<div className='LandingPage'>
  <LandingPage/>
</div>
