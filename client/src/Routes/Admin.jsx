import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from 'react-router-dom';
import AdminLogin from '../Pages/Admin/login/Adminlogin';
import Sidebar from '../Components/Admin/dashboard/Sidebar';
import Table from '../Components/Admin/dashboard/Table';
import Report from '../Components/Admin/dashboard/Report';
import Dashboard from '../Components/Admin/dashboard/Dashboard'


function Admin() {
  return (
    <div>
      <Router>
        <Routes>
          <Route extact path="/admin" element={<AdminLogin />} />
          <Route path="/admin-view-user" element={<Sidebar props={<Table />} />} />
          <Route path="/admin-view-reports" element={<Sidebar props={< Report/>} />} />
          <Route path="/admin-view-dashboard" element={<Sidebar props={< Dashboard/>} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default Admin;
