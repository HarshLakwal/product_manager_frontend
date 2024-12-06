import React, { useEffect, useState } from 'react';
import { columns } from './colums';
import { rows } from './rows';
// import { getReferredUsers } from './APIs';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { token, userServerURL } from '../../../../serverURL';
import { Toolbar, TextField } from '@mui/material';
import toast from 'react-hot-toast'
import { makeStyles } from '@material-ui/core';
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from '../../../assets/animations/loader.json'
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


const UserLoanPage = () => {
    const [data, setData] = useState("")
    const classes = useStyles();
    const [filterText, setFilterText] = useState('');
    const getMyLoans = async () => {
        const res = await axios.get(`${userServerURL}/get-my-loans`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setData(res.data)
    };
    useEffect(() => {
        getMyLoans()
    }, [])
    // const { data: loans, isLoading, error } = useQuery({ queryKey: ['myLoans'], queryFn: getMyLoans })
    const row = rows(data)
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const filteredRows = row.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <div className="w-full">
                    <h3 className="text-[22px] font-Poppins pb-2">My Loans</h3>
                    <div className="w-full min-h-[40vh] bg-white rounded">
                        <Toolbar>
                            <TextField
                                variant="standard"
                                label="Search"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </Toolbar>
                        {

                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
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

export default UserLoanPage