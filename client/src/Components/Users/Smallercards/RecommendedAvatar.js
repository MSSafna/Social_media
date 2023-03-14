import React from 'react'

function RecommendedAvatar() {
  return (
   <div>
    <div  className='-mt-4 '>
      <img src="https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819__340.jpg" alt=""   className=" rounded-md w-full h-28 transform  transition duration-1000 hover:scale-125 hover:h-50"/>                            
    </div>
    <div className='text-center font-semibold'>
        ABC   
    </div>
    <div  className='text-center'>
        producer
    </div>
    <div className='grow text-center'>

    <button className='bg-[#1867a5] text-white px-5 rounded-lg  border-none text-sm mb-2'>Follow</button>
    </div>
   </div>
    
 

  )
}

export default RecommendedAvatar
