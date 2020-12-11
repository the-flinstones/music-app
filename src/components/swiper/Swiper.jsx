import React, { Component } from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import SongService from "../../service/song-service"
import './swiper.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import {withRouter} from 'react-router-dom'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Height } from '@material-ui/icons';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
class SwiperNav extends Component{
  constructor(props){
    super(props);
    this.state={
      subCategories:[]
      
    }

  }
  componentDidMount() {
    SongService.getSubCategories(this.props.categoryId)
    .then((response)=>{
      this.setState({
        subCategories:response.data
      },()=>{console.log(this.state.categories)})
    })  ;
  
  }
  
  render(){
    return (
      <div style={{maxWidth:"100%"}}>
                <Swiper
              spaceBetween={1}
              slidesPerView={8}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              navigation
            >{
              this.state.subCategories.map(subcategory=>
              <SwiperSlide >
                {/* <div style={{backgroundColor:"white"}}> */}
                <div className="container" onClick={()=>this.props.history.push(`/songs/${this.props.categoryId}/${subcategory.subCategoryId}`)}>
                <img className="label-image"  src={`${subcategory.imageUrl}`}     />
                <div class="overlay">
                  <div class="text">{subcategory.subCategoryId}</div>
                </div>             
                </div>    
              {/* </div> */}
              </SwiperSlide>
              )
            }
             
          
            
            </Swiper>
           
  
          </div>
    );

  }

  
}
export default withRouter(SwiperNav)
