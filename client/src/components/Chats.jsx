'use client'
import { RiseLoader } from 'react-spinners';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
// import ScrollDown from '../components/ScrollDown';
import axios from 'axios';
export default function Chats(props) {

  // const [dummy , setdum] = useState('how are you? ')

  // const [dummy , setDummy] = useState(`JavaScript (JS) is a high-level, interpreted programming language primarily used for building dynamic and interactive web pages. It is one of the core technologies of the World Wide Web alongside HTML and CSS. Here are some key aspects of JavaScript:

  // 1. **Client-Side Scripting:** JavaScript is mainly used as a client-side scripting language, meaning it runs in the user's web browser. This allows developers to create dynamic and interactive web pages by manipulating the Document Object Model (DOM) and responding to user events.
  
  // 2. **ECMAScript:** The language specification for JavaScript is standardized by the European Computer Manufacturers Association (ECMA) in the ECMAScript specification. Different browsers implement this standard with their JavaScript engines. Commonly, when people refer to JavaScript, they are referring to ECMAScript.
  
  // 3. **Syntax:** JavaScript syntax is similar to that of other C-based programming languages, making it relatively easy for developers to learn if they are familiar with languages like Java or C++. It supports both procedural and object-oriented programming paradigms.
  
  // 4. **Variables and Data Types:** JavaScript uses dynamic typing, which means you don't need to declare the data type of a variable explicitly. Common data types include numbers, strings, booleans, objects, and arrays.
  
  // 5. **Functions:** Functions in JavaScript are first-class objects, meaning they can be assigned to variables, passed as arguments to other functions, and returned from other functions. This allows for the creation of reusable and modular code.
  
  // 6. **DOM Manipulation:** JavaScript is often used to manipulate the DOM, which represents the structure of an HTML document. Through the DOM, developers can dynamically update the content, structure, and style of a web page in response to user interactions.
  
  // 7. **Event Handling:** JavaScript enables developers to respond to user actions, such as clicks, keypresses, and mouse movements. Event handlers can be attached to HTML elements, triggering functions when specific events occur.
  
  // 8. **Asynchronous Programming:** JavaScript supports asynchronous programming through mechanisms like callbacks, promises, and async/await. This is crucial for handling tasks such as fetching data from servers without blocking the user interface.
  
  // 9. **Libraries and Frameworks:** There are numerous libraries and frameworks built on top of JavaScript, such as jQuery, React, Angular, and Vue.js. These tools simplify and enhance the development of complex web applications.
  
  // 10. **Server-Side Development:** While traditionally known for client-side scripting, JavaScript is also used on the server side. Node.js, a server-side runtime for JavaScript, allows developers to use JavaScript for building scalable and high-performance server applications.
  
  // JavaScript is an integral part of modern web development and continues to evolve with new features and specifications, enabling developers to create increasingly sophisticated and interactive web applications.`)

  const [chat, setChat] = useState(props.Messages);
  const [user, setUser] = useState(props.User);
  // const [showScroll, setShowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const ChatSection = useRef(null);

  async function getAiReply() {

    try {

      // const authVerify = await axios.get()

      const prompt = props.Messages.userMessage;

      setLoading(true);

      console.log("prompt: ",prompt)

      if (prompt) {

        // I am sending a post request by this method but it is not working it is giving me an error from the server "unexpected end of json" what that it means but the server and api are working fine they don't have any issues , and the suppuse the value of "prompt" is "how are you?"
      
        const res = await axios.post('/api/generate', { "prompt": prompt }, {
          headers: {
            'Content-Type': 'application/json'
          } 
        })

        const response = res?.data;

        if (res?.data?.success) {

          setChat({ 'userMessage': prompt, 'aiMessage': res.data.message });

        } else if (res.data?.message === '[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent: fetch failed') {

          setChat({ 'userMessage': prompt, 'aiMessage': 'Something went wrong while fetching the response' });
        }else {
          setChat({ 'userMessage': prompt, 'aiMessage': 'Something went wrong' });
        }
        setLoading(false);
        return;
        
      } else {
        setChat({ ...chat,['aiMessage']: 'Please include some prompt' });
        setLoading(false);  
        return;
      }

    } catch (e) {
      console.log("error: ", e);
       if(e.response.data.message=='Unauthorized Access'){
        setLoading(false);
        window.location.replace('/user/api/signin')
        return;
    } 
      setChat({ ...chat,['aiMessage']: 'Something went wrong' });
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    getAiReply();
  }, [])


  return (
    <div ref={ChatSection} className='transition-all '>
      {
        chat.userMessage ? (

          <div className='bg-green-600'>
            <div className='border border-[#2c2d33]  rounded-sm  w-full mx-auto min-h-[4rem] font-sans px-3 py-auto flex text-[#eaebee] ' >
       
              
                <span className=' prose p-2 w-[5rem] h-[3rem] text-center text-white mx-6 text-md  font-neutral bg-[#0f9b0f] border border-[rgb(88,28,135)] rounded-3xl' >
                  {user.name}
                </span>
                {/* actuall prompt */}
                <span className='font-sans text-lg p-2 '>{chat.userMessage}</span>
        
            </div>

            <br/>
            {/* */}


            {/* chat bot */}
            <div className='border border-[#2c2d33]  rounded-sm  w-full mx-auto min-h-[4rem] font-sans px-3 py-auto flex text-[#eaebee] ' >
               {/* <span className='text-white p-2 w-[6rem] h-[3rem] text-center mx-6 font-sans text-md font-neutral bg-[rgb(88,28,135)] border border-[rgb(88,28,135)] rounded-3xl'> */}
               <span className=' prose p-2 w-[5rem] h-[3rem] text-center text-white mx-6 text-md  font-neutral bg-[rgb(88,28,135)] border border-[rgb(88,28,135)] rounded-3xl'>
          YouGpt
        </span> 
                {/* actuall prompt */}
                {/* <p className=' prose text-white font-sans text-lg p-2 '> <ReactMarkdown>{dummy}</ReactMarkdown></p> */}
                {loading ? <RiseLoader color="#36d7b7" size={10} /> : (
                  <>
                    <p className=' prose text-white font-sans text-lg '>
                    <ReactMarkdown>{chat.aiMessage}</ReactMarkdown>
                    </p>
                  </>
                )}
            
            </div>
          </div>
        ) : ''
      }
      
    </div>
  )
}