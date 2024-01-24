import * as dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const {Pool} = pkg;

export const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database:  process.env.DB_NAME,
    password:  process.env.DB_PASSWORD,
})


// event listeners 

pool.on('connect',function(){
    console.log("connected to the database 😁");                                                                                        
})

pool.on('error',function(err,client){
    console.log(`something went wrong while connecting to the db: ${err}`);
})

pool.on('end',function(){
    console.log('Db is disconnected')
})
