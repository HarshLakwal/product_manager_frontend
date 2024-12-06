import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Admintoken, adminServerURl, userServerURL } from '../../../../serverURL';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        inStock: "",
        image: null,
    });

    // Fetch the product data
    const getProduct = async () => {
        try {
            const response = await axios.get(`${userServerURL}/get-product`, {
                params: {
                    id: id,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const product = response.data.data; 
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                inStock: product.inStock,
            });
        } catch (error) {
            toast.error(error.response?.data.message || 'Error fetching product');
        }
    };

    // Handle changes in the form
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.put(
                `${adminServerURl}/update-product`, 
                null, {
                    params: {
                        id: id,
                        name: formData.name,
                        category: formData.category,
                        price: formData.price,
                        inStock: formData.inStock.toString(), // Convert boolean to string for query parameter
                    },
                    headers: {
                        'Authorization': `Bearer ${Admintoken}`,
                    },
                }
            );
    
            toast.success(response.data.message);
            navigate("/dashboard"); // Redirect to the dashboard after update
        } catch (error) {
            toast.error(error.response?.data.message || 'Error updating product');
        }
    };
    

    useEffect(() => {
        getProduct(); // Fetch the product when the component mounts
    }, [id]); // Depend on `id` to refetch when it changes

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h2 className='text-lg text-black text-center mb-6 font-bold'>Update Product</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Product Name
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Product name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Product Price
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.price}
                            onChange={handleChange}
                            name="price"
                            id="price"
                            type="number"
                            placeholder="Product price"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Product Category
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.category}
                            onChange={handleChange}
                            name="category"
                            id="category"
                            type="text"
                            placeholder="Product category"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inStock">
                            In Stock
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    className="form-radio text-indigo-600"
                                    type="radio"
                                    name="inStock"
                                    value="true"
                                    checked={formData.inStock === true}
                                    onChange={() => handleChange({ target: { name: 'inStock', value: true } })}
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    className="form-radio text-indigo-600"
                                    type="radio"
                                    name="inStock"
                                    value="false"
                                    checked={formData.inStock === false}
                                    onChange={() => handleChange({ target: { name: 'inStock', value: false } })}
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Add Image
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="file"
                            onChange={handleChange}
                            name="image"
                            placeholder="Product Image"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <Link 
                            to="/dashboard" 
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
