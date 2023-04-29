import React from 'react'

function Filter({filterHandle, options}) {
  return (
    <div>
      <select className='border-4' onChange={(e) =>filterHandle(e.target.value)}>
        {options. map ((option) => (
         <>
        <option value={option} >{option}</option>
         </>
        ))}
      </select>
    </div>
  )
}

export default Filter
