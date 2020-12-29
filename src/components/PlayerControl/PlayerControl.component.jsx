import React, { Component } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './player.styles.css'

class PlayerControl extends Component {
    constructor(props){
        super(props);
        this.state={
            song:''      
        }
    
      }
      componentDidMount(){
          this.setState({
              song:this.props.song
          })
      }

  render() {
    return (
  //     <div>
  //          <AudioPlayer style={{backgroundColor:"black",
  //          }}
  //   autoPlay
  //    src="http://docs.google.com/uc?export=open&id=11BxpikUKuyFw1tKzBICZ7ejAtjggJV3Q" type="audio/mp3"
  //   onPlay={e => console.log("onPlay")}
  //   // other props here
  // />  
  //   </div>
 
      <div>
           <AudioPlayer style={{backgroundColor:"black",
           }}
    autoPlay
     src={this.props.songUrl} type="audio/mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />  
    </div>
    );
  }
}

export default PlayerControl;
