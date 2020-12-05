import React, { Component } from "react";

class SongsQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
     subcategory:''
    };
  }
  componentDidMount() {
    console.log(this.props);

    this.setState(
      {
        subcategory: this.props.match.params.subcategory,
        
      }
    );
  }
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
          Song queue{this.props.match.params.subcategory}
        </h1>
        <br /> <br />
      </div>
    );
  }
}

export default SongsQueue;
