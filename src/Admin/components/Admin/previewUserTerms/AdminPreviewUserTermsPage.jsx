import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Admintoken, adminServerURl, token, userServerURL } from '../../../../../serverURL';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { ExpansionPanelSummary } from "@material-ui/core";
import { ExpansionPanelDetails } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { allTerms } from '../../../../redux/allTermsSlice.js';
import Loader from '../../../../UserDashboard/components/Sheared/Loader';



const AdminPreviewUserTermsPage = () => {
    const { termId, userId } = useParams()
    const getUserLoan = async () => {
        const res = await axios.get(`${adminServerURl}/get-user-loan`, {
            params: { termId: termId, userId: userId },
            headers: {
                Authorization: `Bearer ${Admintoken}`,
            },
        });
        return res.data
    };
    const { data, isLoading, error } = useQuery({ queryKey: ['userLoan', termId, userId], queryFn: getUserLoan })
    console.log(       )
    const terms = data?.term?.loans[0]?.terms
    return (
        <>
            <div class="flex-grow text-gray-800">

                <div class="p-4">
                    <Link to="/admin/users" className='flex items-baseline gap-2 hover:underline'>
                        <svg class="w-4 h-4 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <h1 class=" text-blue-600 text-lg font-semibold mb-2">Go Back </h1>
                    </Link>
                </div>
                <main class="p-6 sm:p-10 min-h-[90vh] space-y-6">
                    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div class="mr-6">
                            <h1 class="text-3xl font-semibold mb-2">Weekly terms</h1>
                        </div>
                        <div>
                            <h1 class="flex iterm-center gap-2 text-3xl font-semibold mb-2 ">Laon: {isLoading ?<Loader/> : data?.term?.loans[0]?.isPaid  ? <span className='bg-green-300 p-2 rounded'>Paid</span> : <span className='bg-red-300 p-2 rounded'>Unpaid</span>}</h1>
                        </div>
                    </div>
                    {
                        terms &&
                        terms?.map((data, index) => (
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
                                                    <h3 className=" text-2xl text-start">Status:-  { data?.term?.paymentStatus ? <span className='bg-green-300 px-8 py-1 rounded text-[16px]'>Paid</span> : <span className='bg-red-300 px-8 py-1 rounded text-[16px]'>Unpaid</span>}</h3>
                                                </div>
                                                <div className='flex '>
                                                    <div className='w-[95%] mr-2'>
                                                        <div className="mb-4 md:flex md:justify-between">
                                                            <div className="w-full md:w-5/12 mb-4 md:mr-2 md:mb-0">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700" >Amount</label>

                                                                <div className="w-full h-11 px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                                                                    {data?.term?.payment}

                                                                </div>
                                                            </div>
                                                            <div className="w-full md:w-5/12 mb-4 md:mr-2 md:mb-0">
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

export default AdminPreviewUserTermsPage
