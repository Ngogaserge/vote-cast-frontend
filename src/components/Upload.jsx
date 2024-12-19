import React, { useState } from "react";
import axios from "axios";

function UploadUser() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/admin/upload/users",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setMessage("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            setMessage("Failed to upload user data. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center" style={{ color: "#333" }}>
                Upload User Data
            </h1>

            {/* Upload Form */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h3>Upload User CSV File</h3>
                    <form onSubmit={handleUpload} encType="multipart/form-data" className="mt-4">
                        <div className="form-group">
                            <label htmlFor="userFile">Select User CSV file:</label>
                            <input
                                type="file"
                                id="userFile"
                                name="file"
                                accept=".csv"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-secondary" disabled={uploading}>
                                {uploading ? "Uploading..." : "Upload Users"}
                            </button>
                        </div>
                    </form>

                    {/* Message Section */}
                    {message && (
                        <div className="message mt-4 alert alert-info text-center">
                            <p>{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UploadUser;
