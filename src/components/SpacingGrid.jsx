
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexDirection:"start",
    maxWidth:"80%",
    marginLeft:"10%",
    marginRight:"10%"
    
    
  },
  paper: {
    height: 200,
    width: 200,
    margin: "50px 25px 10px 25px"
  },
  
});


class SpacingGrid extends React.Component {
  state = {
    spacing: '32',
    subcategories:this.props.subcategories
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
  

    return (
      <Grid container className={classes.root} >
        <Grid item xs={12}>
          <Grid container className={classes.demo}  >
            {this.props.subcategories.map(subcategory => (
              <Grid key={subcategory} item>
                <Paper className={classes.paper} style={{backgroundImage:`${subcategory.imageUrl}`}}>    
            <img className="subcategory-image"  src={`${subcategory.imageUrl}`}   style={{objectFit: "cover", width:  "200px",    height: "200px", cursor: 'pointer'}}
             onClick={()=>this.props.history.push(`/songs/${this.props.categoryId}/${subcategory.subCategoryId}`)}  />
            </Paper>
            <div style={{textAlign: "center", fontSize: "20px", textTransform: "capitalize"}}>{subcategory.subCategoryId}</div>
              </Grid>
            ))}
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

SpacingGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default  withRouter(withStyles(styles)(SpacingGrid));
