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
app.use('/public', express.static('public')); 

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

  res.render('index', {  locationsData : result })
})

app.post('/addItem', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("whereAt").collection("locations");
    await collection.insertOne(req.body);
      
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})

app.post('/deleteItem/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("whereAt").collection("locations");
    let result = await collection.findOneAndDelete( { _id: new ObjectId( req.params.id) })
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})

app.post('/updateItem/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("whereAt").collection("locations");
    let result = await collection.findOneAndUpdate( 
      {"_id": new ObjectId(req.params.id)}, 
      {$set: {"Location": "Living Room"}},
      {$set: {"Item": "Socks"}}
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})


console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})