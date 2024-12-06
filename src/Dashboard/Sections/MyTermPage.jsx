import React from 'react'
import PreviewTerm from '../pages/user/previewTerms/PreviewTerm.jsx'

const MyTermPage = () => {
    return (
        <>
            <div className="w-full flex" style={{ background:'#e7e7e7' }}>
                <div className="flex items-start justify-between w-full h-[auto]">
                    <PreviewTerm />
                </div>
            </div>
        </>
    )
}

export default MyTermPage
