import React, { Component } from "react";
import ClippedDrawer from "./ClippedDrawer";
import NestedGridLiked from "../../components/nestedgrid/NestedGridLiked";
import SongService from "../../service/song-service";
import MyAccountSerivces from "../../service/MyAccountSerivces";
import Cookies from "js-cookie";

class SongsInPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      playlistId: this.props.match.params.playlistId,
      userId: Cookies.get("userId"),
      userPlaylist: [],
      userPlaylistSongId: [],
      userPlaylistSongs: [],
    };
  }
  componentDidMount() {
    SongService.getLikedByUserId(this.state.userId).then((response) => {
      console.log(response.data.likedSongs);
      this.setState({
        songs: response.data.likedSongs,
      });
    });

    MyAccountSerivces.getAllSongsByPlaylistIdUserId(
      this.state.userId,
      this.state.playlistId
    ).then((response) => {
      this.setState({
        userPlaylist: response.data,
      });
      console.log("Playlists", response.data);
      this.state.userPlaylist.map(
        (item) => (
          this.setState({
            userPlaylistSongId: item.songId,
          }),
          console.log("Song ID", item.songId)
        )
      );
      var newSong;
      // for(var i = 0; i < this.state.userPlaylistSongId.length; i++)
      this.state.userPlaylistSongId.map((item) =>
        SongService.getSongById(item).then((response) => {
          newSong = response.data;
          this.setState({
            userPlaylistSongs: [...this.state.userPlaylistSongs, newSong],
          });
          console.log("UserPlaylistSOngs", this.state.userPlaylistSongs);
        })
      );
    });
  }
  render() {
    return (
      <div className="listing-space">
        <h1
          style={{
            marginLeft: "25%",
            marginTop: "7%",
            fontSize: "45px",
            fontWeight: 700,
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >
          My Playlists
        </h1>
        <ClippedDrawer />
        <div style={{ marginLeft: "25%" }}>
          <NestedGridLiked liked={this.state.userPlaylistSongs} />
        </div>
      </div>
    );
  }
}
export default SongsInPlaylist;
