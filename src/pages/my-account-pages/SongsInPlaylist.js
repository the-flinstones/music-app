import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ClippedDrawer from './ClippedDrawer'
import MyAccountSerivces from '../../service/MyAccountSerivces'

const useStyles = (theme) => ({
    root: {
      margin: "7% 5% 5% 26%",
    },
    row: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      float: "left",
    },
    card: {
      cursor: 'pointer',
      border: "2px solid #282828",
      borderRadius: "5px",
      padding: "20px",
      background:
        "linear-gradient(-180deg, rgba(254, 107, 139, 0.7) 0%, rgba(255, 142, 83, 0.7) 100%)",
      color: "white",
      margin: "8px 5px 8px",
      height: "100px",
      width: "100px",
      textAlign: "center",
      "&:hover": {
        background:
          "linear-gradient(-180deg, rgb(254, 107, 139) 0%, rgb(255, 142, 83) 100%)",
        fontSize: "20px",
        height: "112px",
        width: "112px",
      },
    },
  });
  
  class SongsInPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userId: "d677b5a9-4f73-4ed5-b6a4-de2400303985",
        playlistId: "e605a820-f6aa-4990-ab95-fdac688c1a3b",
        user: [{}],
        };
      }
      componentDidMount() {
        MyAccountSerivces.getAllSongsByPlaylistIdUserId(this.state.userId, this.state.playlistId).then(
            (response) => {
          this.setState({
            user: response.data,
          });
          console.log(response.data);
        });
      }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <h1
            style={{
              fontSize: "45px",
              fontWeight: 700,
              background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
              webkitBackgroundClip: "text",
              webkitTextFillColor: "transparent",
            }}
          >
            Library
          </h1>
          <ClippedDrawer />
          </div>
          )
        }
}

export default withStyles(useStyles)(SongsInPlaylist);