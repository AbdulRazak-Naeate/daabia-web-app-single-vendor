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
        type:Number,
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
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    },
    product_type:{
        type:String,
        default:'normal'
    },
    stock:{
        type:Object,
        default:{currentstock:0,alltimestock:0}
    },
    active:{
        type:String,
        default:'yes',
    }
    


 }).index({name:"text",description:"text"});

 module.exports = mongoose.model('Product',ProductSchema);
 