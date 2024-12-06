import React from 'react'
import RequestLoan from '../pages/user/requestLoan/RequestLoan'

const RequestLoanPage = () => {
    return (
        <>
            <div className="w-full flex" style={{ background:'#e7e7e7' }}>
                <div className="flex items-start justify-between w-full h-[auto]">
                    <RequestLoan />
                </div>
            </div>
        </>
    )
}

export default RequestLoanPage
