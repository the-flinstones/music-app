import React, { Component } from 'react'
import ClippedDrawer from './ClippedDrawer';
import NestedGrid from '../../components/nestedgrid/NestedGrid'

class RecentlyPlayed extends Component {
    render() {
        return (
            <div className="listing-space">
        <h1
          style={{
            marginLeft: '6%',
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
        <NestedGrid recentlyPlayed={localStorage.getItem("recent")} />
      </div>

        )
    }
    
}
export default RecentlyPlayed;