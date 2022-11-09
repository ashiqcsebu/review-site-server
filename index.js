const express = require('express');
const cors = require('cors');
const app = express() ;
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId, Timestamp } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.plfe0ce.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




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