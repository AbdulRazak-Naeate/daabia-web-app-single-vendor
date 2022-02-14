import React, { useState } from 'react'
import thumbnail from './thumbnail-wide.png';
import {Button} from '@mui/material'
import './index.css'
const SlidesImage = ({handleImages,slideImages,setSlidesImages,setPosition}) => {
    //console.log(slideImages[0].filename)
    const[imagediv,setImages]=useState(["0","1","2"]);
    const [imageTagIndex, setImageTagIndex] = useState(null);
    const [ImageToLoadId, setImageToLoadId] = useState(null);
    const [imgobj]=useState({
      "fieldname": "image",
      "originalname": "thumbnail-wide.png",
      "encoding":"7bit",
      "mimetype":"image/png",
      "destination":"./server/uploads/slides",
      "filename":"thumbnail-wide.png"
  })
    const onImageClicked = (e) => {
        const formfile = document.getElementById("product-file");
        formfile.click()
        setImageToLoadId(e.target.id) //sets id of the image
        setPosition(e.target.id)
        let character = (e.target.id).toString(); //convert number to string
        //get last character of product-image# which gets cliked
        setImageTagIndex(character.charAt(13));

    }
   
    const removeLastIndex = (values) => {
      let arr=[...values];
       arr.pop(values.length-1);
       console.log(values);
    return arr;
  }

  const addSlide =()=>{
    setSlidesImages([...slideImages,imgobj])
  }
  const removeSlide =()=>{
    setSlidesImages([...removeLastIndex(slideImages)])
  }

    function  onFileInputChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {

            let indextoRemove = parseInt(imageTagIndex);//gets Index of  clicked image 
           
                document.getElementById(ImageToLoadId).src = thumbnail;
          
              try{
            //push image item whiles Array length is 3 
            //else replace existing index with new image  
            slideImages.length <= 2 ? slideImages.push(file) : slideImages.splice(indextoRemove, 1, file);
            // console.log("replaced index "+typeof(indextoRemove));
              }catch(err){

                 console.log(err)
              }

            console.log(slideImages.length);

            document.getElementById(ImageToLoadId).src = e.target.result

            handleImages(slideImages)
        };
        try {
            reader.readAsDataURL(file)

        } catch (error) {
            console.log({ readAsDataURLError: error })
        }
    }

  return (
    <div className="imageGallery">
         {
            slideImages.length > 0  ?  slideImages.map((img,index)=>{
              return(<img className="productImg" alt={'slideimg'}key={index} id={index} src={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/server/uploads/slides/${img.filename}`}  onClick={ (e) => { onImageClicked(e) }}/>)
               
            }):''
           
         }

                <div className='actions'>
                          <Button variant="outlined" id='action-btn-size-remove' size='small' onClick={()=>{removeSlide()}}>-</Button> 
                           <Button variant="outlined" id="action-btn-size-add" size='small' onClick={()=>{addSlide()}}>+</Button>
                          </div>
                <input style={{display:"none"}} type="file" id="product-file" multiple onChange={onFileInputChange} />
                </div>
  )
}

export default SlidesImage
