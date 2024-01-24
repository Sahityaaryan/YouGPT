


import express from 'express';
const app = express();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import register from './routes/register.route.js';
import signIn from './routes/signin.route.js';
import generate from './routes/generate.route.js';
const PORT = process.env.PORT;






// ! implement a  middleware kind of thing so that the server can check whether the user is authtencticated or not


// middlewares
// parse the cookies sent by the client in request headers

// Parse application/json request bodies
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));


// middlewares

app.use((req,res,next)=>{
if(req.url === '/api/generate'){
    
    if(req.cookies['Auth']){    
        next();
    } else {
        res.status(500).json({
            success:false,
            message:'Unauthorized Access'
        })
    }
} else {
    next();
}

    
}   );

// Routes
app.use('/api/register',register);
app.use('/api/signin',signIn);
app.use('/api/generate',generate)



app.listen(PORT, function(){
    console.log('listening on port '+ PORT);
})