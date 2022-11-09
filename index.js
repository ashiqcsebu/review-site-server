const express = require('express');
const cors = require('cors');
const app = express() ;
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId, Timestamp } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())





app.get('/' , (req , res)=>{
    res.send("service review server is running")
})

app.listen(port , ()=>{
    console.log(`server running on port ${port}`)

})