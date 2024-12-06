import React, { useState } from 'react';
import { Admintoken, adminServerURl } from '../../../../serverURL';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        inStock: "",
        // image: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${adminServerURl}/create-product`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Admintoken}`,
                },
            });
            navigate('/dashboard');
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div class="w-full max-w-xs">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className='text-lg text-black text-center mb-6 font-bold'>Add Product</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Product Name
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.name} onChange={handleChange} name='name' id="username" type="text" placeholder="product name" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Product Price
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='price' value={formData.price} onChange={handleChange} type="number" placeholder="product price" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Product Category
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" onChange={handleChange} value={formData.category} name='category' type="text" placeholder="product category" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="inStock">
                            InStock
                        </label>
                        <div class="flex items-center space-x-4">
                            <label class="inline-flex items-center">
                                <input
                                    class="form-radio text-indigo-600"
                                    type="radio"
                                    name="inStock"
                                    value="true"
                                    checked={formData.inStock === true}
                                    onChange={() => handleChange({ target: { name: 'inStock', value: true } })}
                                />
                                <span class="ml-2">Yes</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input
                                    class="form-radio text-indigo-600"
                                    type="radio"
                                    name="inStock"
                                    value="false"
                                    checked={formData.inStock === false}
                                    onChange={() => handleChange({ target: { name: 'inStock', value: false } })}
                                />
                                <span class="ml-2">No</span>
                            </label>
                        </div>
                    </div>

{/*                     <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Add Image
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="file" onChange={handleChange} name='image' placeholder="product Image" />
                    </div> */}

                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
                            Submit
                        </button>
                        <Link to={"/dashboard"} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
