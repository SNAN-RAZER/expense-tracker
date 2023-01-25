const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./controllers/userController');
const cors = require('cors');
 
const { transactionRouter } = require('./controllers/transactionController');
dotenv.config();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:3000"
}));
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/v1/users',userRouter);
app.use('/api/v1/users/transactions',transactionRouter);

if(process.env.NODE_ENV === "production")
{
    app.use('/',express.static('client/build'));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client/build/index.html'));
    })
}
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once("open",()=>{
    console.log("mongodb connected");
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
mongoose.connection.on("error",(err)=>{console.log("Error in connection");});


