import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './nestedGrid.styles.css'
import CircleMediaPlayer from '../circle-media-player/CircleMediaPlayer'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing.unit,
    // marginLeft: '50%',
    // width: '70%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background : "rgb(57, 65, 77) ",
    borderRadius: "20%"
  },
});

function FormRow(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
            <div className="accounts-song-tile">
            <img className="accounts-thumbnail-pic" src={props.song.thumbnailUrl}/>
                    <div className="accounts-details">
                  <span className="accounts-song-title" style={{textTransform: "capitalize"}}>{props.song.title}</span>
                  <span className="accounts-song-artist" style={{textTransform: "capitalize"}}>{props.song.artist}</span>
                  
                  </div> 
                  <CircleMediaPlayer onClick={()=>(localStorage.setItem('current-song'))} src={props.song.songUrl}/>          
            </div>            
            </Paper>
      </Grid>          
    </React.Fragment>
  );
}

FormRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

function NestedGridLiked(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid container item xs={12} spacing={2}>
            {
              
              props.liked.map(song=>(
                <FormRow classes={classes} song={song}/>
              ))
            }
         
        </Grid>
    
      </Grid>
    </div>
  );
}

NestedGridLiked.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGridLiked);
