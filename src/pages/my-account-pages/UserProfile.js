import React, { Component } from "react";
import Cookies from "js-cookie";
import ClippedDrawer from "./ClippedDrawer";
import "./UserProfile.css";
import Sidebar from "./Sidebar";

const user_name = Cookies.get("name");
class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <h1
          className="title"
          style={{
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
            textAlign: "center",
            fontWeight: 550,
            fontSize: 50,
          }}
        >
          Welcome {user_name}!
        </h1>
<ClippedDrawer />
        
      </div>
    );
  }
}

export default UserProfile;
