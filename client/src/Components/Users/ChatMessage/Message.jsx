import React from 'react'
import Avatar from '../Avatar/Avatar'
import moment from 'moment';


function Message({message, own}) {
  const now = moment();
  const someDate = moment(message.createdAt);
  const Time = someDate.from(now);
  return (
    <>
    <div className={own ?'flex justify-end':'flex'}>
      <div className='px-2 py-2'>
      <Avatar size='sm'  />
      </div>
      <div className={own ?' mt-2 bg-gray-200 py-2 rounded-lg w-fit mr-2 p-2 pl-4' :' mt-2 bg-blue-500  py-2 rounded-lg w-fit text-white  p-2 '}>
        {message.text}
      </div>
    </div>
    <span className={own ? 'flex justify-end mr-4 ':'ml-4 '}>{Time}</span> 
    </>
  )
}

export default Message
