
import { useEffect, useState } from "react";

export default function ScrollDown(props){

  const [showScrollDown, setShowScrollDown] = useState(false);
    const {referencedElement} = props;


    
    if(referencedElement.current)
    {
     let {scrollTop , scrollHeight , offsetHeight} = referencedElement.current;

    referencedElement.current.onscroll=function(e){
   
      

       if(scrollHeight > offsetHeight){
        setShowScrollDown(true)
       }
    }

    
  }
    function ScrollHandler(){
        referencedElement.current.scrollTo(0,referencedElement.current.scrollHeight);
        setShowScrollDown(false);
      }

     

    return(
     <>

{showScrollDown && 
        (<div className=" mx-auto"> 
        <button className='bg-white border opacity-10 relative bottom-[8rem] border-white rounded-[50%]  z-10 w-[2rem]' onClick={ScrollHandler} >
      <img width="30" height="30" src="https://img.icons8.com/fluency-systems-filled/48/down--v1.png" alt="down--v1"/>
      </button>
        </div>)}
     </>
    )
}