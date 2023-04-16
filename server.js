const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/DB')
const userRouter = require('./routes/userRoute')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    ()=>{console.log('Database is connected')},
    err=>{ console.log('Can not connect to the databse' +err)}
);


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  }); 


app.use('/users', userRouter)

const PORT = process.env.PORT || 7000;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

