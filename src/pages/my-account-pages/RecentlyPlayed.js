import React, { Component } from 'react'
import ClippedDrawer from './ClippedDrawer';

class RecentlyPlayed extends Component {
    render() {
        return (
            <div>
        <h1
          style={{
            marginLeft: '26%',
            marginTop: "7%",
            fontSize: "45px",
            fontWeight: 700,
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >
          Recently Played
        </h1>
        <ClippedDrawer />
      </div>

        )
    }
    
}
export default RecentlyPlayed;