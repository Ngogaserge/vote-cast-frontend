import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null); // For success/error messages
    const [isSending, setIsSending] = useState(false); // Track sending state

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true); // Disable button while sending request

        try {
            const response = await axios.post(
                `http://localhost:8080/api/auth/forgot-password?email=${email}`
            );
            setMessage({ type: "success", text: response.data }); // Successful response
        } catch (error) {
            // Check if error.response exists and extract the message or fallback to a generic error
            const errorMessage =
                error.response?.data?.message || "An unexpected error occurred.";
            setMessage({ type: "error", text: errorMessage });
        } finally {
            setIsSending(false); // Re-enable button after request completes
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm mt-5">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Forgot Password</h2>

                            {/* Display message if present */}
                            {message && (
                                <div
                                    className={`alert ${message.type === "success" ? "alert-info" : "alert-danger"} text-center`}
                                >
                                    {message.text}
                                </div>
                            )}

                            {/* Forgot Password Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg shadow-sm"
                                        disabled={isSending} // Disable button while sending
                                    >
                                        {isSending ? "Sending..." : "Send Reset Link"}
                                    </button>
                                </div>
                            </form>

                            {/* Back to Login link */}
                            <div className="text-center mt-3">
                                <span>
                                    Remembered your password? <a href="/login">Log in here</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
