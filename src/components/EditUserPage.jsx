// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
//
// function EditUserPage() {
//     const { id } = useParams(); // Get user ID from the URL
//     const navigate = useNavigate();
//
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         role: '',
//     });
//
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//
//     // Fetch user data on component load
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Retrieve token from localStorage
//                 const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Include token in request header
//                     },
//                 });
//                 setFormData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error.response || error.message);
//                 setErrorMessage('Failed to fetch user data. Please try again.');
//             }
//         };
//         fetchUserData();
//     }, [id]);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             const token = localStorage.getItem('token'); // Retrieve token from localStorage
//             const response = await axios.put(
//                 'http://localhost:8080/api/admin/users',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Include token in request header
//                     },
//                 }
//             );
//             console.log('User updated successfully:', response.data);
//             setSuccessMessage('User updated successfully!');
//             setErrorMessage('');
//             navigate('/admin/dashboard'); // Redirect to admin dashboard or users list after success
//         } catch (error) {
//             console.error('Error updating user:', error.response || error.message);
//             setErrorMessage('Error updating user. Please try again.');
//             setSuccessMessage('');
//         }
//     };
//
//     if (!formData.username && !errorMessage) {
//         return <div>Loading user data...</div>;
//     }
//
//     return (
//         <div className="container mt-4">
//             <h2>Edit User</h2>
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}
//             {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//             <form onSubmit={handleSubmit}>
//                 {/* Username */}
//                 <div className="mb-3">
//                     <label htmlFor="username" className="form-label">Username</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         className="form-control"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* Password */}
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input
//                         type="text"
//                         id="password"
//                         name="password"
//                         className="form-control"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* First Name */}
//                 <div className="mb-3">
//                     <label htmlFor="firstName" className="form-label">First Name</label>
//                     <input
//                         type="text"
//                         id="firstName"
//                         name="firstName"
//                         className="form-control"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* Last Name */}
//                 <div className="mb-3">
//                     <label htmlFor="lastName" className="form-label">Last Name</label>
//                     <input
//                         type="text"
//                         id="lastName"
//                         name="lastName"
//                         className="form-control"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* Email */}
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="form-control"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* Phone Number */}
//                 <div className="mb-3">
//                     <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
//                     <input
//                         type="text"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         className="form-control"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//
//                 {/* Role */}
//                 <div className="mb-3">
//                     <label htmlFor="role" className="form-label">Role</label>
//                     <select
//                         id="role"
//                         name="role"
//                         className="form-select"
//                         value={formData.role}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="" disabled>Select a role</option>
//                         <option value="ROLE_USER">Voter</option>
//                         <option value="ROLE_ADMIN">Admin</option>
//                     </select>
//                 </div>
//
//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary">Update</button>
//             </form>
//         </div>
//     );
// }
//
// export default EditUserPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
    const { id } = useParams(); // Get user ID from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch user data on component load
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request header
                    },
                });
                setFormData(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    setErrorMessage('Unauthorized: Please log in again.');
                    navigate('/login');
                } else {
                    setErrorMessage('Failed to fetch user data. Please try again.');
                }
            }
        };
        fetchUserData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await axios.put(
                'http://localhost:8080/api/admin/users',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request header
                    },
                }
            );
            setSuccessMessage('User updated successfully!');
            setErrorMessage('');
            navigate('/admin/dashboard'); // Redirect to admin dashboard or users list after success
        } catch (error) {
            console.error('Error updating user:', error.response || error.message);
            setErrorMessage('Error updating user. Please try again.');
            setSuccessMessage('');
        }
    };

    if (!formData.username && !errorMessage) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                {Object.keys(formData).filter((key) => {
                    console.log(key);
                    return (key != 'role' || key != 'resetToken' || key != 'votes')
                }).map((key) => (
                    <div className="mb-3" key={key}>
                        <label htmlFor={key} className="form-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            className="form-control"
                            value={formData[key]}
                            onChange={handleChange}
                            required={key !== 'role'} // Assume "role" will use a dropdown
                        />
                    </div>
                ))}
                {/* Role Dropdown */}
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        <option value="ROLE_USER">Voter</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
}

export default EditUserPage;
