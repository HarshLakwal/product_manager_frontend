import React from 'react'
import Navbar from '../../UserDashboard/components/Sheared/Navbar'
import PreviewUserLoanPage from '../components/Admin/previewUserLoan/PreviewUserLoanPage'

const AdminDashboardPreviewLoansPage = () => {
    return (
        <>
            <div>
                <div className="w-full flex flex-col min-h-[100vh]" style={{ background: '#e7e7e7' }}>
                    <Navbar />
                    <div className="flex px-10 items-start justify-between w-full h-[full]">
                        <PreviewUserLoanPage />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboardPreviewLoansPage
