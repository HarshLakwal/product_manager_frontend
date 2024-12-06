import React from 'react'
import AllUsers from "../components/Admin/users/Users.jsx";
import Navbar from '../../UserDashboard/components/Sheared/Navbar.jsx';

const AdminDashboardUsers = () => {
  return (
    <div>
      <div className="w-full flex flex-col" style={{ background: '#e7e7e7' }}>
        <Navbar />
        <div className="p-10 flex items-start justify-between w-full h-[100vh]">
          <AllUsers />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardUsers