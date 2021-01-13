import React, { Component } from "react";
import './songs-queue.styles.css'
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded'; 
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavouriteIcon from '@material-ui/icons/Favorite'
import equalizer from  '../../assets/equalizer_accent.gif'



import SongService from '../../service/song-service'
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
import { SpaOutlined } from "@material-ui/icons";
class SongsInQueue extends Component {
    constructor(props){
        super(props);
        this.state={
            songs:[] ,
            selectedSelected:'',
            category:this.props.category,
            subcategory:this.props.subcategory,
            currentSong:'' ,
            liked:false,
            likedSongsList:[]
          
                     

        }
    
      }
      componentDidMount() {
        console.log(this.state.subcategory)
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
        handleSongLiked = (song) => {

        this.state.likedSongsList.push(song)
        this.setState({liked:!this.state.liked})
        console.log(this.state.likedSongsList)
          }

  render() {
       
    return (
      <div className="songs-list" style={{marginTop:"3%",height:"100%",overflow:"hidden", overflowY:"scroll"}}>
        <div  className="queue-header"> <span style={{color:"aqua",height:"40px"}}><QueueMusicRoundedIcon/></span>&nbsp;&nbsp;Playlist</div>
             {
              this.state.songs.map(song=>(
                // console.log(song.title,"*****")
                <div className="song-tile" onClick={(e)=> this.props.handleSongPlay(song)}>
       
    
                
                  {this.props.currentSong.id==song.id ? <img className="icon" src={equalizer} style={{height:"20px",width:"20px"}}/>:<MusicNoteRoundedIcon  className="icon" />}
                    <img className="thumbnail-pic" src={song.thumbnailUrl}/>
                    <div className="details">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                 
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
