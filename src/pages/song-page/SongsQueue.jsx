import React, { Component } from "react";
import SongService from '../../service/song-service'
import './song-page.styles.css'
class SongsQueue extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: this.props.match.params.category,
      subcategory: this.props.match.params.subcategory,
     songs:[]
    };
  }
  componentDidMount() {
  if(this.state.category=="artist")
  SongService.getSongsByArtist(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;

  if(this.state.category=="mood")
  SongService.getSongsByMood(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
  if(this.state.category=="language")
  SongService.getSongsByLanguage(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
  if(this.state.category=="albums")
  SongService.getSongsByLanguage(this.state.subcategory)
  .then((response)=>{
    this.setState({
      songs:response.data
    },()=>{console.log(this.state.songs)})
  })  ;
    
  if(this.state.category=="top-actors")
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
{/*         
      <p>
          Song queue<br/>{category}<br/>{subcategory}
        </p>
        <hr/> */}
       <div className="song-container">
         <div className="queue">
         queue
         </div>
         <div className="player"></div>
         <div className="song-info"></div>
         <div className="lyrics-scroll"></div>
         <div className="other-artists"></div>
         <div className="other-moods"></div>
       </div>
      </div>
    );
  }
}

export default SongsQueue;
