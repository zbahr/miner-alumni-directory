import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfileAvatar from './ProfileAvatar';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    minWidth: 275,
    height: 100
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function ProfileCard(info) {
  console.log(info);
  return (
    <Card style={{backgroundImage: "linear-gradient(#2db950, #c1f0cd)"}}>
    <Grid container spacing={24}>
      <Grid item xs={4}>
        <img width="260px" height="200px" src='http://brand.mst.edu/media/universityadvancement/brand/logos/athletics/primaryidentitymarks/PRIMARY_BANNER_FC.png' style={{margin: '10px'}}/>
      </Grid>
      <Grid item xs={4}>
      <br />
      <ProfileAvatar info={info}>
      </ProfileAvatar>
      <br />
      <Typography variant="h3" component="h2">
        <div style={{fontWeight: "bold", color: "white", filter: "drop-shadow(3px 3px 4px grey)"}}>{info.name}</div>
      </Typography>
      <br />
      <br />
      </Grid>
      <Grid item xs={4}>
        <img width="200px" height="200px" src='https://i.imgur.com/RFCH9hm.png' style={{margin: '10px'}}/>
      </Grid>
    </Grid>
    </Card>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileCard);
