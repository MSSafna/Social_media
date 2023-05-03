
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Cookies, useCookies } from 'react-cookie';
import Cards from '../Card/Cards';
import { UseruseContext } from '../../../Context/Context';
import jwtDecode from 'jwt-decode';
import { FaSearch } from 'react-icons/fa'
import { AiTwotoneHome } from 'react-icons/ai'
import { MdNotificationsActive } from 'react-icons/md'
import { BsFillChatSquareTextFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'
import ModalComponent from '../Modal/ModalComponent';
import Notification from '../Notification/Notification';


function Sidebar(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { userDetails, setUserDetails } = UseruseContext();
  const user = jwtDecode(userDetails.jwt);
  const userId = user.userDetails._id;
  const non_activeElements = 'block gap-2 flex py-3  hover:bg-blue-400 text-black  -mx-1 px-1 rounded-md transition-all hover:scale-110 hover:shadow-gray-300 mt-2 ';
  const activeElements = 'block flex gap-2 py-3  bg-blue-500 text-white rounded-md shadow-md -mx-4 px-4 ';
  const { pathname } = location
  console.log(pathname, "pathnamee")

  const logout = (() => {
    removeCookie('jwt');
    localStorage.removeItem('jwt');
    setUserDetails('');
    navigate('/');
  });
  return (
    <div className="flex">
      <div className="w-64 mt-2    ">
        <Cards>
          <p
            className={pathname == '/home' ? activeElements : non_activeElements}
            onClick={() => {
              navigate('/home');
            }}
          >
            <AiTwotoneHome size={24} />
            <span className="cursor-pointer w-24 ">Home</span>
          </p>
          <p
            className={pathname == '/search' ? activeElements : non_activeElements}
          >
            <FaSearch size={24} ></FaSearch>
            <ModalComponent name='Search' ></ModalComponent>

          </p>
          <p
            className={pathname == '/notification' ? activeElements : non_activeElements}
            
          >
            <MdNotificationsActive size={24} className='cursor-pointer' />
            <Notification name='Notification'/>
          </p>
          <p
            className={pathname == '/chat' ? activeElements : non_activeElements}
            onClick={() => {
              navigate('/chat')
            }}
          >
            <BsFillChatSquareTextFill size={24} />
            <span className="cursor-pointer w-24 ">Chats</span>
          </p>
          <p
            className={pathname == `/profile/${userId}` ? activeElements : non_activeElements}
            onClick={() => {
              navigate(`/profile/${userId}`)
            }}
          >
            <CgProfile size={24} />
            <span className="cursor-pointer">My Profile</span>

          </p>
          <p
            className={ non_activeElements}
            onClick={logout}
          >
            <BiLogOutCircle size={24} />
            <span className="cursor-pointer">Logout</span>
          </p>
        </Cards>
      </div>
      <div className="mr-8 w-3/5">
        {props.props}
      </div>
    </div>

  );
}

export default Sidebar;
