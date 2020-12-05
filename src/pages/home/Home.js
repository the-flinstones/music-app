import React, { Component } from "react";
import SongService from '../../service/song-service'
import SwiperNav   from "../../components/swiper/Swiper";
import Button from '@material-ui/core/Button';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});
class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      categories:[],
      subcategories:[]
      
    }

  }
  componentDidMount() {
    SongService.getCategories()
    .then((response)=>{
      this.setState({
        categories:response.data
      },()=>{console.log(this.state.categories)})
    })  ;
    SongService.getSubCategories()
    .then((response)=>{
      this.setState({
        subcategories:response.data
      },()=>{console.log(this.state.subcategories)})
    }) 

  }
  
 
  render() {

    
    return (
      <div >
        <div className="page-header">
        <h1
        className="page-header"
          style={{
            marginTop: "8%",
            background: "linear-gradient(45deg, #FE3762 30%, #FF742B 90%)",
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          }}
        >
          Home Page
        </h1>
        </div>
            <div className="directory" style={{margin:"2%",padding:"2%"}}> 
          <div>
            {
              this.state.categories.map(category=>
               <div className="category">
                 <div className="category-header"  style={{display:"flex",justifyContent:"space-between"}}>
              <span className="title"><h2>{category.categoryId.toUpperCase()}</h2> </span>
              <Button style={{color:"white"}} onClick={()=>this.props.history.push(`${category.categoryId}`)}> View all</Button>
      </div>
              <SwiperNav categoryId={category.categoryId}/>
            </div>)
            }
          </div>
          </div>
      

       
      </div>
    );
  }
}

export default Home;
