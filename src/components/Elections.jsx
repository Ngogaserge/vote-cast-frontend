import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Modal, Form, Dropdown } from "react-bootstrap";
import Masonry from "react-masonry-css";
import "./ElectionManagement.css";
import { useNavigate } from "react-router-dom";

const ElectionManagement = () => {
    const [elections, setElections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'create' or 'edit'
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [currentElection, setCurrentElection] = useState({
        electionId: "",
        electionName: "",
        electionDescription: "",
        image: "",
        electionStartDate: "",
        electionEndDate: "",
        electionTime: "",
        electionStatus: false,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Fetch elections on mount
    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/elections`);
            if (Array.isArray(response.data)) {
                setElections(response.data);
            } else {
                console.error("Unexpected data format:", response.data);
                setElections([]);
            }
        } catch (error) {
            console.error("Error fetching elections:", error);
            setElections([]);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentElection({
            ...currentElection,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const openModal = (type, election = null) => {
        setModalType(type);
        setShowModal(true);
        setCurrentElection(
            election || {
                electionId: "",
                electionName: "",
                electionDescription: "",
                image: "",
                electionStartDate: "",
                electionEndDate: "",
                electionTime: "",
                electionStatus: false,
            }
        );
    };

    const saveElection = async () => {
        try {
            if (modalType === "create") {
                await axios.post(`${API_URL}/api/elections`, currentElection);
            } else if (modalType === "edit") {
                await axios.put(
                    `${API_URL}/api/elections/${currentElection.electionId}`,
                    currentElection
                );
            }
            setShowModal(false);
            fetchElections();
        } catch (error) {
            console.error("Error saving election:", error);
        }
    };

    const deleteElection = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/elections/${id}`);
            fetchElections();
        } catch (error) {
            console.error("Error deleting election:", error);
        }
    };

    const filteredElections = elections.filter((election) => {
        const matchesSearch = election.electionName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === "All" ||
            (filterStatus === "Active" && election.electionStatus) ||
            (filterStatus === "Inactive" && !election.electionStatus);

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <img
                        src={`${API_URL}/images/icons8-vote-100.png`}
                        alt="VoteCast Logo"
                        style={{height: "40px", marginRight: "10px"}}
                    />

                    <a className="navbar-brand fw-bold" href={`${API_URL}/admin`}>VoteCast Admin</a>

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
                                <a className="nav-link text-white fw-semibold" href={`${API_URL}/admin`}
                                   style={{ cursor: "pointer" }}>Users Management</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold"
                                   onClick={() => navigate("/admin/election-management")} style={{ cursor: "pointer" }}>
                                    Election Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold"
                                   onClick={() => navigate("/admin/candidate-management")} style={{ cursor: "pointer" }}>
                                    Candidates Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold"
                                   onClick={() => navigate("/admin/vote-management")} style={{ cursor: "pointer" }}>
                                    Votes Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" onClick={() => navigate("/login")}
                                   style={{ cursor: "pointer" }}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero text-white text-center py-5">
                <div className="container">
                    <h1>Election Management</h1>
                    <p className="lead">Manage elections effectively and effortlessly.</p>
                </div>
            </header>

            {/* Search and Filter */}
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center">
                    <Button onClick={() => openModal("create")} variant="primary">
                        Add New Election
                    </Button>
                    <div className="d-flex gap-3">
                        <Form.Control
                            type="text"
                            placeholder="Search elections..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-auto"
                        />
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                Filter: {filterStatus}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setFilterStatus("All")}>
                                    All
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterStatus("Active")}>
                                    Active
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setFilterStatus("Inactive")}>
                                    Inactive
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Masonry Cards */}
            <div className="container">
                <Masonry
                    breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {filteredElections.map((election) => (
                        <Card key={election.electionId} className="election-card">
                            <Card.Img
                                variant="top"
                                src={`${API_URL}/images/${election.image || "placeholder.png"}`}
                                alt={election.electionName}
                                onError={(e) => (e.target.src = "http://via.placeholder.com/150")}
                            />
                            <Card.Body>
                                <Card.Title>{election.electionName}</Card.Title>
                                <Card.Text>{election.electionDescription}</Card.Text>
                                <Card.Text>
                                    <strong>Start:</strong> {election.electionStartDate} <br />
                                    <strong>End:</strong> {election.electionEndDate}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="warning"
                                        onClick={() => openModal("edit", election)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteElection(election.electionId)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Masonry>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "create" ? "Create Election" : "Edit Election"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Election Name */}
                        <Form.Group className="mb-3">
                            <Form.Label>Election Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="electionName"
                                value={currentElection.electionName}
                                onChange={handleChange}
                                placeholder="Enter election name"
                                required
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="electionDescription"
                                value={currentElection.electionDescription}
                                onChange={handleChange}
                                placeholder="Enter description"
                                required
                            />
                        </Form.Group>

                         Image
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setCurrentElection({
                                            ...currentElection,
                                            image: file.name,
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                         Image URL
                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label>Image URL</Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        name="image"*/}
                        {/*        value={currentElection.image}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        placeholder="Enter image URL (e.g., http://localhost:8080/images/placeholder.png)"*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}


                        {/* Start Date */}
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="electionStartDate"
                                value={currentElection.electionStartDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* End Date */}
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="electionEndDate"
                                value={currentElection.electionEndDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* Time */}
                        <Form.Group className="mb-3">
                            <Form.Label>Election Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="electionTime"
                                value={currentElection.electionTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Status */}
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Active"
                                name="electionStatus"
                                checked={currentElection.electionStatus}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveElection}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ElectionManagement;
