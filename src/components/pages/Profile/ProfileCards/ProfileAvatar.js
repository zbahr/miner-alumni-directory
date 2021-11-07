import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 250,
    height: 250,
  },
};

function ProfileAvatar(props) {
  console.log(props);
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt={props.info.name}
        src={props.info.pic}
        
        className={classNames(classes.bigAvatar)}
      />
    </div>
  );
}

ProfileAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileAvatar);
