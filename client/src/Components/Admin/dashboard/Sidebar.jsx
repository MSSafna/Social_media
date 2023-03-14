/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { HiMenuAlt3, HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineDashboard, MdApproval } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { CiSquareQuestion } from 'react-icons/ci';

import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line padded-blocks
function Sidebar(props) {

  const menus = [
    { name: 'dashboard', navigate: '/dashboard', icon: MdOutlineDashboard },
    { name: 'User', navigate: '/admin-view-user', icon: AiOutlineUser },
    { name: 'Counselors', navigate: '/admin-view-counselors', icon: HiOutlineUsers },
    { name: 'Counselor requests', navigate: '/admin-view-requests', icon: MdApproval },
    { name: 'Specialization', navigate: '/admin-specialization', icon: MdOutlineDashboard },
    { name: 'Appointments', navigate: '/admin-view-appointments', icon: MdOutlineDashboard },
    { name: 'User plans', navigate: '/admin-view-plans', icon: MdOutlineDashboard },

  ];

  const counselorManu = [
    { name: 'dashboard', navigate: '/counselor/home', icon: MdOutlineDashboard },
    { name: 'My Sessions', navigate: '/counselor/my-sessions', icon: AiOutlineUser },
    { name: 'My Chats', navigate: '/counselor/my-chats', icon: HiOutlineUsers },
    { name: 'My Patients', navigate: '/counselor/my-patients', icon: MdApproval },
    { name: 'Profile', navigate: '/counselor/my-profile', icon: MdOutlineDashboard },

  ];

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <section className="flex gap-6">
      <div className={` ${props.counselor ? 'bg-blue-900' : 'bg-[#A99696]'}  h-[600px] ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {
          !props.counselor ? menus?.map((menu, i) => (
            <div key={i} className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900  rounded-md" onClick={() => navigate(menu.navigate)}>
              <div>{React.createElement(menu.icon, { size: '30' })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`cursor-pointer duration-500 whitespace-pre ${!open && 'opacity-0 translate-x-28 overflow-hidden text-lg'
                }`}
              >
                {menu.name}
              </h2>
              <h2 className={`${open && 'hidden'} 
                      absolute left-48 bg-blue-900 font-semibold whitespace-pre text-white rounded-md
                       drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 
                       group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-40`}
              >
                {menu.name}
              </h2>

            </div>
          )) : counselorManu?.map((menu, i) => (
            <div key={i} className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-500 rounded-md" onClick={() => navigate(menu.navigate)}>
              <div>{React.createElement(menu.icon, { size: '30' })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`cursor-pointer duration-500 whitespace-pre ${!open && 'opacity-0 translate-x-28 overflow-hidden text-lg'
                }`}
              >
                {menu.name}
              </h2>
              <h2 className={`${open && 'hidden'} 
                      absolute left-48 bg-blue-900 font-semibold whitespace-pre text-white rounded-md
                       drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 
                       group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-40`}
              >
                {menu.name}
              </h2>
            </div>
          ))
          }
        </div>
      </div>
      <div className="mt-3 w-full">
        {props.props}
      </div>
    </section>
  );
}

export default Sidebar;
