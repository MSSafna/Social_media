import React from 'react'

function Pagination({totalPost, postPerPage, setCurrentpage ,currentPage}) {
    let pages =[]
    for(let i=1;i<= Math.ceil(totalPost/postPerPage);i++){
        pages.push(i)
    }
  return (
    <div>
      {pages.map((page,i) => (
        <button key ={i} onClick={() => setCurrentpage(page)} 
         className={page == currentPage && 'text-red-600' }
        style={{
            width: '25px', // Width of the button
            height: '25px', // Height of the button
            fontFamily: 'inherit', // Font family of the button, inherited from parent element
            fontWeight: 600, // Font weight of the button
            fontSize: '16px', // Font size of the button
            margin: '0 10px', // Margin around the button
            borderRadius: '6px', // Border radius of the button
            cursor: 'pointer', // Cursor style when hovering over the button
            transition: 'all 0.5s ease', // Transition effect for button styles
            background: 'transparent', // Background color of the button
            borderColor: '#eee' // Border color of the button
          }}

           >{page}</button>
      ))}
    </div>
  )
}

export default Pagination
