
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indexschema = new Schema ({
    title : {
        type : String,
        required : true ,
    },
    author : String,
    description : String,
    image : {
        url: String,
        filename:String,
    },
    year : String,
  
})
const Index = mongoose.model("Index",indexschema );
module.exports=Index;
