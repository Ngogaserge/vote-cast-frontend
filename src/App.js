import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import VoterPage from './components/VoterPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AddUserPage from './components/AddUserPage';
import EditUserPage from './components/EditUserPage';
import SearchUser from './components/searchUser';
import UploadUser from './components/Upload';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Multi-language support imports
import './i18n';
import Elections from "./components/Elections";
import ElectionManagement from "./components/Footer";
import CandidateManagement from "./components/CandidateManagement";
import VotesManagement from "./components/VotesManagement"; // Import Candidate Management page

function App() {
    const [user, setUser] = useState(null); // Store logged-in user details
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    // Restore user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false); // Set loading to false after restoring the user
    }, []);

    const handleLogin = (userData, token) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token); // Save the token here
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    if (isLoading) {
        // Show a loading spinner or placeholder while restoring user
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Role-based protected routes */}
                <Route
                    path="/voter"
                    element={
                        user?.role === 'ROLE_USER' ? (
                            <VoterPage />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                <Route
                    path="/admin"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <AdminPage />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                <Route
                    path="/admin/add-user"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <AddUserPage />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                <Route
                    path="/admin/edit-user/:id"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <EditUserPage />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                {/* Search User Route */}
                <Route
                    path="/admin/search-user"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <SearchUser />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                {/* Upload User Route */}
                <Route
                    path="/admin/upload-users"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <UploadUser />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />
                {/* Candidate Management Route */}
                <Route
                    path="/admin/candidate-management"
                    element={
                        user?.role === 'ROLE_ADMIN' ? (
                            <CandidateManagement />
                        ) : (
                            <Navigate to="/login" replace={true} />
                        )
                    }
                />

                {/* Election Management Route */}
                <Route path="/admin/election-management" element={<Elections />} />

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/login" replace={true} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin/vote-management" element={<VotesManagement />} />

            </Routes>
        </Router>
    );
}

export default App;
