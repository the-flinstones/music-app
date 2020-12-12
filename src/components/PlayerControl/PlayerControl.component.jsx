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
      <div>
           <AudioPlayer style={{backgroundColor:"black",
           }}
    autoPlay
     src="http://docs.google.com/uc?export=open&id=1yyRuQEHp-GmOXF4RW6I9UMSnC3JXvEXS" type="audio/mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />  
    </div>
    );
  }
}

export default PlayerControl;
