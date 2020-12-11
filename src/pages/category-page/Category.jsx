import React, { Component } from "react";
import SpacingGrid from '../../components/SpacingGrid'

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
  this.getSubCategories();
  }

  getSubCategories =()=> {
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
          {console.log(this.state.subcategories,)}
          {this.props.match.params.category}****
        </h1>
        <br/> <br />
        <SpacingGrid subcategories={this.state.subcategories} categoryId={this.state.category}/>
        
      </div>
    );
  }
}

export default Category;
