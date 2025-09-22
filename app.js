if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}
console.log(process.env.SECRET)

const  express = require("express");
const app = express();
const mongoose = require('mongoose');
const Index = require("./module/index.js");
const path = require("path");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const multer  = require('multer')
const {storage} =require("./cloudconfig.js")
const upload = multer({ storage});

// Mongo_URL='mongodb://127.0.0.1:27017/Library'
const dburl = process.env.ATLASDB_URL ;

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dburl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/" ,(req,res)=>{
    res.send("hi i am route");
})
// Index route
 app.get("/library",async(req,res)=>{
    const list = await Index.find({});
    res.render("index.ejs",{list});

 })
 app.get("/manage",async(req,res)=>{
    
    res.render("manage.ejs");

 })
 //new route 
 app.get("/library/new",async(req,res)=>{
    res.render("new.ejs");
 })
 app.post("/library/new",upload.single('list[image]'), async (req, res) => {
    upload.single('list[image]');
    let url = req.file.path;
    let filename = req.file.filename;
    const newIndex = new Index(req.body.list);
    newIndex.image={url,filename}
    await newIndex.save();
    res.redirect("/library");
    
 })
 
 
 // show route
app.get("/library/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Index.findById(id);
    res.render("show.ejs",{listing});
})
 //Edit route
app.get("/library/:id/edit",async(req,res)=>{
    let { id} = req.params;
    let listings = await Index.findById(id);
    res.render("edit.ejs",{listings});
})
app.put("/library/:id",upload.single('list[image]'),async(req,res)=>{
    upload.single('list[image]');
    let {id} = req.params;
    let index =await Index.findByIdAndUpdate(id,{...req.body.list});
    if (req.file) {
  const url = req.file.path;
  const filename = req.file.filename;
  index.image = { url, filename };
  await index.save();
}
res.redirect("/library");

});
app.delete("/library/:id",async(req,res)=>{
    let {id} = req.params;
     let deleted =await Index.findByIdAndDelete(id)
     console.log(deleted);
    res.redirect("/library");
})
app.listen(8080 ,()=>{
    console.log(`app is listening to port 8080`);
})