import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Sheared/Navbar'
import axios from 'axios'
import { token, userServerURL } from '../../../../../serverURL'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const RequestLoan = () => {
    const [amount, setAmount] = useState();
    const [term, setTerm] = useState();
    const navigate = useNavigate()
    const handleLoan = async (e) => {
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.post(`${userServerURL}/create-loan`,
            {
                loanAmount: amount,
                loanTerm: term
            },
            config);
        console.log(res.data)
        if (res.data.status) {
            toast.success(res.data.message)
            navigate('/dashboard')
        }
        else {
            toast.error(res.response.data.message)
        }
    }

    return (
        <>
            <div class="flex-grow text-gray-800 min-h-[100vh]">
                <Navbar />
                <div class="p-4">
                    <Link to="/dashboard" className='flex items-baseline gap-2 hover:underline'>
                        <svg class="w-4 h-4 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <h1 class=" text-blue-600 text-lg font-semibold mb-2">Back to Dashboard</h1>
                    </Link>
                </div>
                <div className='flex flex-col justify-center items-center min-h-[90vh]'>
                    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div class="mb-6">
                            <h1 class="text-4xl font-semibold mb-2">Request For Loan</h1>
                        </div>
                    </div>
                    <form onSubmit={handleLoan} class="bg-gray-300 p-12 rounded-lg max-w-md mx-auto">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="number" value={amount} name="loanAmount" onChange={(e) => setAmount(e.target.value)} id="floating_amount" class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_amount" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Loan Amount</label>
                        </div>

                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input type="number" value={term} name="loanTerm" onChange={(e) => setTerm(e.target.value)} id="floating_term" class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_term" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Loan Term</label>
                            </div>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default RequestLoan
