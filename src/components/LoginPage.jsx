import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post(
                `http://localhost:8080/api/users/login?username=${username}&password=${password}`
            );
            const userData = response.data;
            console.log("User data from backend:", userData);

            onLogin(userData);
            sessionStorage.setItem('user', JSON.stringify(userData));
            const user1 = JSON.parse(sessionStorage.getItem('user'));
            // alert(user1);
            alert(user1.userId);
            console.log('User logged in:', userData);

            if (userData.role === "ROLE_USER") {
                navigate("/voter");
            } else if (userData.role === "ROLE_ADMIN") {
                navigate("/admin");
            } else {
                alert("Unexpected role. Please contact support.");
            }
        } catch (error) {
            console.error("Login error:", error.response || error.message);
            setErrorMessage("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Login</h2>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="alert alert-danger">{errorMessage}</div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleLogin}>
                                {/* Username */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="form-control"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </button>
                                </div>
                            </form>

                            {/* Additional Links */}
                            <div className="text-center mt-3">
                                <p>
                                    <a href="/register">Don't have an account? Register here</a>
                                </p>
                                <p>
                                    <a href="/forgot-password">Forgot Password?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
