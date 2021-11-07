import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import AlumniCard from './alumniCard.jsx';
import AlumniStore from '../store/AlumniStore.jsx';
import ActionCreator from '../ActionCreator/firebase.jsx'
import SearchForm from "./searchForm.jsx"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//CSS file
import "./landingPage.css";

var as = new AlumniStore();
var ac = new ActionCreator(as);

export default class LandingPage extends Component{
    render(){
        return(
            <div id = 'LP'>
                <div id = 'Featured'>
                    {/* <div className = 'bannerPic'>
                        <img src={require('../images/banner.png')}/>
                    </div>
                    <div id='avatar'>
                        <Avatar id = 'inner-avatar'>
                            <div id='persona'>
                                <Person/>
                            </div>
                        </Avatar>
                    </div> */}
                </div>
                <div className="featuredSection">
                    {this.renderFeatured()}
                </div>
                <div>
                    {this.renderSearchSection()}
                </div>
                <div id ='cards'>
                    {this.renderCards()}
                </div>
            </div>
        );
    }

    async componentWillMount() {
        await ac.getAlumni();
        var result = await as.getApprovedAlumni();
        this.setState({alumni: result});
    }

    constructor(){
        super();
        this.state = {
            alumni: {}, 
            searchOpen: false, 
            fields: {},
            queryState: {}
        };

        this.setQueryState = this.setQueryState.bind(this);
    }

    toggleSearch(){
        this.setState({searchOpen: !this.state.searchOpen});
    }

    renderFeatured(){
        var featured = as.getFeaturedAlumni();
        if(featured == null){
            return null;
        } else {
            return(
                <div className="featuredSection">
                    <h1 className="featuredAlumniHeader">
                        Featured Alumni
                    </h1>
                    <div className="featuredCard">
                        {this.renderCard(featured)}
                    </div>
                </div>
            );
        }
    }

    renderCards(){
        var array = [];
        var toRender = this.state.alumni;

        for(var key in toRender){
            array.push(this.renderCard(toRender[key]));
        }
        return array;
    }

    renderCard(element){
        return(
            <AlumniCard key={element.name} person={element} adminPage={false}/>
        );
    }

    handleChange = panel => (event, searchOpen) => {
        this.setState({
          searchOpen: !this.state.searchOpen,
        });
    };

    onChange = searchData => newValue => {
        this.setState({
            fields: {
                ...this.state.fields,
                ...newValue
            }
        });
    };

    setQueryState = searchData => {
        this.setState({
            alumni: {}
        });

        var result = as.getFilteredAlumni(searchData);
            
        this.setState({
            alumni: result,
            searchOpen: !this.state.searchOpen
        });
    };

    renderSearchSection(){
        console.log("rss");
            return(
                <div className="search">
                    <br />
                    <ExpansionPanel id="expansion-panel" expanded={this.state.searchOpen} onChange={this.handleChange()}>
                        <ExpansionPanelSummary id="expansion-panel-summary" expandIcon={<ExpandMoreIcon />}>
                            <div className="searchTitle">
                                <header className="searchHeader">Search</header>
                            </div>
                        </ExpansionPanelSummary>
                        <SearchForm className="form" onSubmit={this.setQueryState} style={{'padding-bottom': '30px'}}/>
                    </ExpansionPanel>
                </div>
            );
    }
}