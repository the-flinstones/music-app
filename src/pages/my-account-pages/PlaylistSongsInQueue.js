import React, { Component } from "react";
import '../song-page/SongsPage'
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded'; 
import equalizer from  '../../assets/equalizer_accent.gif'
import SongService from '../../service/song-service'
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
class PlaylistSongsInQueue extends Component {
    constructor(props){
        super(props);
        this.state={
            songs:[] ,
            selectedSelected:'',
            currentSong:''            

        }
    
      }
      componentDidMount() {
          this.setState({
              songs: this.props.songs
          })
          console.log(this.props.songs)
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

export default PlaylistSongsInQueue;
