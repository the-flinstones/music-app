import React, { Component } from "react";
import SongService from '../../service/song-service'
import PlayerControl from '../../components/PlayerControl/PlayerControl.component'
import SongsInQueue from '../../components/songs-in-queue/SongsInQueue'
import './song-page.styles.css'
class SongsPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: this.props.match.params.category,
      subcategory: this.props.match.params.subcategory,
     songs:[],
     currentSong:''
    };
  }
  componentDidMount() {
  if(this.state.category==="artist")
  SongService.getSongsByArtist(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;

  if(this.state.category==="mood")
  SongService.getSongsByMood(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
  if(this.state.category==="language")
  SongService.getSongsByLanguage(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
  if(this.state.category==="album")
  SongService.getSongsByLanguage(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
    
  if(this.state.category==="actor")
  SongService.getSongsByActor(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
    
  }

  handleSongPlay=(song)=>{
    console.log(song)
    this.setState({
      currentSong:song
    })
  }
  render() {
    const {category,subcategory} =this.state
    return (
      <div>

       <div className="song-container">
         <div className="queue">
         <SongsInQueue category={this.state.category} subcategory={this.state.subcategory} handleSongPlay={this.handleSongPlay} currentSong={this.state.currentSong}/>
         </div>
         <div className="player">
           <PlayerControl songUrl={this.state.currentSong.songUrl}/>
         </div>
         <div className="song-info" >
           <img className="banner"  src={this.state.currentSong.bannerUrl} />
         </div>
         <div className="lyrics-scroll"></div>
         <div className="other-artists"></div>
         <div className="other-moods"></div>
       </div>
      </div>
    );
  }
}

export default SongsPage;
