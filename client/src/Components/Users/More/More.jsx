/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';

function More() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="py-3 cursor-pointer">
        <UnfoldMoreDoubleIcon onClick={() => {
          setOpen(!open);
        }}
        />
        <span>More</span>

      </div>

      <div>
        {open
                     && (
                     <ul>
                       <li className="dropdownItems ml-2 pt-2">
                         <h1>heee</h1>
                         <hr className="py-2" />
                       </li>
                       <li className="dropdownItems ml-2 pt-2 py-2 ">
                         <h1>heee</h1>
                         <hr />
                       </li>

                     </ul>
                     )}

      </div>

    </div>
  // <div className='menu-container py-3'>
  //     <div className="menu-trigger">
  //         <UnfoldMoreDoubleIcon onClick={()=>{
  //             setOpen(!open)
  //         }} />
  //         <span>More</span>
  //     </div>

  //     <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >

  //      <ul>
  //         <li className='dropdownItems'>
  //            <h1>heee</h1>
  //         </li>
  //         <li className='dropdownItems'>
  //            <h1>heee</h1>
  //         </li>

  //      </ul>

  //     </div>
  // </div>

  );
}

export default More;
