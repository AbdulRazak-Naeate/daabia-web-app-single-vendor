import React,{useState} from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia,MenuItem,TextField} from '@material-ui/core';
import useStyles from './styles';
import FormInput from '../../checkoutform/CustomTextField';
import Select from '../../checkoutform/CustomSelectField';
import {useForm , Controller} from 'react-hook-form';
import { Grid } from '@material-ui/core';
const CartItem = ({cartitem,onUpdateCartQty,onUpdateSpecs,onRemoveFromCart}) => {
    const classes = useStyles();
    const[color,setColor]=useState('');
    const[size,setSize]=useState('');
    const [sleeve,setSleeve]=useState('none');
    const sleeves = [
      {
        value: 'short',
        label: 'Short',
      },
      {
        value: 'long',
        label: 'Long',
      },
    ];
    
const methods=useForm();
    const {register,
      handleSubmit,getValues,control,
      formState: { errors },
    } = useForm();

    const handleSleeveChange = (event) => {
        setSleeve(event.target.value);    
        console.log(event.target.value)
       console.log("form data "+JSON.stringify(getValues()))
    
    }
    
     const onGridColorItemClick=(item)=>{
         setColor(item)
         console.log(item)
     }
     const onGridSizeItemClick=(item)=>{
      setSize(item)
      console.log(item)
      
 }
    const ColorGridList= ({list,onUpdateSpecs}) =>(
          <>
          <Typography variant="body2">{`Select Color`}</Typography>
         <div class={classes.specsListWrapper} >
          <div className={classes.gridSpecsList} >                        
               <div className={classes.specsGrid} > 
                {list.map((item,index)=>(
                 item!=='' ? <div key={index} className={`${classes.gridSpecsItem} ${color===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateSpecs(cartitem.product._id,'color',item);onGridColorItemClick(item)}}>{item}</div>:''
               
                ))}
                </div>
               </div>
        </div>
  </>
    )

    const SizeGridList= ({list ,onUpdateSpecs}) =>(
      <>
      <Typography variant="body2">{`Select Size`}</Typography>
     <div class={classes.specsListWrapper} >
      <div className={classes.gridSpecsList} >                        
           <div className={classes.specsGrid} > 
            {list.map((item,index)=>(
             item!==''? <div key={index} className={`${classes.gridSpecsItem} ${size===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateSpecs(cartitem.product._id,'size',item);onGridSizeItemClick(item)}}>{item}</div>:''
           
            ))}
            </div>
           </div>
      </div>
    </>)

    const Measurement =({productid})=>(
     <>
      {/* <Card className={classes.measurementCard} key={`card${productid}`}>  
        <CardContent style={{height:'auto',border:'0px solid'}}> */}
       
        <form >
        <div className={classes.measuregridContainer}>
        <Grid container direction='row' justifyContent='space-between' spacing={1}>
         <Grid xs={2} sm={2} md={2} lg={2}>
         <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput} key={`input1${productid}`}  label="Back"
             inputProps={register('back', {
               required: 'Please enter back',
             })}  />

           </div>
         </Grid>

          <Grid xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput}key={`input2${productid}`} 
              label="Chest"
              inputProps={register('chest', {
                required: 'Please enter chest',
              })}
             />

           </div>
          </Grid>
           <Grid xs={2} sm={2} md={2} lg={2}>
           <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput} key={`input3${productid}`} id={`input3${productid}`}
             label="Length"
             inputProps={register('shirtLength', {
               required: 'Please enter sleeve',
             })}
             />

           </div>
           </Grid>
          <Grid xs={4} sm={4} md={4} lg={4}>
          <div className={classes.measurementInputWrapper} >
             <TextField
          select
          fullWidth={false}
          defaultValue="none"
          label="Sleeve"
          inputProps={register('sleeve', {
            required: 'Please enter sleeve',
          })}
          onChange={handleSleeveChange}
        >
          {sleeves.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

           </div>
           
          </Grid>

          
          </Grid>
        </div>

        <div className={classes.measuregridContainer}>
        <Grid container direction='row' justifyContent='space-between' spacing={1}>
         <Grid xs={2} sm={2} md={2} lg={2}>
         <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput} key={`input1${productid}`}  label="Length"
             inputProps={register('tlength', {
               required: 'Please enter back',
             })}  />

           </div>
         </Grid>
         <Grid xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput}key={`input2${productid}`} 
              label="Waist"
              inputProps={register('waist', {
                required: 'Please enter waist',
              })}
             />

           </div>
          </Grid>
          <Grid xs={2} sm={2} md={2} lg={2}>
          <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput}key={`input2${productid}`} 
              label="Thigh"
              inputProps={register('thigh', {
                required: 'Please enter thigh',
              })}
             />

           </div>
          </Grid>
           <Grid xs={2} sm={2} md={2} lg={2}>
           <div className={classes.measurementInputWrapper} >
             <TextField className={classes.measurementInput} key={`input3${productid}`} id={`input3${productid}`}
             label="bust"
             inputProps={register('bust', {
               required: 'Please enter bust',
             })}
             />

           </div>
           </Grid> 
          </Grid>
        </div>
      </form>
        </>
       /*  </CardContent>
      </Card> */
    )
  return (
    <div>
        <Card>
            <CardMedia image={`http://localhost:3001/server/uploads/products/${cartitem.product.image[0].filename}`} alt={cartitem.product.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
             <Typography variant="h6">{cartitem.product.name}</Typography>
             <Typography variant="h6">{`$${cartitem.line_item_sub_price}`}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
             <div className={classes.specifications}>
               <Measurement productid={cartitem.product._id}/>
              {cartitem.product.color.length>0 ?  <ColorGridList type={"color"} onUpdateSpecs={onUpdateSpecs} list={cartitem.product.color}/>:''}
              {
                cartitem.product.size.length>0 ?  <SizeGridList type={"size"} onUpdateSpecs={onUpdateSpecs} list={cartitem.product.size}/>:''
              }
             </div>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity-1,cartitem.product.price)}}>-</Button>
                <Typography>{cartitem.quantity}</Typography>
                <Button type="button" size="small"  color="secondary" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity+1,cartitem.product.price)}}>+</Button>
                   <Button type="button"   variant="contained" color="secondary" onClick={()=>{onRemoveFromCart(cartitem.product._id)}}>Remove</Button>
              </div>
           
            </CardActions>
        </Card>
      
    </div>
  )
}

export default CartItem
