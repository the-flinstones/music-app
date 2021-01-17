import React, { Component } from "react";
import "./songs-queue.styles.css";
import MusicNoteRoundedIcon from "@material-ui/icons/MusicNoteRounded";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavouriteIcon from "@material-ui/icons/Favorite";
import equalizer from "../../assets/equalizer_accent.gif";
import Cookies from "js-cookie";
import SongService from "../../service/song-service";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import { SpaOutlined } from "@material-ui/icons";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { withStyles } from "@material-ui/core/styles";
import MyAccountSerivces from "../../service/MyAccountSerivces";
import {
  Slide,
  Dialog,
  Button,
  Paper,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Card, CardBody, CardTitle, Col, Row, Container } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { blue, pink } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
          borderColor: "#a8b2d1",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#FE6B8B",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "rgba(0, 0, 0, 0.23)",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#FE6B8B",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#a8b2d1",
        "&:hover": {
          color: "#FE6B8B",
        },
        "&$focused": {
          color: "#FE6B8B",
        },
      },
    },
  },
});

const useStyles = (theme) => ({
  palette: {
    secondary: {
      main: pink[500],
    },
  },
  title: {
    fontSize: "30px",
    fontWeight: 600,
  },
  cancelBtn: {
    border: "none",
    color: "#FE6B8B",
    "&:hover": {
      color: "#FE3762",
    },
  },
  row: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    float: "left",
  },
  outlinedBtn: {
    textDecoration: "none",
    borderRadius: 3,
    color: "#FE6B8B",
    fontSize: "15px",
    padding: "8px 20px 8px 20px",
    letterSpacing: "0.15em",
    border: "2px solid #FE6B8B",
    textDecoration: "none",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      backgroundColor: "rgba(254, 107, 139, 0.7)",
      color: "white",
      border: "2px solid rgba(254, 107, 139, 0.7)",
    },
    margin: "3% 0% 3% 0%",
  },
  containedBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "none",
    borderRadius: 3,
    border: "none",
    color: "white",
    fontSize: "15px",
    padding: "10px 18px 10px 18px",
    letterSpacing: "0.15em",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
    },
    margin: "0.5% 0% 0% 5%",
  },
  textField: {
    width: "60%",
    color: "secondary",
    borderColor: "#fff",
  },
  // paper: {
  //   justifyContent: "center",
  //   padding: "5%",
  //   margin: "5%",
  //   backgroundColor: "#172a45",
  //   color: "#ffffff",
  // },
  input: {
    color: "white",
  },
  table: {
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  card: {
    cursor: "pointer",
    border: "2px solid #282828",
    borderRadius: "5px",
    padding: "5px",
    background:
      "linear-gradient(-180deg, rgba(254, 107, 139, 0.7) 0%, rgba(255, 142, 83, 0.7) 100%)",
    color: "white",
    margin: "10px 10px 10px",
    height: "40px",
    width: "450px",
    fontSize: "12px",
    textAlign: "center",
    justifyContent: "space-evenly",
    "&:hover": {
      background:
        "linear-gradient(-180deg, rgb(254, 107, 139) 0%, rgb(255, 142, 83) 100%)",
      fontSize: "16px",
      height: "45px",
      width: "500px",
      margin: "10px 10px 10px",
    },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SongsInQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      selectedSelected: "",
      category: this.props.category,
      subcategory: this.props.subcategory,
      currentSong: "",
      liked: false,
      likedSongsList: [],
      openAddToPlaylistForm: false,
      newPlaylistTitle: "",
      playlists: [],
      userId: Cookies.get("userId")
    };
  }

  componentDidMount() {
    console.log(this.state.subcategory);
    if (this.state.category === "artist")
      SongService.getSongsByArtist(this.state.subcategory).then((response) => {
        this.setState(
          {
            songs: response.data,
          },
          () => {
            console.log(this.state.songs);
          }
        );
      });

    if (this.state.category === "mood")
      SongService.getSongsByMood(this.state.subcategory).then((response) => {
        this.setState(
          {
            songs: response.data,
          },
          () => {
            console.log(this.state.songs);
          }
        );
      });

    if (this.state.category === "language")
      SongService.getSongsByLanguage(this.state.subcategory).then(
        (response) => {
          this.setState(
            {
              songs: response.data,
            },
            () => {
              console.log(this.state.songs);
            }
          );
        }
      );

    if (this.state.category === "album")
      SongService.getSongsByLanguage(this.state.subcategory).then(
        (response) => {
          this.setState(
            {
              songs: response.data,
            },
            () => {
              console.log(this.state.songs);
            }
          );
        }
      );

    if (this.state.category === "actor")
      SongService.getSongsByActor(this.state.subcategory).then((response) => {
        this.setState(
          {
            songs: response.data,
          },
          () => {
            console.log(this.state.songs);
          }
        );
      });
  }

  handleAddToPlaylist = () => {
    this.setState({
      openAddToPlaylistForm: true,
    })
    this.getData()
  };
  handleClose = () => {
    this.setState({
      openAddToPlaylistForm: false,
      newPlaylistTitle: "",
    });
  };
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleCreatePlaylist = () => {
    var newPlaylist = {
      userId: this.state.userId,
      title: this.state.newPlaylistTitle,
      songId: [this.props.currentSong.id],
    };
    SongService.postNewPlaylist(newPlaylist).then((response) => {
      console.log("Post", response.data);
      this.setState({
        openAddToPlaylistForm: false,
        newPlaylistTitle: "",
      });
    });
    console.log(newPlaylist);
  };
  getData = () => {
    MyAccountSerivces.getPlaylistsById(this.state.userId).then((response) => {
      this.setState({
        playlists: response.data,
      });
      console.log("playlists", this.state.playlists)
    });
  };
  handleExistingPlaylist = (playlistId, title, songId) => {
    var playlist = {
      userId: this.state.userId,
      playlistId: playlistId,
      title: title,
      songId: [...songId, this.props.currentSong.id],
    };
    this.setState({
      openAddToPlaylistForm: false
    })
    SongService.postNewPlaylist(playlist).then((response) => {
      console.log("Post", response.data);
      this.setState({
        openAddToPlaylistForm: false,
        newPlaylistTitle: "",
      });
    });
    console.log("Add to existing", playlist);
  }

  handleSongLiked = (song) => {
    this.state.likedSongsList.push(song);
    this.setState({ liked: !this.state.liked });
    console.log(this.state.likedSongsList);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div
        className="songs-list"
        style={{
          marginTop: "3%",
          height: "100%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <div className="queue-header">
          {" "}
          <span style={{ color: "aqua", height: "40px" }}>
            <QueueMusicRoundedIcon />
          </span>
          &nbsp;&nbsp;Playlist
        </div>
        {this.state.songs.map((song) => (
          // console.log(song.title,"*****")
          <div
            className="song-tile"
            onClick={(e) => this.props.handleSongPlay(song)}
          >
            {this.props.currentSong.id == song.id ? (
              <span>
                <img
                  className="icon"
                  src={equalizer}
                  style={{ height: "20px", width: "20px" }}
                />
                <IconButton onClick={() => this.handleAddToPlaylist()}>
                  <PlaylistAddIcon
                    className="icon"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </span>
            ) : (
              <span>
                <MusicNoteRoundedIcon className="icon" />
                <IconButton onClick={() => this.handleAddToPlaylist()}>
                  <PlaylistAddIcon
                    className="icon"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </span>
            )}
            <img className="thumbnail-pic" src={song.thumbnailUrl} />
            <div className="details">
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
            </div>
          </div>
        ))}
        <div>
          <Dialog
            open={this.state.openAddToPlaylistForm}
            TransitionComponent={Transition}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent
              style={{ backgroundColor: "#0a192f", color: "white" }}
            >
              <DialogActions
                style={{ backgroundColor: "#0a192f", color: "white" }}
              >
                <Button
                  onClick={() => {
                    this.setState({
                      openAddToPlaylistForm: false,
                      newPlaylistTitle: "",
                    });
                  }}
                  variant="outlined"
                  className={this.props.classes.cancelBtn}
                >
                  <CloseIcon style={{ size: "medium" }} />
                </Button>
              </DialogActions>
              <Paper
                className={classes.paper}
                style={{
                  width: "600px",
                  justifyContent: "center",
                  margin: "5% 10% 5% 5%",
                  backgroundColor: "#0a192f",
                  color: "#fff",
                }}
              >
                <div>
                  <h3
                    className={classes.title}
                    style={{
                      background:
                        "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    }}
                  >
                    Create New Playlist
                  </h3>
                  <MuiThemeProvider theme={theme}>
                    <span>
                      <TextField
                        id="outlined-basict"
                        className={(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Create new playlist"
                        onChange={this.handleChange("newPlaylistTitle")}
                        required
                        value={this.state.playlistName}
                        color="secondary"
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                      <Button
                        className={classes.containedBtn}
                        onClick={this.handleCreatePlaylist}
                      >
                        Create
                      </Button>
                    </span>
                  </MuiThemeProvider>
                  <br />
                  <br />
                </div>
                <div>
                {this.state.playlists.map((item) => (
                  <table className={classes.table}>
                    <tr >
                    <Card className={classes.card} onClick ={() => {this.handleExistingPlaylist(item.playlistId, item.title, item.songId)}}>
                    <CardBody>
                      <CardTitle>
                        <h2 style={{textAlign: "center"}}>{item.title}</h2>
                      </CardTitle>
                    </CardBody>
                  </Card>
                    </tr>
                  </table>
                    
                ))}
                </div>
              </Paper>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(SongsInQueue);
