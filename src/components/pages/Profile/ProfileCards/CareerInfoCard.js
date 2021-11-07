import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    maxWidth: 800,
    height: 500
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

function CareerInfoCard(props) {
  console.log(props);
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card} style={{backgroundImage: "linear-gradient(#2db950, #c1f0cd)"}}>
      <CardContent>
        <Typography variant="h4" component="h2" style={{ borderBottom: '0.1em solid #eafaee', padding: '0.3em' }}>
          <div style={{fontWeight: "bold", color: "white", filter: "drop-shadow(3px 3px 4px grey)"}}>Career Information</div>
        </Typography>
        <Typography style={{ borderBottom: '0.1em solid #eafaee'}}>
          <Typography variant="h5" component="h4" style={{paddingTop: '15px'}}>
            <b>Current Work</b>
          </Typography>
          <Typography variant="h6" component="h4">
            <div style={{paddingBottom: '15px'}}>{props.workInfo}</div>
          </Typography>
        </Typography>
        <Typography style={{ borderBottom: '0.1em solid #eafaee'}}>
          <Typography variant="h5" component="h4" style={{paddingTop: '15px'}}>
            <b>Work Location</b>
          </Typography>
          <Typography variant="h6" component="h4">
            <div style={{paddingBottom: '15px'}}>{props.workLocation}</div>
          </Typography>
        </Typography>
        <Typography style={{ borderBottom: '0.1em solid #eafaee'}}>
          <Typography variant="h5" component="h4" style={{paddingTop: '15px'}}>
            <b>Previous Work</b>
          </Typography>
          <Typography variant="h6" component="h4">
            <div style={{paddingBottom: '15px'}}>{props.previousWork}</div>
          </Typography>
        </Typography>
        <Typography>
          <Typography variant="h5" component="h4" style={{paddingTop: '15px', paddingBottom: '5px'}}>
            <b>LinkedIn</b>
          </Typography>
          <Typography variant="h6" component="h4">
            <div style={{paddingBottom: '15px'}}><a href={props.linkedIn} target="_blank"><img alt="" src={require('./TempPhotos/linkedin-icon.png')}/></a></div>
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}

CareerInfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CareerInfoCard);
