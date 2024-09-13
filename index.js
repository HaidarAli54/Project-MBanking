const express = require('express');
const app = express();
const userRouter = require('./src/routes/user.route');

const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

app.get('/ping',(req,res) =>{
    res.status(200).json({ massage:'PONG!!' });
})

app.use('/user',userRouter);

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server up and running in ${port}`)
})