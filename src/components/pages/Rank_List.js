import React, { Component } from 'react';
import AlumniStore from "../../store/AlumniStore.jsx"
import ActionCreator from "../../ActionCreator/firebase.jsx"
import Alumni from "../../Models/Alumni.jsx"
import PropTypes from 'prop-types';
import Leaderboard from '../leaderboard.js';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import '../components.css';

var as = new AlumniStore();
var ac = new ActionCreator(as);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Rankings extends Component{

    constructor(props){
      super(props);
      this.state = {
        sorted_major: [{name: "major", score: 3},
                       {name: "help", score: 20},
                       {name: "score", score: 500}],
        sorted_gradDate: [{name: "gradDate", score: 0}],
        sorted_business: [{name: "business", score: 0}],
        sorted_state: [{name: "state", score: 0}],
        paginate: 5,
        semaphore: 1
      }
    }

    render() {
      if(this.state.semaphore === 1)
        return <div className="pageTitle"><br />Loading...</div>
      
      return (
        <div className="rankPage">
          <br />
          <div className="rankBG">
            <div className="pageTitle">Rankings</div>
            <br />
            <br />
              <Grid container spacing={24}>
                <Grid item xs={4}>
                    <Leaderboard title="Majors" users={this.state.sorted_major} paginate={this.state.paginate}/>
                </Grid>
                <Grid item xs={4}>
                    <Leaderboard title="States" users={this.state.sorted_state} paginate={this.state.paginate}/>
                </Grid>
                <Grid item xs={4}>
                    <Leaderboard title="Employers" users={this.state.sorted_business} paginate={this.state.paginate}/>
                </Grid>
              </Grid>
            </div>
        </div>
      );
    }

    async loadData(){
        this.state.semaphore = 1;
        await ac.getAlumni();
        var result = await as.getApprovedAlumni();
        await this.getRanks(result);   
        
    }

    async componentDidMount(){
      this.loadData().then(() => {
        this.setState({semaphore: 0});
      });
    }

    async getRanks(alumni){
      var keys = Object.keys(alumni);
      var values = Object.values(alumni);

      var state_arr = [];
      var major_arr = [];
      var gradDate_arr = [];
      var business_arr = [];

      var state_counts = {};
      var major_counts = {};
      var gradDate_counts = {};
      var business_counts = {};

      for(var i=0; i<keys.length; i++){
        state_arr.push(values[i].state);
        major_arr.push(values[i].major);
        gradDate_arr.push(values[i].graduation_date);
        business_arr.push(values[i].business_name);
      }

      for(var i = 0; i < state_arr.length; i++)
        state_counts[state_arr[i]] = 1 + (state_counts[state_arr[i]] || 0);

      for(var i = 0; i < major_arr.length; i++)
        major_counts[major_arr[i]] = 1 + (major_counts[major_arr[i]] || 0);

      for(var i = 0; i < business_arr.length; i++)
        business_counts[business_arr[i]] = 1 + (business_counts[business_arr[i]] || 0);

      for(var i = 0; i < gradDate_arr.length; i++)
        gradDate_counts[gradDate_arr[i]] = 1 + (gradDate_counts[gradDate_arr[i]] || 0);

      var sorted_state = [];
      var sorted_major = [];
      var sorted_business = [];
      var sorted_gradDate = [];

      for (var state in state_counts)
        sorted_state.push([state, state_counts[state]]);
      sorted_state.sort(function(a,b){
        return b[1] - a[1];
      });

      for (var major in major_counts)
        sorted_major.push([major, major_counts[major]]);
      sorted_major.sort(function(a,b){
        return b[1] - a[1];
      });

      for (var business in business_counts)
        sorted_business.push([business, business_counts[business]]);
      sorted_business.sort(function(a,b){
        return b[1] - a[1];
      });

      for (var gradDate in gradDate_counts)
        sorted_gradDate.push([gradDate, gradDate_counts[gradDate]]);
      sorted_gradDate.sort(function(a,b){
        return b[1] - a[1];
      });

      var json_state = sorted_state.map(function(x) {
        return{
          "name": x[0],
          "score": x[1]
        };
      });

      var json_major = sorted_major.map(function(x) {
        return{
          "name": x[0],
          "score": x[1]
        };
      });

      var json_business = sorted_business.map(function(x) {
        return{
          "name": x[0],
          "score": x[1]
        };
      });

      var json_gradDate = sorted_gradDate.map(function(x) {
        return{
          "name": x[0],
          "score": x[1]
        };
      });

      this.state.sorted_state = json_state;
      this.state.sorted_major = json_major;
      this.state.sorted_business = json_business;
      this.state.sorted_gradDate = json_gradDate;
    }
}

Rankings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rankings);