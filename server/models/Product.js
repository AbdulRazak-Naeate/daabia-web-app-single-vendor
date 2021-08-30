const mongoose = require('mongoose');


 const ProductSchema = new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     description:{
        type:String,
        required:true
    },
    specification:{
        type:String,
        required:'none'
    },
    price:{
        type:String,
        required:true
    },
    storeId:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    color:{
        type:Array
    },
    size:{
        type:Array
    },
    digital_product_url:{
        type:String,
        default:''
    },
    likes:{
        type:String,
        default:'0'
    },
    comments:{
        type:String,
        default:'0'
    },
    date:{
        type:String,
        default:Date.now
    },
    


 });

 module.exports =mongoose.model('Product',ProductSchema);
 