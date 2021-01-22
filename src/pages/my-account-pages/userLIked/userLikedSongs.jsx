import React, { Component } from 'react'
import ClippedDrawer from './ClippedDrawer';
import NestedGrid from '../../components/nestedgrid/NestedGrid'
import songService from '../../../service/song-service';

class UserLikedSongs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          songs:[]
    
        };
      }
    componentDidMount() {
     SongService.getLikedByUserId(Cookies.get("userId"))
       .then((response)=>{
          this.setState({
            songs:response.data
          })
        }) 
    } 
    render() {
        return (
            <div className="listing-space">
        <h1
          style={{
            marginLeft: '6%',
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
        <NestedGrid recentlyPlayed={this.state.songs} />
      </div>

        )
    }
    
}
export default UserLikedSongs;