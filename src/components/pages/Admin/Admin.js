import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlumniCard from '../../../controls/alumniCard.jsx';
import AlumniStore from '../../../store/AlumniStore.jsx';
import ActionCreator from '../../../ActionCreator/firebase.jsx';
import Button from '@material-ui/core/Button';

import { withAuth } from '@okta/okta-react';

//CSS file
import "./Admin.css";

var as = new AlumniStore();
var ac = new ActionCreator(as);

export default withAuth(
  class Admin extends Component {
    state = {
      alumni: {},
      featured: null
    };
    state = { authenticated: null, currentUserName: '', currentUserEmail: ''};

    constructor(){
      super();
      this.handleMakeFeatured = this.handleMakeFeatured.bind(this);
      this.handleApproved = this.handleApproved.bind(this);
      this.handleRejected = this.handleRejected.bind(this);
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentWillMount() {
      await ac.getAlumni();
      var result = await as.getUnapprovedAlumni();
      this.setState({alumni: result});
      var feat = as.getFeaturedAlumni();
      this.setState({featured: feat});
    }

    async componentDidMount() {
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
      const mainContent = this.state.authenticated ? (
        <div>
          <h1>Welcome {currentUserName}</h1>
          <p>Email: {currentUserEmail}</p>
          <p>ADmin Management Page </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
              Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            If you are an Admin, Log back in
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );

      return (
        <div className="jumbotron">
          <h1 className="display-4">Alumni Search Service Admin Portal</h1>
          {/* {mainContent} */}
          {this.renderFeatured()}
          <h3 className="pending">
              Pending Approval
          </h3>
          <div id="cards">
            {this.renderCards()}
          </div>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
              Logout
          </button>
        </div>
      );
    }


    handleMakeFeatured(person){
      ac.makeFeatured(person);
      this.setState({
        featured: person
      });
      this.forceUpdate();
    }

    handleApproved(person){
        ac.approvePerson(person);
        as.addAlumni(person);
        delete this.state.alumni[person.name];
        this.forceUpdate();
    }

    handleRejected(person){
        ac.rejectPerson(person);
        as.removeAlumni(person.name);
        delete this.state.alumni[person.name];
        this.forceUpdate();
    }

    renderCards(){
      var array = [];
      var toRender = this.state.alumni;

      for(var key in toRender){
          array.push(this.renderCard(toRender[key]));
      }
      return array;
    }

    renderCardsApproved(toRender){
      var array = [];
      for(var key in toRender){
          array.push(this.renderCard(toRender[key]));
      }
      return array;
    }

    renderCard(element){
        return(
            <AlumniCard key={element.name} person={element} adminPage={true} handleApproved={this.handleApproved} handleRejected={this.handleRejected} handleMakeFeatured={this.handleMakeFeatured}/>
        );
    }

    renderFeatured(){
      var featured = this.state.featured;
      if(featured == null){
        var approved = as.getApprovedAlumni();
        return(
          <div className = 'selectAlumni'>
            <h3 className="featuredHeader">
              Select A Featured Alumni
            </h3>
            <div id="cards">
              {this.renderCardsApproved(approved)}
            </div>
          </div>
        );
      } else{
        return(
          <div className="featured">
            <h3 className="featuredHeader">
              Featured Alumni
            </h3>
            <div id="featuredCard">
              {this.renderCard(featured)}
            </div>
            <Button id="rfa" onClick={()=>this.removeFeatured(featured)}>
              Remove Featured Alumni
            </Button>
          </div>
        );
      }
    }

    removeFeatured(person){
      ac.removeFeatured(person);
      as.removeFeatured(person);
      this.setState({
        featured: null
      });
      this.forceUpdate();
    }
  }
);
