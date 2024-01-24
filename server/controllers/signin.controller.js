
import { pool } from "../config/database/db.js";
import { compare, encrypt } from "../utils/encrypt.js";
import tokenCreator from "../utils/tokenCreation.js"


export default async function signin(req,res){

   try {

    await pool.connect();

    const {email, password} = req.body;


    const queryRes = await pool.query(`SELECT * FROM users WHERE email = $1`,[email]);

    const user = queryRes.rows[0];


    const matched = await compare(password,user.password)
    

    if(queryRes.rows.length && matched)
    {
        // creting the token

        let token = await tokenCreator(user);

        // hashing it

        token = await encrypt(token);
        
        // setting the cookiesin the client

        res.cookie('Auth',token,{
            httpOnly: true,
            maxAge:86400000,
        })


      res.status(200).json({
        success: true,
        user:user,
      });
    } else {
      res.status(502).json({
        success: false,
        user:`Authentication failed`,
      });
    }
    
   } catch (e) {

    console.log("error(backend sigin): ",e);
    res.status(502).json({
      success: false,
      user:e.message,
    });

   }

}