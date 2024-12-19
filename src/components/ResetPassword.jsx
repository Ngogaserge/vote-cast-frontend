import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Extract token from URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        alert(token);

        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/reset-password?token=${token}&newPassword=${newPassword}&confirmNewPassword=${confirmNewPassword}`, {
                token, // Include token in the request
                newPassword,
                confirmNewPassword,
            });
            setMessage(response.data.message || "Password reset successfully!"); // Assuming message is a string
        } catch (err) {
            // Extract meaningful error message
            const errorMessage =
                err.response?.data?.message || "An error occurred. Please try again.";
            setError(errorMessage);
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Reset Your Password</h2>
                            <form onSubmit={handleResetPassword}>
                                {/* New Password */}
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">
                                        New Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            className="form-control"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div className="mb-3">
                                    <label htmlFor="confirmNewPassword" className="form-label">
                                        Confirm New Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            id="confirmNewPassword"
                                            className="form-control"
                                            placeholder="Confirm new password"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>
                            </form>

                            {/* Error and Success Messages */}
                            {error && (
                                <div className="alert alert-danger mt-3">{error}</div>
                            )}
                            {message && (
                                <div className="alert alert-success mt-3">{message}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
