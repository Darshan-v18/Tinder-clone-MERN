import express from 'express';
import mongoose from 'mongoose';

import Cards from './dbCards.js';
import Cors from 'cors';
//App Config
const app= express();
const port=process.env.PORT || 8001
const connection_url='mongodb+srv://darshan_v:darshanv2002@cluster0.ecbnyfn.mongodb.net/?retryWrites=true&w=majority'

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url)

//API Endpoints
app.get("/",(req,res)=>res.status(200).send('Hello World!!!'));
app.post("/tinder/cards", async (req, res) => { 
    const dbCard = req.body;
    try {
        const data = await Cards.create(dbCard);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get("/tinder/cards", async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Listener
app.listen(port, ()=>console.log(`Listening in localhost: ${port}`));