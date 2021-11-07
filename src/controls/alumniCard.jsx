import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import AlumniStore from '../store/AlumniStore.jsx';
import ActionCreator from '../ActionCreator/firebase.jsx'

//CSS file
import "./alumniCard.css";
import { Link } from 'react-router-dom';

var as = new AlumniStore();
var ac = new ActionCreator(as);

let styles = {
    largeIcon: {
      width: 100,
      height: 100,
    },
};

export default class AlumniCard extends Component{
    constructor(person){
        super();
        this.state = {name: person.name, work_zipcode: person.work_zipcode}
    }

    render(){
        var space = ' ';
        var destination = {
            pathname: '/Profile',
            person: this.props.person
        };
        return(
            <div id = 'card'>
                    <Card>
                        <CardContent>
                        <Link to={destination}>
                            <div className = "top-section">
                                <Avatar className='avatar' style={{width: "70px", height: "70px"}}>
                                    {this.renderPic()}
                                </Avatar>
                                <div id="Text">
                                    <div id = "Name">
                                        {this.props.person.name}
                                        {space}
                                        {this.props.person.last_name}
                                    </div>
                                    <div id = "Business">
                                        {this.props.person.business_name}
                                    </div>
                                </div>
                            </div>
                            </Link>
                            {this.renderApproval()}
                        </CardContent>
                    </Card>
            </div>
        );
    }

    renderApproval(){
        if(this.props.person.approved == "no"){
            return(
                <div id="buttons">
                    <Button class = "approve" onClick={()=>this.props.handleApproved(this.props.person)}>
                        Approve
                    </Button>
                    <Button class ="reject" onClick={()=>this.props.handleRejected(this.props.person)}>
                        Reject
                    </Button>

                </div>
            );
        } else{
            if(this.props.person.featured == "no" && this.props.adminPage){
                return(
                    <Button class="featureCard" onClick={()=>this.props.handleMakeFeatured(this.props.person)}>
                        Make Featured
                    </Button>
                );
            }
        }
    }

    renderPic(){
            var str = this.props.person.pic_url;
            return(
                <img class='pic' src={this.props.person.pic_url}/>
            );
    }
}
