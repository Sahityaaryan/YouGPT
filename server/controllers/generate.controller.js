
import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
export default async function generate(req,res){

    
   try {    


// Access your API key as an environment variable (see "Set up your API key" above)


const usrReq = req.body;

const prompt =  usrReq.prompt;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});


      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();


    res.status(200).json({
        success: true,
        message:text,
    })


   } catch (e) {

    console.log("error(generate): ",e.message)
    res.status(502).json({
        success: false,
        message: e.message,
    })

   }

}