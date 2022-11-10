const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express() ;
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId, Timestamp } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.plfe0ce.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// function verifyJWT(req, res, next){
//     const authHeader = req.headers.authorization;

//     if(!authHeader){
//         return res.status(401).send({message: 'unauthorized access'});
//     }
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
//         if(err){
//             return res.status(403).send({message: 'Forbidden access'});
//         }
//         req.decoded = decoded;
//         next();
//     })
// }





async function run (){

    try{
        const serviceCollection = client.db('serviceReview').collection('services');
        const reviewCollection = client.db('serviceReview').collection('reviews');
     

        /////////////////
        app.post('/addservices' , async (req, res)=>{
            const services = req.body ;
             const result = await serviceCollection.insertOne(services);
            res.send(result);
        })

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).sort({ts: -1});
            const services = await cursor.limit(3).toArray();
            res.send(services);
        });
        app.get('/allservices', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).sort({ts: -1});
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/services/:id' , async(req , res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

      

app.post('/addreview' , async (req, res)=>{
    const reviews = req.body ;
     const result = await reviewCollection.insertOne(reviews);
    res.send(result);
})



app.get('/userreview', async (req,res)=>{
    let query = {}
    if(req.query.serviceName){
       query = {
          servicename : req.query.serviceName
       }
    }
 
    const cursor = reviewCollection.find(query);
    const reviews = await cursor.sort({time:'-1'}).toArray()
    res.send(reviews)
  })


  app.delete('/myreviw/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await reviewCollection.deleteOne(query);
    res.send(result);
})




  app.get('/myreviw',   async (req,res)=>{
   

    let query = {}
    if(req.query.email){
       query = {
          email : req.query.email
       }
    }
    const cursor = reviewCollection.find(query);
    const myreview = await cursor.toArray()
    res.send(myreview)
  })



    }
    finally{


    }

}

run().catch(err => console.log(err));






app.get('/' , (req , res)=>{
    res.send("service review server is running")
})

app.listen(port , ()=>{
    console.log(`server running on port ${port}`)

})