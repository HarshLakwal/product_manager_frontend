import React, { useEffect, useState } from 'react';
import { columns } from './coloums';
import { rows } from './row.js';
// import { getReferredUsers } from './APIs';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Admintoken, adminServerURl, userServerURL } from '../../../../../serverURL';
import { Toolbar, TextField } from '@mui/material';
import toast from 'react-hot-toast'
import { makeStyles } from '@material-ui/core';
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoans } from '../../../../redux/loansSlice';
import LoadingAnimation from '../../../../assets/animations/loader.json'
import Lottie from 'react-lottie';
const useStyles = makeStyles({
    root: {
        '& .MuiIconButton-root': {
            backgroundColor: 'darkgray',
            color: 'black ',
            '&:hover': {
                backgroundColor: 'darkgray',
            },
        },
    },
});


const PreviewUserLoanPage = () => {
    const classes = useStyles();
    const [filterText, setFilterText] = useState('');
    // const [data, setData] = useState("")
    const { userId } = useParams()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const allLoans = async () => {
        try {
            const res = await axios.get(`${adminServerURl}/get-user-loans`, {
                params: { userId: userId },
                headers: { Authorization: `Bearer ${Admintoken}` },
            });
            if (res.data.status) {
                return res.data.data
                // setData(res.data.data?.loans)
            }
        } catch (err) {
            return err;
        }
    };
    const { data, isLoading, error } = useQuery({ queryKey: ['loans'], queryFn: allLoans })
    const row = rows(data)
    useEffect(() => {
        allLoans()
    }, [])

    const filteredRows = row.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <div className="w-full">
                    <div class="">
                        <Link to="/admin/users" className='flex items-baseline gap-2 hover:underline'>
                            <svg class="w-4 h-4 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                            </svg>
                            <h1 class=" text-blue-600 text-lg font-semibold mb-2">Go Back</h1>
                        </Link>
                    </div>
                    <h3 className="text-[22px] font-Poppins pb-2">All Requested Loans</h3>
                    <div className="w-full min-h-[30vh] bg-white rounded">
                        <Toolbar>
                            <TextField
                                variant="standard"
                                label="Search"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </Toolbar>
                        {
                            isLoading ?
                                <Lottie
                                    options={defaultOptions}
                                    height={50}
                                    width={50}
                                /> :
                                <DataGrid
                                    rows={filteredRows}
                                    columns={columns(userId)}
                                    pageSize={5}
                                    disableSelectionOnClick
                                    autoHeight
                                    className={classes.root}
                                />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviewUserLoanPage
