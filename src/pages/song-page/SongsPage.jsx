import React, { Component } from "react";
import SongService from '../../service/song-service'
import PlayerControl from '../../components/PlayerControl/PlayerControl.component'
import SongsInQueue from '../../components/songs-in-queue/SongsInQueue'
import SwiperNav   from "../../components/swiper/Swiper";
import SpacingGrid from '../../components/SpacingGrid'
import './song-page.styles.css'
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavouriteIcon from '@material-ui/icons/Favorite'
import Cookies from "js-cookie";
class SongsPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: this.props.match.params.category,
      subcategory: this.props.match.params.subcategory,
     songs:[],
     currentSong:'',
     lyrics:[],
     recentlyPlayed:[],
     liked:false,
      likedSongsList:[]

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
  handleSongLiked = (song) => {
    
    SongService.addLikedByUserId(  Cookies.get("userId"),song)
   .then(
    this.setState({liked:true})
   )     
  }

  handleSongPlay=(song)=>{  
    this.state.recentlyPlayed.push(song)  
    localStorage.setItem("recents", JSON.stringify(this.state.recentlyPlayed));  
  
    this.setState({
      currentSong:song,
      lyrics:song.songLyrics
    },)

      //check if songInLikedLIstByUser
  SongService.ifSongExistsInLikedSongsList(  Cookies.get("userId"),song.id)
  .then((res)=>
  this.setState({liked:res.data})
  )
    // console.log(localStorage.getItem("recents")+"***********")
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
         <div className="action">           
                    {this.state.liked?<FavouriteIcon style={{ fontSize: 40 }} />:<FavouriteBorderIcon style={{ fontSize: 40 }}  onClick={(e)=> this.handleSongLiked(this.state.currentSong)}/>}
                    
                    </div>
           
           
           <div className="lyrics-scroll">  {this.state.currentSong.title ?
            <div style={{paddingLeft:"2%",color: "rgba(142, 232, 255, 0.452)",fontFamily:" Rock Salt, cursive"}}><h2>{this.state.currentSong.title.toUpperCase()}</h2></div>:""}
             <div className="lyrics">{this.state.lyrics}</div>
            </div>
         </div>
       
         {/* <div className="lyrics-scroll">  {this.state.currentSong.title ?<div><h2>{this.state.currentSong.title.toUpperCase()}</h2></div>:""}<span className="lyrics">{this.state.lyrics}</span></div> */}
         <div className="other-subcategories"> </div>
           
           
          
         
         
       </div>
      </div>
    );
  }
}

export default SongsPage;
