import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './ProfileCard'
import CareerInfoCard from './CareerInfoCard'
import PhotosCard from './PhotosCard'
import SchoolInfoCard from './SchoolInfoCard'

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

function CenteredGrid(props) {
  var personName;
  var email;
  var workLocation;
  var workInfo;
  var previousWork;
  var linkedInURL;
  var gradDate;
  var major;
  var imageUrl;

  if (props.person === undefined) {
    personName = "Admin";
    email = "mstalumniwebsite@gmail.com"
    workLocation = "Rolla, MO";
    workInfo = "Webmaster, S&T Alumni Directory";
    previousWork = "N/A";
    linkedInURL = "https://linkedin.com";
    gradDate = "1995";
    major = "Computer Science";
    imageUrl = require('./TempPhotos/1.jpg');
  }
  else {
    personName = props.person.name + " " + props.person.last_name;
    email = props.person.email;
    workLocation = props.person.work_city + ", " + props.person.state;
    workInfo = props.person.business_name + ", " + props.person.work_title;
    previousWork = props.person.previous_work + ", " + props.person.previous_title;
    linkedInURL = props.person.linkedInURL;
    gradDate = props.person.grad_date;
    major = props.person.major;
    imageUrl = props.person.pic_url;
  }

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ProfileCard name={personName} pic={imageUrl}>
          </ProfileCard>
        </Grid>
        <Grid item xs={6}>
          <CareerInfoCard 
            workInfo={workInfo} 
            workLocation={workLocation} 
            previousWork={previousWork} 
            linkedIn={linkedInURL}
          />
        </Grid>
        <Grid item xs={6}>
          <SchoolInfoCard
            gradDate={gradDate}
            major={major}
            email={email}
          />
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
