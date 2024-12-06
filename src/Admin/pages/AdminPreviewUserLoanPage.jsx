import React from 'react'
import Navbar from '../../UserDashboard/components/Sheared/Navbar'
import PreviewUserLoanPage from '../components/Admin/previewUserLoan/PreviewUserLoanPage'

const AdminPreviewUserLoanPage = () => {
    return (
        <>
            <div>

                <div className="w-full flex flex-col h-full" style={{ background: '#e7e7e7' }}>
                    <Navbar />
                    <div className="flex items-start justify-between  w-full h-[auto]">
                        <div className="w-[80px] 800px:w-[330px]">
                        </div>
                        <PreviewUserLoanPage />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPreviewUserLoanPage
