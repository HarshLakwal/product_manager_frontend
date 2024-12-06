import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { Admintoken, adminServerURl, userServerURL } from '../../../../serverURL';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [data, setData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdminRole = () => {
        if (Admintoken) {
            try {
                const decodedToken = jwtDecode(Admintoken);
                console.log(decodedToken)
                setIsAdmin(decodedToken.role === 'admin');
            } catch (error) {
                console.error("Error decoding token:", error);
                setIsAdmin(false);
            }
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${userServerURL}/get-products`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${adminServerURl}/delete-product`, {
                params: { id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Admintoken}`,
                },
            });
            setData(data.filter((item) => item._id !== id)); // Remove the deleted item from the state
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error deleting product");
        }
    };

    useEffect(() => {
        fetchData(); 
        checkAdminRole(); 
    }, []);

    return (
        <div>
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {data?.map((item) => (
                            <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <div className="h-56 w-full">
                                    <a href="#">
                                        <img
                                            className="mx-auto h-full dark:hidden"
                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                            alt=""
                                        />
                                        <img
                                            className="mx-auto hidden h-full dark:block"
                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div className="pt-6">
                                    <div className="mb-4 flex items-center justify-between gap-4">
                                        <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                            Up to 35% off
                                        </span>
                                    </div>

                                    <a
                                        href="#"
                                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                    >
                                        {item?.name}
                                    </a>

                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                minimumFractionDigits: 2,
                                            }).format(item.price)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        {/* Conditionally render buttons based on isAdmin state */}
                                        {isAdmin && (
                                            <>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    className="mt-4 rounded-lg bg-stone-400 px-4 py-2 text-sm font-medium text-black hover:bg-stone-300"
                                                >
                                                    <Link to={`/admin/updateProduct/${item._id}`}>
                                                        Update
                                                    </Link>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;
