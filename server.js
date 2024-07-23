const app  = require('./app.js');
const mongoose = require('mongoose');
const port = 3000
require('dotenv').config()

//connect monog to backend Data


main().catch(err => console.log(err));

async function main() {
    //Database url
    const URL = process.env.DB_URL.replace('<password>',process.env.DB_PASSWORD)
    //Connect to Database 
    await mongoose.connect(URL);
    console.log('DB is working')

}


app.listen(port,()=>{
    console.log("runing...")
})


