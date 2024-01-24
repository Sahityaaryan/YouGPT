
'use client'

import { useState } from 'react'
import MainChat from './components/MainChat';
import PreviousChatSection from './components/PreviousChatsComponents/PreviousChatSection';
import { FaArrowRightLong } from "react-icons/fa6";


export default function App() {

  const [showSection, setShowSection] = useState(false);
  const [rotate, setRotate] = useState(false);

  return (
    <main className='bg-[#2c2d33]'>

      <div className='h-screen w-full flex '>

        <div className={`flex ${showSection ? 'w-[20%]':'w-2'}`}>
     
          {
            showSection && (
              <>
                <div className= 'h-full'>
                  <PreviousChatSection/>
                </div>
              </>
            )
          }

          <button onClick={() => {
            setShowSection(!showSection)
            setRotate(!rotate)
          }}>

            <FaArrowRightLong
              size={22}
              className={`border transition-all ${(rotate) ? 'rotate-180' : 'rotate-0'} border-[rgba(225,225,225,.5)] ${(rotate) ? 'hover:rotate-0' : 'hover:rotate-180'} bg-[rgba(225,225,225,.55)] hover:rounded-[50%] `}
            />
          </button>
        </div>


        
       <div className={`${(showSection) ?'w-[80%]':'w-[100%]'} h-full `}> 

          <MainChat />
        </div>

      </div>

    </main>
  )
}


