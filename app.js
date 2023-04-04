require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("whereAt").collection("locations");
    const result = await collection.find().toArray();
    console.log("cxnDB result: ", result);
    return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}

app.get('/', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  res.render('index', {  locations : result })
})

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})