
const sampleData = require("./data.js");
const mongoose = require('mongoose');
const Index = require("../module/index.js");

Mongo_URL='mongodb://127.0.0.1:27017/Library'

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(Mongo_URL);
}
 const initDB = async ()=>{
    await Index.deleteMany({});
    await Index.insertMany(sampleData.data);
    console.log("data initalized");
 }
 initDB();
