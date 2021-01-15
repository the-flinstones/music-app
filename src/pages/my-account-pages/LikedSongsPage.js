import React, { Component } from "react";
import ClippedDrawer from "./ClippedDrawer";
import NestedGridLiked from "../../components/nestedgrid/NestedGridLiked";
import SongService from "../../service/song-service";
import Cookies from "js-cookie";

class LikedSongsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    };
  }
  componentDidMount() {
    SongService.getLikedByUserId(Cookies.get("userId")).then((response) => {
      this.setState({
        songs: response.data.likedSongs,
      });
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
          Liked
        </h1>
        <ClippedDrawer />
        <div style={{ marginLeft: "25%" }}>
          <NestedGridLiked liked={this.state.songs} />
        </div>
      </div>
    );
  }
}
export default LikedSongsPage;
