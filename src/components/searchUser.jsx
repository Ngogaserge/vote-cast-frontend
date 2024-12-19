import React, { useState } from "react";
import axios from "axios";

function SearchUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get("http://localhost:8080/api/admin/users/search", {
                params: { username, email },
            });

            setSearchResults(response.data);
            setErrorMessage("");
        } catch (error) {
            console.error("Error searching for users:", error);
            setErrorMessage("Unable to fetch search results. Please try again.");
            setSearchResults([]);
        }

        setHasSearched(true);
    };

    return (
        <div className="container mt-5">
            {/* Search Form */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h4 className="mb-3 text-center" style={{ color: "#333" }}>
                        Search User
                    </h4>
                    <form onSubmit={handleSearch}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Search Results Section */}
            <div className="mt-4">
                {errorMessage && (
                    <div className="alert alert-danger text-center">{errorMessage}</div>
                )}

                {searchResults.length > 0 && (
                    <div className="table-responsive mt-3">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr style={{ backgroundColor: "#f8f9fa" }}>
                                <th>Username</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchResults.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {hasSearched && searchResults.length === 0 && !errorMessage && (
                    <div className="text-center mt-3" style={{ color: "#555" }}>
                        <p>No results found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchUser;
