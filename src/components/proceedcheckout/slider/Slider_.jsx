import React from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import './styles.css';
import Slider from "react-slick";

import useStyles from './styles'
const Slider_ = ({images}) => {
   const classes= useStyles(); 
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };
  


const Dslider = ({images})=>{
    return(
     <Slider {...settings}>
        {
          images.map((image,index)=>{
            return(
              <div>
              <img className={classes.sliderItem} key={index} style={{objectFit:'cover'}} src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/server/uploads/products/${image.filename}`} alt={image.filename}  />
               </div>
             
            )
          })
        }
  </Slider>
)}
    return (
    <div className={classes.slider}>
      {images.length>0 ?<Dslider  style={{width:'100%',border:'1px solid red'}} images={images}/>:''}
    </div>
  )
}

export default Slider_
