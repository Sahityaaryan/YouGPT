import { pool } from "../config/database/db.js";
import { encrypt } from "../utils/encrypt.js";
import id from '../utils/userIdGenerator.js';


export default async function register(req,res){
    try {

      await pool.connect();

      const data = req.body;

      // collect the data
        let {username , password , email} = data;

    //   hash the given password
    
    password = await encrypt(password);

    // store the user in the database


    const queryRes = await pool.query(`INSERT INTO users (username, password, email, uid) VALUES($1 ,$2, $3, $4)`,[username, password, email, id]);

    if(queryRes.rowCount === 1)
    {
      res.status(200).json({
        success: true,
        user:queryRes,
      });
    } else {
      res.status(502).json({
        success: false,
        user:`User can't be registered successfully`,
      });
    }
        
    } catch (e) {

      console.log("error(backend register): ",e);
      res.status(502).json({
        success: false,
        user:`User can't be registered successfully`,
      });
        
    }
}