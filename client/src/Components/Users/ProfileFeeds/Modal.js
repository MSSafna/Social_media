import React from 'react'



function Modal({children,open,onClose}) {
const handleClose = (e) => {
    if (e.target.id === "wraper") {
        onClose();
    }
    // e.stopPropogation();
  };
    const OVERLAY_STYLE={
            top:5,
            left:5,
            right:5,
            bottom:5,
            backgroundColor:'rgba(0,0,0,.2)',
            zIndex:1000
    }

    if(!open) return null
  return (
    <>
    <div id='wraper'
    onClick={handleClose}
     style={OVERLAY_STYLE} className='fixed flex items-center justify-center'>

    <div  className=' p-1 rounded-md bg-white'>
     {children}
    </div>

    </div>
    </>
  )
}

export default Modal