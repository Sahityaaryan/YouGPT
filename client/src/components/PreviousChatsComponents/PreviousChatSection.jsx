


import { PreviousChatsDateSteps, ChatCount, allChats } from '../../../constants/constants';
import { IoCreateOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useRef, useState, } from 'react';



export default function PreviousChatSection() {


    const [showSection, setShowSection] = useState(true);
    
    function ChatProvider(dateData) {
        let count = 0;

        // % to be deleted
        const today = {
            date: 1,
            month: 1,
            year: (new Date()).getFullYear()
        };


        // * request to server for getting an array of chats whose day <= today + chatContainer.val

   
        let chats = allChats.filter(function (chat) {

            return (today.date == chat.date)

        })

        return (
            <>
                <li>
                    {/* By clicking this button the chat will be shown in the ChatSection */}
                    {chats.map(function (chat) {

                        return (
                            <>
                                <h4 className='p-1 font-normal font-sans '>{chat?.chat?.user}</h4>
                            </>
                        )
                    })}
                </li>
            </>
        )

    }


    // * will send a fetch request to the server for sending those chats whose days are between this .data




    return (

        <>
          <div className='flex items-center h-[99.7%] w-full'>
          <div id='previousChatSection' className={`text-white transistion-all ${(showSection ? '':"hidden")} bg-black overflow-y-auto h-screen w-full`}>
              <div className='flex justify-between'>
              <h3 className="font-sans text-md font-bold p-2 ">New chat
                </h3>
                <div className='p-2'>
                
         <IoCreateOutline
         color='white'
         size={22}
         />
                </div>
              </div>
                <div>

                    {/* this is the main list */}
                    <ul>

                        {
                            PreviousChatsDateSteps.map(function (ele) {

                                return (
                                    <>
                                        <div className='m-2'>
                                            <h3 className='font-light font-sans p-2 text-stone-400 text-[0.8rem]  '>{ele.str}</h3>

                                            <ul>
                                                {ChatProvider(ele)}
                                            </ul>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className='w-[2rem] h-[2rem]'>
                {/* <button onClick={()=>{
                    setShowSection(!showSection)
                    setRotate(!rotate)
                }}
                className={``}
                ref={toggleViewBtn}
                >
                <FaArrowRightLong
                size={22}
                className= {`border transition-all ${(rotate)? 'rotate-180':'rotate-0'} border-[rgba(225,225,225,.55)] ${(rotate)? 'hover:rotate-0':'hover:rotate-180'} bg-[rgba(225,225,225,.55)] hover:rounded-[50%] `}
                />
                </button> */}
            </div>
          </div>
          

        </>
    )
}


// onClick={(e)=>{

//     setShowSection(!showSection)

//     if(toggleViewBtn.current.classList.contains('rotate-0'))
//     {
//         toggleViewBtn.current.classList.remove('rotate-0');
//         toggleViewBtn.current.classList.add('rotate-180');
//     } else {
//         toggleViewBtn.current.classList.remove('rotate-180');
//         toggleViewBtn.current.classList.add('rotate-0');
//     }


//     if(toggleViewBtn.current.classList.contains('hover:rotate-180'))
//     {
//         toggleViewBtn.current.classList.remove('hover:rotate-180');
//         toggleViewBtn.current.classList.add('hover:rotate-0');
        
//     } else {
//         toggleViewBtn.current.classList.remove('hover:rotate-0');
//         toggleViewBtn.current.classList.add('hover:rotate-180');
//     }
// }}