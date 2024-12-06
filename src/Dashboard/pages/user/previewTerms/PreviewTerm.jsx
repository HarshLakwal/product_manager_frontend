import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { token, userServerURL } from '../../../../../serverURL';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { ExpansionPanelSummary } from "@material-ui/core";
import { ExpansionPanelDetails } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../../../../redux/paymentSlice';
import Loader from '../../../components/Sheared/Loader.jsx'

import Navbar from '../../../components/Sheared/Navbar';
import { allTerms } from '../../../../redux/allTermsSlice';

const PreviewTerm = () => {
    const { termId } = useParams()
    const dispatch = useDispatch()

    const term = useSelector((state) => state.allTerms)

    console.log(term)

    const handlePayment = (term) => {

        const data = {
            loanId: term.id,
            repaymentAmount: term.repaymentAmount,
            termDate: term.termDate
        }

        dispatch(makePayment(data)).then((item) => {
            if (item.payload.status) {
                dispatch(allTerms(termId));
            }
        })
    }
    // const { data, isLoading, error, refetch } = useQuery({ queryKey: ['myTerm', termId], queryFn: getMyTerm });
    useEffect(() => {
        dispatch(allTerms(termId));
    }, [])
    return (
        <>
            <div class="flex-grow text-gray-800">
                <Navbar />
                <div class="p-4">
                    <Link to="/dashboard" className='flex items-baseline gap-2 hover:underline'>
                        <svg class="w-4 h-4 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <h1 class=" text-blue-600 text-lg font-semibold mb-2">Back to Dashboard</h1>
                    </Link>
                </div>
                <main class="p-6 sm:p-10 min-h-[90vh] space-y-6">
                    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div class="mr-6">
                            <h1 class="text-3xl font-semibold mb-2">My weekly terms</h1>
                        </div>
                        <div>
                            <h1 class=" flex items-center text-3xl font-semibold mb-2 ">Laon: {term?.isLoading ? <Loader/> : term?.message?.isPaid ? <span className='bg-green-300 p-2 rounded'>Paid</span> : <span className='bg-red-300 p-2 rounded'>Unpaid</span>}</h1>
                        </div>
                    </div>
                    {
                        term.isLoading ? <Loader /> :
                            term?.message?.terms?.map((data, index) => (
                                <>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<MdOutlineArrowDropDown />}
                                            aria-label="Expansion Panel 1"
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        // onClick={() => console.log("click")}
                                        >
                                            <Typography >Term {index + 1}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div className="w-full flex justify-center ">
                                                <form className="px-8 pb-8 bg-white rounded w-full">
                                                    <div className="w-full h-[10rem] flex justify-between items-center mb-2 ">
                                                        <h3 className=" text-2xl text-start">Status:- {data?.term?.paymentStatus ? <span className='bg-green-300 px-8 py-1 rounded text-[16px]'>Paid</span> : <span className='bg-red-300 px-8 py-1 rounded text-[16px]'>Unpaid</span>}</h3>
                                                    </div>
                                                    <div className='flex '>
                                                        <div className='w-[95%] mr-2'>
                                                            <div className="mb-4 md:flex md:justify-between">
                                                                <div className="w-full md:w-5/12 mb-4 md:mr-2 md:mb-0">
                                                                    <label className="block mb-2 text-sm font-bold text-gray-700">Amount</label>

                                                                    <div className="w-full h-11 px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                                                                        {data?.term?.payment}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full md:w-5/12  mb-4 md:mr-2 md:mb-0">
                                                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                                        Pay before
                                                                    </label>

                                                                    <div className="w-full h-11 px-3 py-3 text-sm   leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                                                                        {moment(data?.term?.date).format("DD-MM-YYYY")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center flex w-[50%] md:w-[15%]">
                                                        <button
                                                            onClick={(e) => handlePayment({ id: termId, termDate: data?.term?.date, repaymentAmount: data?.term?.payment })}
                                                            className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                                                            Pay
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </>
                            ))
                    }

                </main>
            </div>
        </>
    )
}

export default PreviewTerm
