import "./App.css";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const App = () => {
    const init = {
        id: "",
        name: "",
        email: "",
        password: "",
        address: "",
        age: "",
        phone: "",
    };
    const [formData, setFormData] = useState(init);
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:5055/api/postUser", formData)
            .then((res) => {
                console.log(res, ":post form data");
                toast.success(res.data.message);
                setFormData(init);
            })
            .catch((err) => {
                console.log(err, ":error in post form data");
                toast.error("Error submitting form!");
            });
    };
    const [logData, setLogData] = useState(init);
    const handleLog = (e) => {
        setLogData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const checkLogin = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:5055/api/checkUserLogin", logData)
            .then((res) => {
                console.log(res, ":get form data");
                toast.success(res.data.message);
                setLogData(init);
            })
            .catch((err) => {
                console.log(err, ":error in get form data");
                toast.error(
                    err.response?.data?.message || "Error checking login!"
                );
            });
    };

    const [log, setLog] = useState(true);
    const handleLogin = () => {
        setLog(false);
        setReg(true);
        setTable(false);
    };
    const [reg, setReg] = useState(false);
    const handleRegister = () => {
        setReg(false);
        setLog(true);
        setTable(false);
    };
    const [tabdata, setTabData] = useState([]);
    const getData = async () => {
        await axios
            .get("http://localhost:5055/api/getUser")
            .then((res) => {
                console.log(res, ":get form data");
                setTabData(res.data);
            })
            .catch((err) => {
                toast.error(err, "Error");
            });
    };
    const [table, setTable] = useState(false);
    useEffect(() => {
        getData();
    });

    const handleDelete = async (id) => {
        await axios
            .post(`http://localhost:5055/api/deleteUser/${id}`)
            .then((res) => {
                console.log(res, ":get form data");
                toast.success("User deleted successfully!");
                getData();
            })
            .catch((err) => {
                console.log(err, ":error in get form data");
                toast.error("Error deleting user!");
            });
    };

    const [editData, setEditData] = useState(init);
    const handleedt = (e) => {
        setEditData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const [edt, setEdt] = useState(false);
    const handleEdit = async (id) => {
        await axios
            .post(`http://localhost:5055/api/updateUser/${id}`, editData)
            .then((res) => {
                console.log(res, ":get form data");
                toast.success("User updated successfully!");
                setEditData(init);
            })
            .catch((err) => {
                console.log(err, ":error in get form data");
                toast.error("Error editing user!");
            });
    };

    return (
        <>
            <div className='fixed mt-[80vh] inset-0 flex items-center justify-center'>
                <button
                    className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                    onClick={() => {
                        setLog(false);
                        setReg(false);
                        setTable(true);
                        setEdt(false);
                        getData();
                    }}
                >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                        Table
                    </span>
                </button>
                <button
                    className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                    onClick={() => {
                        setLog(true);
                        setReg(false);
                        setTable(false);
                        setEdt(false);
                    }}
                >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                        Login
                    </span>
                </button>
            </div>
            {edt && (
                <div className='EditForm container mx-auto mt-5 flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold mb-4'>Update Form</h2>
                    <ToastContainer />
                    <form
                        className='bg-yellow-200 rounded-2xl p-8 border-black border-2 w-[30vw]'
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit(formData.id);
                            setEdt(false);
                            setTable(true);
                        }}
                    >
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Username :
                            </label>
                            <input
                                onChange={handleedt}
                                type='text'
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.name}
                                name='name'
                                value={editData.name}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Email :
                            </label>
                            <input
                                onChange={handleedt}
                                type='email'
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.email}
                                name='email'
                                value={editData.email}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Password :
                            </label>
                            <input
                                type='password'
                                onChange={handleedt}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.password}
                                name='password'
                                value={editData.password}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Address :
                            </label>
                            <input
                                type='address'
                                onChange={handleedt}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.address}
                                name='address'
                                value={editData.address}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Age :
                            </label>
                            <input
                                type='number'
                                onChange={handleedt}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.age}
                                name='age'
                                value={editData.age}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Phone :
                            </label>
                            <input
                                type='tel'
                                onChange={handleedt}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder={formData.phone}
                                name='phone'
                                value={editData.phone}
                                required
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                                type='submit'
                            >
                                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                                    Update
                                </span>
                            </button>
                            <button
                                className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                                onClick={() => {
                                    setEdt(false);
                                    setTable(true);
                                    getData();
                                }}
                                type='button'
                            >
                                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                                    Close
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {table && (
                <div className='Table container mx-auto mt-5 flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold mb-4'>User Table</h2>
                    <ToastContainer />
                    <table className='min-w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
                        <thead>
                            <tr>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    ID
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Name
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Email
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Password
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Address
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Age
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Phone
                                </th>
                                <th className='py-2 px-4 border-b text-left text-gray-700'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabdata.map((user, index) => (
                                <tr key={index}>
                                    <td className='py-2 px-4 border-b'>
                                        {user.id}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.name}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.email}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.password}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.address}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.age}
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        {user.phone}
                                    </td>
                                    <td className='py-2 px-4 border-b gap-4 flex'>
                                        <button
                                            className='text-blue-500 hover:underline border-1 p-2'
                                            onClick={() => {
                                                setFormData(user);
                                                setTable(false);
                                                setEdt(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className='text-red-500 hover:underline border-1 p-2'
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {log && (
                <div className='LoginForm container mx-auto mt-5 flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold mb-4'>Login Form</h2>
                    <ToastContainer />
                    <form
                        className='bg-yellow-200 rounded-2xl p-8 border-black border-2 w-[30vw]'
                        onSubmit={checkLogin}
                    >
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Email :
                            </label>
                            <input
                                onChange={handleLog}
                                type='email'
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your email'
                                name='email'
                                value={logData.email}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Password :
                            </label>
                            <input
                                type='password'
                                onChange={handleLog}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your password'
                                name='password'
                                value={logData.password}
                                required
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                                type='submit'
                            >
                                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                                    Login
                                </span>
                            </button>
                            <a
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={handleLogin}
                            >
                                Don't have an account?
                            </a>
                        </div>
                    </form>
                </div>
            )}
            {reg && (
                <div className='RegisterForm container mx-auto mt-5 flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-bold mb-4'>Register Form</h2>
                    <ToastContainer />
                    <form
                        className='bg-yellow-200 rounded-2xl p-8 border-black border-2 w-[30vw]'
                        onSubmit={handleSubmit}
                    >
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Username :
                            </label>
                            <input
                                onChange={handleChange}
                                type='text'
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your name'
                                name='name'
                                value={formData.name}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Email :
                            </label>
                            <input
                                onChange={handleChange}
                                type='email'
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your email'
                                name='email'
                                value={formData.email}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Password :
                            </label>
                            <input
                                type='password'
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your password'
                                name='password'
                                value={formData.password}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Address :
                            </label>
                            <input
                                type='address'
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your address'
                                name='address'
                                value={formData.address}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Age :
                            </label>
                            <input
                                type='number'
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your age'
                                name='age'
                                value={formData.age}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm text-gray-700'>
                                Phone :
                            </label>
                            <input
                                type='tel'
                                onChange={handleChange}
                                className='w-full border border-gray-300 rounded-md p-2'
                                placeholder='Enter your phone number'
                                name='phone'
                                value={formData.phone}
                                required
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <button
                                className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                                type='submit'
                            >
                                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                                    Register
                                </span>
                            </button>
                            <a
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={handleRegister}
                            >
                                Already have an account?
                            </a>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default App;
