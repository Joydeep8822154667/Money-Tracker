const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose');
const Transaction=require('./models/Transaction')
app.use(cors());
app.use(express.json())


app.post('/api/transaction', (req, res) => {
    mongoose.connect("mongodb://127.0.0.1:27017/Money-Tracker").then(() => {
        console.log("Connected to MongoDb succesfully")
    }).catch((err) => {
        console.log(`Your error is ${err}`);
    })

    const {price,name,datetime,description}=req.body;
    console.log(name);
    const transaction= Transaction.create({name,price,datetime,description});
    res.json(req.body);

})
app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/Money-Tracker")
    const transactions=await Transaction.find();
    res.json(transactions);
})

app.listen(4040);