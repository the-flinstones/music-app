import React, { Component } from "react";

import SongService from '../../service/song-service'
class Category extends Component {
  constructor(props){
    super(props);
    this.state={
      subcategories:[],
      category:this.props.match.params.category,
      
      
    }

  }
  componentDidMount() {  
    SongService.getSubCategories(this.state.category)
    .then((response)=>{
      this.setState({
        subcategories:response.data
      },()=>{console.log(response.data)})
    }) 

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
          Category
          {console.log(this.props.match.params.category)}
          {this.props.match.params.category}
        </h1>
        <br /> <br />
      </div>
    );
  }
}

export default Category;
