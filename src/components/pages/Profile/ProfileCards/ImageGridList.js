import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
});

function ImageGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={2}>
      <img src = {require('./TempPhotos/1.jpg')} />
      <img src = {require('./TempPhotos/2.jpg')} />
      <img src = {require('./TempPhotos/3.jpg')} />
      <img src = {require('./TempPhotos/4.jpg')} />
      <img src = {require('./TempPhotos/5.jpg')} />
      <img src = {require('./TempPhotos/6.jpg')} />
      <img src = {require('./TempPhotos/7.jpg')} />
      <img src = {require('./TempPhotos/8.jpg')} />
      <img src = {require('./TempPhotos/9.jpg')} />
      <img src = {require('./TempPhotos/10.jpg')} />
      <img src = {require('./TempPhotos/11.jpg')} />
      <img src = {require('./TempPhotos/12.jpg')} />
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
