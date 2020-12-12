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
     songs:[]
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
  if(this.state.category==="albums")
  SongService.getSongsByLanguage(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
    
  if(this.state.category==="top-actors")
  SongService.getSongsByActor(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
    
  }
  render() {
    const {category,subcategory} =this.state
    return (
      <div>

       <div className="song-container">
         <div className="queue">
         <SongsInQueue category={this.state.category} subcategory={this.state.subcategory}/>
         </div>
         <div className="player">
           <PlayerControl song="https://drive.google.com/file/d/1-YCZbhwvmdjPMtPK_J-7vGD9wm9FdGCg/view?usp=sharing"/>
         </div>
         <div className="song-info" >
           <img className="banner"  src={localStorage.getItem('current-song-banner')} />
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
