import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import CenteredGrid from './ProfileCards/ProfileGrid'

export default withAuth(
  class Profile extends Component {
    state = { 
      authenticated: null, 
      currentUserName: '', 
      currentUserEmail: '',
      alumni: {}
    };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }

      console.log(this.state.currentUserEmail);
    };

    async componentDidMount() {
      var ex = this.props.location.person;
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
      this.setState({
        currentUserEmail: idToken.idToken.claims.email,
        currentUserName: idToken.idToken.claims.name
      });
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
    };

    render() {
      if (this.state.authenticated === null) return null;
      const { currentUserEmail, currentUserName } = this.state;

      // Loads the profile of the received person. If no person received, load own profile
      var personToSend = this.props.location.person;
      const mainContent = this.state.authenticated ? (
        <div>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
              Logout
          </button>
          <CenteredGrid person = {personToSend}>
          </CenteredGrid>
        </div>
      ) : (
        <div>
          <p className="lead">
            If you are an Alum, please get your credentials from Admin
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );

      return (
        <div className="jumbotron">
          {mainContent}
        </div>
      );
    }
  }
);
