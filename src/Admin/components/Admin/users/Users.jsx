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
const getUsers = async () => {
    const res = await axios.get(`${adminServerURl}/get-users`, {
        headers: {
            Authorization: `Bearer ${Admintoken}`,
        },
    });
    return res.data
};
const UserPage = () => {
    const classes = useStyles();
    const [filterText, setFilterText] = useState('');
    if (!Admintoken) {
        window.location.reload()
    }
    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getUsers })
    const row = rows(users)
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const filteredRows = row.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <div className="w-full">
                    <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
                    <div className="w-full min-h-[40vh] bg-white rounded">
                        <Toolbar>
                            <TextField
                                variant="standard"
                                label="Search"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </Toolbar>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                            autoHeight
                            className={classes.root}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage