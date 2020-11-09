import React, { Component } from "react";

class Genres extends Component {
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
        >
          Available Genres..
        </h1>
      </div>
    );
  }
}

export default Genres;
