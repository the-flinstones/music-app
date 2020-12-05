import React, { Component } from "react";

class Actors extends Component {
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
          Actors Page{this.props.match.params}
        </h1>
        <br /> <br />
      </div>
    );
  }
}

export default Actors;
