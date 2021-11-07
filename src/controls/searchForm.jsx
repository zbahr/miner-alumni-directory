import React, { Component } from 'react';

import AlumniStore from '../store/AlumniStore.jsx';
import ActionCreator from '../ActionCreator/firebase.jsx'
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';

var as = new AlumniStore();
var ac = new ActionCreator(as);

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 297,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 610,
        marginTop: 14
    },
    dense: {
      marginTop: 10,
    },
    dense2: {
        marginTop: 4,
    },
    menu: {
      width: 200,
    },
  });

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alumni: {
                name: "",
                last_name: "",
                business_name: "",
                state: "",
                major: "",
                gradYear: ""
            },
            submit: false
        }
    }

    handleChange = name => event => {
        this.setState({
            alumni: {
                ...this.state.alumni,
                [name] : event.target.value
            }
        });
    };

    clear = () => event => {
        this.setState({
            alumni: {
                name: "",
                last_name: "",
                business_name: "",
                state: "",
                major: "",
                gradYear: ""
            }
        });
    }

    submit = () => event => {
        this.props.onSubmit(this.state.alumni);
    }
    
    render() {
        const { classes } = this.props;
        <input type="hidden" value="hidden"/>

        return (
            <form className="{classes.container}" onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        this.submit();
                    }
                }}
            >
                <TextField
                    name="firstName"
                    label="First Name"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.name}
                    style={{width:"44.5%"}}
                    onChange={this.handleChange('name')}
                    margin="dense"
                    variant="outlined"
                    autoComplete='hidden'
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.last_name}
                    style={{width:"44.5%"}}
                    onChange={this.handleChange('last_name')}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <TextField
                    name="employer"
                    label="Employer"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.business_name}
                    onChange={this.handleChange('business_name')}
                    style={{width: "90%"}}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <TextField
                    name="workLocation"
                    label="Work Location"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.state}
                    onChange={this.handleChange('state')}
                    style={{width: "90%", 'padding-bottom': "10px"}}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <TextField
                    name="major"
                    label="Major"
                    className={classNames(classes.textField, classes.dense2)}
                    value={this.state.alumni.major}
                    onChange={this.handleChange('major')}
                    style={{width: "90%", 'padding-bottom': "10px"}}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <TextField
                    name="gradYear"
                    label="Graduation Year"
                    className={classNames(classes.textField, classes.dense2)}
                    value={this.state.alumni.gradYear}
                    onChange={this.handleChange('gradYear')}
                    style={{width: "90%", 'padding-bottom': "10px"}}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br /><br />
                <Button variant="outlined" color="primary" style={{width: 350, height: 35}} onClick={this.submit()}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" style={{width: 150, height: 35, margin: '10px'}} onClick={this.clear()}>
                    Clear
                </Button>
                <br />
                <br />
            </form>
        );
    }
}

SearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchForm);