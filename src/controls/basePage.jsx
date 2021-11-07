import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Components
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

//CSS file
import "./basePage.css";

export default class BasePage extends Component {
    state = {
        menuOpen: false,
      };

    toggleDrawer = () => () => {
        if(this.state.menuOpen) {
            this.setState({
                menuOpen: false,
              });
        } else {
            this.setState({
                menuOpen: true,
              });
        }
    };

    render() {
        return (
            <div className="base-page">
                <AppBar position="static" class="app-bar">
                <div class="left-buttons">
                    <Button id = "menu-button" onClick={this.toggleDrawer('bottom',true)}>
                        <MenuIcon/>
                    </Button>
                    <Drawer anchor="left" open={this.state.menuOpen} onClose={this.toggleDrawer()} className="Menu">
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/">
                            Home
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/About">
                              About
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/Map_Search">
                              Map Search
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/Rank_List">
                              Rankings
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/Profile">
                            My Profile
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/Admin">
                            Admin
                          </Link>
                      </Button>
                      <Button id="menu-item" onClick={this.toggleDrawer()}>
                          <Link className="nav-link" to="/Register_Profile">
                              Register Profile
                          </Link>
                      </Button>
                    </Drawer>
                </div>
                <div class="title">
                    <header> Missouri S&T Alumni Directory</header>
                </div>
                <div class = "right-buttons">
                    <Button variant="contained" color="white" id="button">
                        <Link className="top-nav-link" to="/Profile">
                            Sign In
                        </Link>
                    </Button>
                </div>
                </AppBar>
            </div>
        );
    }
}
