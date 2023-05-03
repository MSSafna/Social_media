
import React,{Suspense,lazy} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { useCookies} from 'react-cookie';
import Login from '../Pages/Users/Login/Login';
import Signup from '../Pages/Users/Signup/Signup/Signup';
// import Profile from '../Pages/Users/Profile/Profile';
// import Home from '../Pages/Users/Homepage/Home';
import CheckToken from '../Context/CheckToken';
import PersistLogin from '../Context/PersistLogin';
import Layout from '../Layout';
import Chat from '../Pages/Users/Chat/Chat';


const Home = React.lazy(() => import('../Pages/Users/Homepage/Home'));
const Profile=React.lazy(()=>import('../Pages/Users/Profile/Profile'))
function Users() {
  const [cookies] = useCookies();
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<CheckToken />}>
              <Route element={<Layout/>}>
              <Route path="/home" element={ <Suspense fallback={<div>...loading</div>}> <Home/> </Suspense>}/> 
              <Route path="/profile/:id" element={ <Suspense fallback={<div>...loading</div>}> <Profile/> </Suspense>}/>  
              <Route path='/chat' element={<Chat/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Users;
