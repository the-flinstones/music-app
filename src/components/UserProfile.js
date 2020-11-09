import React, { Component } from 'react'
import Cookies from 'js-cookie'

const user_name = Cookies.get("name")
class UserProfile extends Component {
    
    render() {
        return (
            <div>
                <h1
          style={{
              marginTop: "8%",
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >Welcome {user_name}!</h1>
            </div>
        )
    }
}

export default UserProfile;