import React, { Component } from 'react';

import AlumniStore from '../../store/AlumniStore.jsx';
import ActionCreator from '../../ActionCreator/firebase.jsx'
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
        marginTop: 14,
    },
    menu: {
        width: 200,
    },
});


class registerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alumni: {
                name: "",
                last_name: "",
                email: "",
                business_name: "",
                work_title: "",
                city: "",
                state: "",
                zipcode: "",
                major: "",
                gradYear: "",
                prev_work: "",
                prev_title: "",
                linkedIn: "",
                pic_url: new File(["foo"], "foo.jpg", {
                    type: 'image'
                })
            },
            submit: false
        }
    }

    handleChange = name => event => {
        this.setState({
            alumni: {
                ...this.state.alumni,
                [name]: event.target.value
            }
        });
        console.log(this.state.alumni);
    };

    async shouldComponentUpdate(nextProps, nextState) {
        if (nextState.submit) {
            var allgood = true;
            var zipcodeNaN = false;
            var gradYearNaN = false;
            var invalidEmail = false;
            var invalidImage = false;
            var invalidLinkedIn = false;

            if (nextState.alumni.name === "")
                allgood = false;
            else if (nextState.alumni.last_name === "")
                allgood = false;
            else if (nextState.alumni.email === "")
                allgood = false;
            else if (nextState.alumni.business_name === "")
                allgood = false;
            else if (nextState.alumni.city === "")
                allgood = false;
            else if (nextState.alumni.state === "")
                allgood = false;
            else if (nextState.alumni.zipcode === "")
                allgood = false;
            else if (nextState.alumni.major === "")
                allgood = false;
            else if (nextState.alumni.gradYear === "")
                allgood = false;
            else if (nextState.alumni.work_title === "")
                allgood = false;
            else if (nextState.alumni.linkedIn === "")
                allgood = false;
            
            if (nextState.alumni.prev_work === "")
                nextState.alumni.prev_work = "N/A";
            
            if (nextState.alumni.prev_title === "")
                nextState.alumni.prev_title = "N/A";

            if (!(/^((\S)*@[a-zA-Z0-9]*\.[a-zA-Z0-9]*)$/.test(nextState.alumni.email))) {
                invalidEmail = true;
                allgood = false;
            }

            if (!(/^([0-9]*)$/.test(nextState.alumni.zipcode))) {
                zipcodeNaN = true;
                allgood = false;
            }

            if (!(/^([0-9]{4})$/.test(nextState.alumni.gradYear))) {
                gradYearNaN = true;
                allgood = false;
            }

            if(!(/^(http(s)?\:\/\/)?(www\.)?(linkedin\.com\/in\/(\S)+(\/)?)$/).test(nextState.alumni.linkedIn)){
                invalidLinkedIn = true;
                allgood = false;
            }

            try{
                var validImages = ["image/gif", "image/jpeg", "image/png"];
                var image = document.getElementById("alumni_profile_picture").files[0];
                var imageType = image["type"];
            
                if(validImages.indexOf(imageType) === -1){

                    console.log("here");
                    allgood = false;
                    invalidImage = true;
                }
            }
            catch(exception){
                invalidImage = true;
                allgood = false;
            }    

            if (allgood) {
                await ac.inputProfile(nextState.alumni, document.getElementById("alumni_profile_picture").files[0]);
                nextState.submit = false;
            }
            else if (zipcodeNaN) {
                nextState.submit = false;
                alert('ZIP CODE MUST BE A NUMBER');
            }
            else if (gradYearNaN) {
                if (nextState.alumni.gradYear != "")
                    alert('GRADUATION YEAR MUST BE A FOUR DIGIT NUMBER');
                else
                    alert('FILL OUT ALL FIELDS BEFORE SUBMITTING');
                nextState.submit = false;
            }
            else if (invalidEmail) {
                alert('INVALID EMAIL ADDRESS. PLEASE ENTER A VALID EMAIL ADDRESS, E.G. "MissouriAlumni62@website.com"');
                nextState.submit = false;
            }
            else if(invalidImage){
                alert('INVALID PROFILE PICTURE. PLEASE SELECT AN IMAGE TO BE YOUR PROFILE PICTURE');
                nextState.submit = false;
            }
            else if (invalidLinkedIn){
                alert('INVALID LINKEDIN PROFILE. PLEASE ENTER A VALID LINKEDIN URL');
                nextState.submit = false;
            }
            else {
                nextState.submit = false;
                alert('FILL OUT ALL REQUIRED FIELDS BEFORE SUBMITTING');
            }
        }
    }

    submit = () => event => {
        this.setState({
            submit: true
        });
    }

    render() {
        const { classes } = this.props;
     //   <input type="hidden" value="hidden" />

        return (
            <form className="{classes.container}">
                <TextField
                    name="firstName"
                    label="First Name"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.name}
                    style={{ width: "44.5%" }}
                    onChange={this.handleChange('name')}
                    margin="dense"
                    variant="outlined"
                    autoComplete='hidden'
                    required="true"
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.last_name}
                    style={{ width: "44.5%" }}
                    onChange={this.handleChange('last_name')}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <br />
                <TextField
                    name="email"
                    label="Current Email Address"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.email}
                    onChange={this.handleChange('email')}
                    style={{ width: "90%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <br />
                <TextField
                    name="employer"
                    label="Employer"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.business_name}
                    onChange={this.handleChange('business_name')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <TextField
                    name="work_title"
                    label="Work Title"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.work_title}
                    onChange={this.handleChange('work_title')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <br />
                <TextField
                    name="city"
                    label="Employer City"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.city}
                    onChange={this.handleChange('city')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <TextField
                    name="zipcode"
                    label="Employer Zip Code"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.zipcode}
                    onChange={this.handleChange('zipcode')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                    required="true"
                />
                <br />
                <TextField
                    name="prev_work"
                    label="Previous Employer"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.prev_work}
                    onChange={this.handleChange('prev_work')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <TextField
                    name="prev_title"
                    label="Previous Employer Title"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.prev_title}
                    onChange={this.handleChange('prev_title')}
                    style={{ width: "44.5%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <TextField
                    name="linkedIn"
                    label="LinkedIn Profile URL *"
                    className={classNames(classes.textField, classes.dense)}
                    value={this.state.alumni.linkedIn}
                    onChange={this.handleChange('linkedIn')}
                    style={{ width: "90%" }}
                    autoComplete='hidden'
                    margin="dense"
                    variant="outlined"
                />
                <br />
                <br />
                <FormControl variant="outlined" className="form-control" required="true" style={{ width: "90%", display: "inline", 'padding-bottom': '10px' }}>
                    <InputLabel
                        ref={ref => {
                            this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="outlined-state-simple"
                    >
                        Employer State
                    </InputLabel>
                    <Select
                        value={this.state.alumni.state}
                        onChange={this.handleChange('state')}
                        style={{ width: "90%", 'margin-bottom': '10px' }}
                        input={
                            <OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name="state"
                                id="outlined-state"
                            />
                        }
                    >
                        <MenuItem value="" />
                        <MenuItem value={'Alabama'}>Alabama</MenuItem>
                        <MenuItem value={'Alaska'}>Alaska</MenuItem>
                        <MenuItem value={'Arizona'}>Arizona</MenuItem>
                        <MenuItem value={'Arkansas'}>Arkansas</MenuItem>
                        <MenuItem value={'California'}>California</MenuItem>
                        <MenuItem value={'Colorado'}>Colorado</MenuItem>
                        <MenuItem value={'Connecticut'}>Connecticut</MenuItem>
                        <MenuItem value={'Delaware'}>Delaware</MenuItem>
                        <MenuItem value={'Florida'}>Florida</MenuItem>
                        <MenuItem value={'Georgia'}>Georgia</MenuItem>
                        <MenuItem value={'Hawaii'}>Hawaii</MenuItem>
                        <MenuItem value={'Idaho'}>Idaho</MenuItem>
                        <MenuItem value={'Illinois'}>Illinois</MenuItem>
                        <MenuItem value={'Indiana'}>Indiana</MenuItem>
                        <MenuItem value={'Iowa'}>Iowa</MenuItem>
                        <MenuItem value={'Kansas'}>Kansas</MenuItem>
                        <MenuItem value={'Kentucky'}>Kentucky</MenuItem>
                        <MenuItem value={'Louisiana'}>Louisiana</MenuItem>
                        <MenuItem value={'Maine'}>Maine</MenuItem>
                        <MenuItem value={'Maryland'}>Maryland</MenuItem>
                        <MenuItem value={'Massachusetts'}>Massachusetts</MenuItem>
                        <MenuItem value={'Michigan'}>Michigan</MenuItem>
                        <MenuItem value={'Minnesota'}>Minnesota</MenuItem>
                        <MenuItem value={'Mississippi'}>Mississippi</MenuItem>
                        <MenuItem value={'Missouri'}>Missouri</MenuItem>
                        <MenuItem value={'Montana'}>Montana</MenuItem>
                        <MenuItem value={'Nebraska'}>Nebraska</MenuItem>
                        <MenuItem value={'Nevada'}>Nevada</MenuItem>
                        <MenuItem value={'New Hampshire'}>New Hampshire</MenuItem>
                        <MenuItem value={'New Jersey'}>New Jersey</MenuItem>
                        <MenuItem value={'New Mexico'}>New Mexico</MenuItem>
                        <MenuItem value={'New York'}>New York</MenuItem>
                        <MenuItem value={'North Carolina'}>North Carolina</MenuItem>
                        <MenuItem value={'North Dakota'}>North Dakota</MenuItem>
                        <MenuItem value={'Ohio'}>Ohio</MenuItem>
                        <MenuItem value={'Oklahoma'}>Oklahoma</MenuItem>
                        <MenuItem value={'Oregon'}>Oregon</MenuItem>
                        <MenuItem value={'Pennsylvania'}>Pennsylvania</MenuItem>
                        <MenuItem value={'Rhode Island'}>Rhode Island</MenuItem>
                        <MenuItem value={'South Carolina'}>South Carolina</MenuItem>
                        <MenuItem value={'South Dakota'}>South Dakota</MenuItem>
                        <MenuItem value={'Tennessee'}>Tennessee</MenuItem>
                        <MenuItem value={'Texas'}>Texas</MenuItem>
                        <MenuItem value={'Utah'}>Utah</MenuItem>
                        <MenuItem value={'Vermont'}>Vermont</MenuItem>
                        <MenuItem value={'Virginia'}>Virginia</MenuItem>
                        <MenuItem value={'Washington'}>Washington</MenuItem>
                        <MenuItem value={'West Virginia'}>West Virginia</MenuItem>
                        <MenuItem value={'Wisconsin'}>Wisconsin</MenuItem>
                        <MenuItem value={'Wyoming'}>Wyoming</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControl variant="outlined" className="form-control" required="true" style={{ width: "90%", display: "inline", 'padding-bottom': '10px' }}>
                    <InputLabel
                        ref={ref => {
                            this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="outlined-major-simple"
                    >
                        Major
                    </InputLabel>
                    <Select
                        value={this.state.alumni.major}
                        onChange={this.handleChange('major')}
                        style={{ width: "90%", 'margin-bottom': '10px' }}
                        input={
                            <OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name="major"
                                id="outlined-major"
                            />
                        }
                    >
                        <MenuItem value="" />
                        <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                        <MenuItem value={'Computer Engineering'}>Computer Engineering</MenuItem>
                        <MenuItem value={'Electrical Engineering'}>Electrical Engineering</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControl variant="outlined" className="form-control" required="true" style={{ width: "90%", display: "inline", 'padding-bottom': '10px' }}>
                    <InputLabel
                        ref={ref => {
                            this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        htmlFor="outlined-grad-year"
                    >
                        Graduation Year
                    </InputLabel>
                    <Select
                        value={this.state.alumni.gradYear}
                        onChange={this.handleChange('gradYear')}
                        style={{ width: "90%", 'margin-bottom': '10px' }}
                        input={
                            <OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name="gradYear"
                                id="outlined-grad-year"
                            />
                        }
                    >
                        <MenuItem value="" />
                        <MenuItem value={2018}>2018</MenuItem>
                        <MenuItem value={2017}>2017</MenuItem>
                        <MenuItem value={2016}>2016</MenuItem>
                        <MenuItem value={2015}>2015</MenuItem>
                        <MenuItem value={2014}>2014</MenuItem>
                        <MenuItem value={2013}>2013</MenuItem>
                        <MenuItem value={2012}>2012</MenuItem>
                        <MenuItem value={2011}>2011</MenuItem>
                        <MenuItem value={2010}>2010</MenuItem>
                        <MenuItem value={2009}>2009</MenuItem>
                        <MenuItem value={2008}>2008</MenuItem>
                        <MenuItem value={2007}>2007</MenuItem>
                        <MenuItem value={2006}>2006</MenuItem>
                        <MenuItem value={2005}>2005</MenuItem>
                        <MenuItem value={2004}>2004</MenuItem>
                        <MenuItem value={2003}>2003</MenuItem>
                        <MenuItem value={2002}>2002</MenuItem>
                        <MenuItem value={2001}>2001</MenuItem>
                        <MenuItem value={2000}>2000</MenuItem>
                        <MenuItem value={1999}>1999</MenuItem>
                        <MenuItem value={1998}>1998</MenuItem>
                        <MenuItem value={1997}>1997</MenuItem>
                        <MenuItem value={1996}>1996</MenuItem>
                        <MenuItem value={1995}>1995</MenuItem>
                        <MenuItem value={1994}>1994</MenuItem>
                        <MenuItem value={1993}>1993</MenuItem>
                        <MenuItem value={1992}>1992</MenuItem>
                        <MenuItem value={1991}>1991</MenuItem>
                        <MenuItem value={1990}>1990</MenuItem>
                        <MenuItem value={1989}>1989</MenuItem>
                        <MenuItem value={1988}>1988</MenuItem>
                        <MenuItem value={1987}>1987</MenuItem>
                        <MenuItem value={1986}>1986</MenuItem>
                        <MenuItem value={1985}>1985</MenuItem>
                        <MenuItem value={1984}>1984</MenuItem>
                        <MenuItem value={1983}>1983</MenuItem>
                        <MenuItem value={1982}>1982</MenuItem>
                        <MenuItem value={1981}>1981</MenuItem>
                        <MenuItem value={1980}>1980</MenuItem>
                        <MenuItem value={1979}>1979</MenuItem>
                        <MenuItem value={1978}>1978</MenuItem>
                        <MenuItem value={1977}>1977</MenuItem>
                        <MenuItem value={1976}>1976</MenuItem>
                        <MenuItem value={1975}>1975</MenuItem>
                        <MenuItem value={1974}>1974</MenuItem>
                        <MenuItem value={1973}>1973</MenuItem>
                        <MenuItem value={1972}>1972</MenuItem>
                        <MenuItem value={1971}>1971</MenuItem>
                        <MenuItem value={1970}>1970</MenuItem>
                        <MenuItem value={1969}>1969</MenuItem>
                        <MenuItem value={1968}>1968</MenuItem>
                        <MenuItem value={1967}>1967</MenuItem>
                        <MenuItem value={1966}>1966</MenuItem>
                        <MenuItem value={1965}>1965</MenuItem>
                        <MenuItem value={1964}>1964</MenuItem>
                        <MenuItem value={1963}>1963</MenuItem>
                        <MenuItem value={1962}>1962</MenuItem>
                        <MenuItem value={1961}>1961</MenuItem>
                        <MenuItem value={1960}>1960</MenuItem>
                        <MenuItem value={1959}>1959</MenuItem>
                        <MenuItem value={1958}>1958</MenuItem>
                        <MenuItem value={1957}>1957</MenuItem>
                        <MenuItem value={1956}>1956</MenuItem>
                        <MenuItem value={1955}>1955</MenuItem>
                        <MenuItem value={1954}>1954</MenuItem>
                        <MenuItem value={1953}>1953</MenuItem>
                        <MenuItem value={1952}>1952</MenuItem>
                        <MenuItem value={1951}>1951</MenuItem>
                        <MenuItem value={1950}>1950</MenuItem>
                        <MenuItem value={1949}>1949</MenuItem>
                        <MenuItem value={1948}>1948</MenuItem>
                        <MenuItem value={1947}>1947</MenuItem>
                        <MenuItem value={1946}>1946</MenuItem>
                        <MenuItem value={1945}>1945</MenuItem>
                        <MenuItem value={1944}>1944</MenuItem>
                        <MenuItem value={1943}>1943</MenuItem>
                        <MenuItem value={1942}>1942</MenuItem>
                        <MenuItem value={1941}>1941</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    Upload A Profile Picture (Required): <input type="file" 
                        id="alumni_profile_picture"
                        required="true"
                        formControlName="file"
                    />
                </div>
                <br /><br />
                <Button variant="outlined" color="primary" style={{ width: 250, height: 35 }} onClick={this.submit()}>
                    Register Profile
                </Button>
                <br />
                <br />
            </form>
        );
        
    }
}


registerProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(registerProfile);