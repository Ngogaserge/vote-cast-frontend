// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
// import "./HomePage.css"; // Reusing the homepage styles
// import Chart from "chart.js/auto";
//
// function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [stats, setStats] = useState({});
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });
//     const chartRef = useRef(null);
//     const pageSize = 10;
//     const API_URL = process.env.REACT_APP_API_URL;
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         fetchUsers(currentPage, searchQuery);
//         fetchRoleStats();
//     }, [currentPage, searchQuery]);
//
//     const fetchUsers = async (pageNo, query) => {
//         try {
//             const response = await axios.get(`${API_URL}/api/admin/user-role-stats`, {
//                 params: {
//                     pageNo: pageNo,
//                     pageSize: pageSize,
//                     search: query,
//                     sortBy: "id",
//                 },
//             });
//             setUsers(response.data.content);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//
//     const fetchRoleStats = async () => {
//         try {
//             const response = await axios.get(`${API_URL}/api/admin/user-role-stats`);
//             setStats(response.data);
//             renderChart(response.data);
//         } catch (error) {
//             console.error("Error fetching role statistics:", error);
//         }
//     };
//
//     const renderChart = (data) => {
//         const ctx = document.getElementById("chart").getContext("2d");
//         const roles = Object.keys(data);
//         const roleCounts = Object.values(data);
//
//         if (chartRef.current) {
//             chartRef.current.destroy();
//         }
//
//         chartRef.current = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: roles,
//                 datasets: [
//                     {
//                         label: "Number of Users per Role",
//                         data: roleCounts,
//                         backgroundColor: "rgba(0, 123, 255, 0.2)",
//                         borderColor: "rgba(0, 123, 255, 1)",
//                         borderWidth: 1,
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                     },
//                 },
//             },
//         });
//     };
//
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${API_URL}/api/admin/users/${id}`);
//             fetchUsers(currentPage, searchQuery);
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };
//
//     const handleAddUser = async () => {
//         try {
//             await axios.post(`${API_URL}/api/admin/users`, newUser);
//             fetchUsers(currentPage, searchQuery);
//             setNewUser({ username: "", email: "", role: "" }); // Reset form after submission
//         } catch (error) {
//             console.error("Error adding user:", error);
//         }
//     };
//
//     const handleEditUser = (user) => {
//         // Implement your edit functionality here
//         console.log("Edit user:", user);
//     };
//
//     const handleSearch = (event) => {
//         setSearchQuery(event.target.value);
//     };
//
//     return (
//         <>
//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
//                 <div className="container">
//                     <img
//                         src="https://vote-cast-backend-production-b22a.up.railway.app/images/icons8-vote-100.png"
//                         alt="VoteCast Logo"
//                         style={{height: "40px", marginRight: "10px"}}
//                     />
//
//                     <a className="navbar-brand fw-bold" href="#">VoteCast Admin</a>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarNav"
//                         aria-controls="navbarNav"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href={`${API_URL}/admin`}
//                                    style={{cursor: "pointer"}}>Users Management</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold"
//                                    onClick={() => navigate("/admin/election-management")} style={{cursor: "pointer"}}>
//                                     Election Management
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" onClick={() => navigate("/admin/candidate-management")} style={{ cursor: "pointer" }}>
//                                     Candidates Management
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" onClick={() => navigate("/admin/vote-management")} style={{ cursor: "pointer" }}>
//                                     Votes Management
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
//                                     Logout
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//
//             {/* Hero Section */}
//             <section
//                 className="hero d-flex align-items-center text-white"
//                 style={{ background: "linear-gradient(to bottom right, #007bff, #6610f2)", minHeight: "50vh" }}
//             >
//                 <div className="container text-center">
//                     <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
//                     <p className="lead mb-0">Manage users, elections, and monitor voting progress effortlessly.</p>
//                 </div>
//             </section>
//
//             {/* Dashboard Content */}
//             <section className="py-5 bg-light">
//                 <div className="container">
//                     {/* Stats Section */}
//                     <h2 className="text-center fw-bold mb-4">Dashboard Overview</h2>
//                     <div className="row mb-5">
//                         <div className="col-md-6">
//                             <div className="card border-0 shadow-sm h-100">
//                                 <div className="card-body text-center">
//                                     <h5 className="card-title">Total Users</h5>
//                                     <p className="card-text display-4 text-primary">{users.length}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="card border-0 shadow-sm h-100">
//                                 <div className="card-body text-center">
//                                     <h5 className="card-title">User Roles</h5>
//                                     <canvas id="chart" width="400" height="200"></canvas>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Search Bar */}
//                     <div className="mb-4 text-center">
//                         <input
//                             type="text"
//                             className="form-control w-50 mx-auto"
//                             placeholder="Search users by name or email"
//                             value={searchQuery}
//                             onChange={handleSearch}
//                         />
//                     </div>
//
//                     {/* User Table */}
//                     <h3 className="text-center fw-bold mb-4">Manage Users</h3>
//                     <button className="btn btn-primary mb-4" onClick={() => navigate("/admin/add-user")}>Add New User</button>
//                     <div className="table-responsive">
//                         <table className="table table-bordered">
//                             <thead>
//                             <tr>
//                                 <th>Username</th>
//                                 <th>Email</th>
//                                 <th>Role</th>
//                                 <th>Actions</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {users.map((user) => (
//                                 <tr key={user.id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td>
//                                         <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/admin/edit-user/${user.id}`)}>Edit</button>
//                                         <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//
//                     {/* Pagination */}
//                     <nav className="d-flex justify-content-center mt-4">
//                         <ul className="pagination">
//                             <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)} style={{ cursor: "pointer" }}>
//                                 <span className="page-link">Previous</span>
//                             </li>
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <li
//                                     key={index}
//                                     className={`page-item ${currentPage === index ? "active" : ""}`}
//                                     onClick={() => setCurrentPage(index)}
//                                     style={{ cursor: "pointer" }}
//                                 >
//                                     <span className="page-link">{index + 1}</span>
//                                 </li>
//                             ))}
//                             <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)} style={{ cursor: "pointer" }}>
//                                 <span className="page-link">Next</span>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </section>
//         </>
//     );
// }
//
// export default AdminDashboard;
//

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./HomePage.css";
import Chart from "chart.js/auto";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const pageSize = 10;
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(currentPage, searchQuery);
        fetchRoleStats();
    }, [currentPage, searchQuery]);

    const fetchUsers = async (pageNo, query) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/admin/users`, {
                params: {
                    pageNo: pageNo,
                    pageSize: pageSize,
                    search: query,
                    sortBy: "id",
                },
            });
            setUsers(response.data?.content || []);
            setTotalPages(response.data?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch users. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRoleStats = async () => {
        try {
            // This is the correct endpoint for role statistics
            const response = await axios.get(`${API_URL}/api/admin/user-role-stats`);
            if (response.data) {
                setStats(response.data);
                renderChart(response.data);
            }
        } catch (error) {
            console.error("Error fetching role statistics:", error);
            setError("Failed to fetch role statistics.");
        }
    };

    const renderChart = (data) => {
        const canvas = document.getElementById("roleChart");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const roles = Object.keys(data || {});
        const roleCounts = Object.values(data || {});

        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: roles,
                datasets: [
                    {
                        label: "Number of Users per Role",
                        data: roleCounts,
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        borderColor: "rgba(0, 123, 255, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    const handleDelete = async (id) => {
        if (!id) return;

        try {
            await axios.delete(`${API_URL}/api/admin/users/${id}`);
            fetchUsers(currentPage, searchQuery);
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user. Please try again.");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0); // Reset to first page when searching
    };

    if (error) {
        return (
            <div className="alert alert-danger m-3" role="alert">
                {error}
            </div>
        );
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <img
                        src="https://vote-cast-backend-production-b22a.up.railway.app/images/icons8-vote-100.png"
                        alt="VoteCast Logo"
                        style={{height: "40px", marginRight: "10px"}}
                    />
                    <a className="navbar-brand fw-bold" href="#">VoteCast Admin</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href={`${API_URL}/admin`}>Users Management</a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-white fw-semibold border-0 bg-transparent"
                                        onClick={() => navigate("/admin/election-management")}>
                                    Election Management
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-white fw-semibold border-0 bg-transparent"
                                        onClick={() => navigate("/admin/candidate-management")}>
                                    Candidates Management
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-white fw-semibold border-0 bg-transparent"
                                        onClick={() => navigate("/admin/vote-management")}>
                                    Votes Management
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link text-white fw-semibold border-0 bg-transparent"
                                        onClick={() => navigate("/login")}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="hero d-flex align-items-center text-white"
                style={{ background: "linear-gradient(to bottom right, #007bff, #6610f2)", minHeight: "50vh" }}
            >
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
                    <p className="lead mb-0">Manage users, elections, and monitor voting progress effortlessly.</p>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-5 bg-light">
                <div className="container">
                    {/* Stats Section */}
                    <h2 className="text-center fw-bold mb-4">Dashboard Overview</h2>
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text display-4 text-primary">
                                        {isLoading ? "Loading..." : users.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title">User Roles</h5>
                                    <canvas id="roleChart" width="400" height="200"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4 text-center">
                        <input
                            type="text"
                            className="form-control w-50 mx-auto"
                            placeholder="Search users by name or email"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    {/* User Table */}
                    <h3 className="text-center fw-bold mb-4">Manage Users</h3>
                    <button
                        className="btn btn-primary mb-4"
                        onClick={() => navigate("/admin/add-user")}
                    >
                        Add New User
                    </button>

                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user.id)}
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

                    {/* Pagination */}
                    <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
}

export default AdminDashboard;