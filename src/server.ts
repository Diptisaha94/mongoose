import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";


//const mongoose = require('mongoose');
const port = 5001
async function main() {
    try{
        await mongoose.connect(config.database_url as string);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    }catch(err){
        console.log(err);
    }
  }
  main();
