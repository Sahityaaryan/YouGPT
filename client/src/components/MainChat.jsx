
import { useEffect, useState, useRef} from 'react'
import Chats from '../components/Chats'
import ScrollDown from '../components/ScrollDown';
import { FiUpload } from "react-icons/fi";

export default function MainChat(){

     // * use states
  const [prompt, setPrompt] = useState('');
  // const [userMessage , setUserMessage] = useState('')
  const [AllChat, setAllChat] = useState([]);
  const [glow, setGlow] = useState(false);
  const [showScrollDown , setShowScrollDown] = useState(false);
   
  const [chat, setChat] = useState({
    'userMessage': '',
    'aiMessage': ''
  });

  const [loggedInUser, setLoggedInUser] = useState({
    'id': '1',
    'name': 'Sahitya',
  })

  const ChatSection = useRef(null);
  const ChatElement = useRef(null);



  // * scroll handlers
if(ChatElement.current)
{

  ChatElement.current.onscroll=function(e){
    let {scrollTop , scrollHeight , offsetHeight} = referencedElement.current;

     if(scrollHeight > offsetHeight){
      setShowScrollDown(true)
     }
  }

}



  // * fetching Ai message


  // * chat creation


  // * submit handlers

  function SubmitHandler(e) {

    e.preventDefault();  
  
    setChat({...chat,['userMessage']:prompt})

    setPrompt('');

  }

  // will update the chat column

  useEffect(() => {

    setAllChat([...AllChat, chat]);

  }, [chat])

  useEffect(()=>{
    if(prompt=='') setGlow(false);
    else setGlow(true);
  },[prompt])


  useEffect(()=>{
    ChatSection.current?.scroll({
      left:0, 
      top:ChatSection.current.scrollHeight,
      behavior:'smooth'
    });

    setShowScrollDown(false);
    
  },[AllChat])

    return (

        <div className=' w-[96%] relative h-[96%]'>
        
      <div className=' relative top-6 left-6'>
        {/* Model Name */}
        <span className='text-white p-3 font-sans text-2xl font-medium bg-[rgb(88,28,135)] border border-[rgb(88,28,135)] rounded-3xl'>
          YouGpt
        </span>

      </div>


      {/* chat and reply section */}
      <div className=' h-full w-[90%] mx-auto flex flex-col justify-center '>


        {/* user prompt */}

        {/* this is all going to be attached in a component */}

   
         <div ref={ChatSection} id='mainChat' className='transition-all max-h-[80%] overflow-y-auto mx-auto sm:w-[90%] w-[60%]'>
         <div ref={ChatElement}>
         {(AllChat.length !== 0) ?  (AllChat.map(function (chat) {
          return (
            <div>
              <Chats
                Messages={chat}
                User={loggedInUser}
              />
            </div>
          );
        })):''}
         </div>
         </div>

      


        {/* message Bar */}
        <div className='relative bottom-1 sm:w-[100%] w-[90%] mx-auto '>
          <form onSubmit={SubmitHandler} className='border first-line:border-stone-600 rounded-md bg-[#565869] text-stone-50 font-sans w-[60%] mx-auto h-[3.5rem] my-3 flex items-center'>
            <input className='bg-[#565869] w-full py-3 px-4 h-full focus:outline-none ' type="text" placeholder="Message YouGpt 🤖" value={prompt} onChange={(e) => {setPrompt(e.target.value); }} />

            <button 
            className={` transition-all w-[3.2rem] h-[2.8rem] flex items-center justify-center ${glow ? 'bg-[rgb(129,61,180)]':'bg-[rgba(193,170,211,0.3)] '} m-2 border border-[rgb(88,28,135)] rounded-[50%]`}          
          >
              <input type='submit' value={''} className='hidden'></input>
              
              <FiUpload 
               size={28}
               className={`${glow ? 'text-[rgba(225,225,225,1)]' :'text-[rgba(225,225,225,.3)]'}`}
               />
            </button>
          </form>

        </div>

        <ScrollDown
        referencedElement={ChatSection}
        /> 

        </div>
        </div>
    )
}