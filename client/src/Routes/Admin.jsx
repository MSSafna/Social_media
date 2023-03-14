import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from 'react-router-dom';
import AdminLogin from '../Pages/Admin/login/Adminlogin';
import Sidebar from '../Components/Admin/dashboard/Sidebar';
import Testing from '../Components/Admin/dashboard/Table';
import Dashboard from '../Components/Admin/dashboard/Dashboard';

function Admin() {
  return (
    <div>
      <Router>
        <Routes>
          <Route extact path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Sidebar props={<Dashboard />} />} />
          {/* <Route path='/admin/users' element={<Sidebar/>} </Route> */}
          <Route path="/admin-view-user" element={<Sidebar props={<Testing />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Admin;
