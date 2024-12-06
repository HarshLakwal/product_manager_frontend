import React from 'react'
import AdminDashboardPage from '../pages/Dashboard/AdminDashboardPage.jsx'
const UserDashboard = () => {
    return (
        <>
            <div className="w-full flex" style={{ background:'#e7e7e7' }}>
                <div className="flex items-start justify-between w-full h-[auto]">
                    <AdminDashboardPage />
                </div>
            </div>
        </>
    )
}

export default UserDashboard