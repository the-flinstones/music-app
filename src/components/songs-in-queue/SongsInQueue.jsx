import React, { Component } from "react";
import './songs-queue.styles.css'



import SongService from '../../service/song-service'
class SongsInQueue extends Component {
    constructor(props){
        super(props);
        this.state={
            songs:[] ,
            selectedSelected:'',
            category:this.props.category,
            subcategory:this.props.subcategory,
            

        }
    
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
       
    return (
      <div className="songs-list" style={{backgroundColor:"black",height:"100%",overflow:"hidden", overflowY:"scroll"}}>
             {
              this.state.songs.map(song=>(
                // console.log(song.title,"*****")
                <div className="song-tile" onClick={(e)=> localStorage.setItem('current-song-banner',song.bannerUrl)}>
                    <img className="thumbnail-pic" src={song.thumbnailUrl}/>
                    <div className="details">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
                </div>
                </div>
              )
            )
            }
          
    </div>
    );
  }
}

export default SongsInQueue;
