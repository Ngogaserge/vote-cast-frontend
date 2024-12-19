import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Modal, Form, InputGroup, Dropdown } from "react-bootstrap";

function CandidateManagement() {
    const [candidates, setCandidates] = useState([]);
    const [elections, setElections] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedElection, setSelectedElection] = useState("");
    const [selectedParty, setSelectedParty] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        party: "",
        electionId: "",
        image: "",
    });
    const navigate = useNavigate();

    // Fetch candidates and elections on component mount
    useEffect(() => {
        fetchCandidates();
        fetchElections();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/candidates");
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const fetchElections = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/elections");
            if (Array.isArray(response.data)) {
                setElections(response.data);
            } else {
                setElections([]);
            }
        } catch (error) {
            console.error("Error fetching elections:", error);
            setElections([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const payload = {
                fullName: formData.fullName,
                party: formData.party,
                election: { electionId: formData.electionId },
                image: formData.image,
            };

            if (currentCandidate) {
                await axios.put(
                    `http://localhost:8080/api/candidates/${currentCandidate.candidateId}`,
                    payload
                );
            } else {
                await axios.post(
                    `http://localhost:8080/api/candidates/election/${formData.electionId}`,
                    payload
                );
            }

            setShowModal(false);
            fetchCandidates();
        } catch (error) {
            console.error("Error saving candidate:", error);
        }
    };

    const handleDelete = async (candidateId) => {
        try {
            await axios.delete(`http://localhost:8080/api/candidates/${candidateId}`);
            fetchCandidates();
        } catch (error) {
            console.error("Error deleting candidate:", error);
        }
    };

    const openModal = (candidate = null) => {
        setCurrentCandidate(candidate);
        setFormData(
            candidate
                ? {
                    fullName: candidate.fullName,
                    party: candidate.party,
                    electionId: candidate.election?.electionId || "",
                    image: candidate.image || "",
                }
                : { fullName: "", party: "", electionId: "", image: "" }
        );
        setShowModal(true);
    };

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.party.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesElection =
            !selectedElection || candidate.election?.electionId === selectedElection;

        const matchesParty = !selectedParty || candidate.party === selectedParty;

        return matchesSearch && matchesElection && matchesParty;
    });

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <img
                        src="http://localhost:8080/images/icons8-vote-100.png"
                        alt="VoteCast Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                    <a className="navbar-brand fw-bold" href="http://localhost:3000/admin">
                        VoteCast Admin
                    </a>
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
                                <a className="nav-link text-white fw-semibold" href="http://localhost:3000/admin"
                                   style={{cursor: "pointer"}}>Users Management</a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white fw-semibold"
                                    onClick={() => navigate("/admin/election-management")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Election Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white fw-semibold"
                                    onClick={() => navigate("/admin/candidate-management")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Candidates Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white fw-semibold"
                                    onClick={() => navigate("/admin/vote-management")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Votes Management
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-white fw-semibold"
                                    onClick={() => navigate("/login")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero text-white text-center py-5 bg-primary">
                <div className="container">
                    <h1>Candidate Management</h1>
                    <p className="lead">Manage candidates effectively and effortlessly.</p>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button variant="outline-primary" onClick={() => openModal()}>
                        Add New Candidate
                    </Button>
                    <InputGroup className="w-50">
                        <Form.Control
                            type="text"
                            placeholder="Search by name or party"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">Filter by Election</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedElection("")}>
                                All Elections
                            </Dropdown.Item>
                            {elections.map((election) => (
                                <Dropdown.Item
                                    key={election.electionId}
                                    onClick={() => setSelectedElection(election.electionId)}
                                >
                                    {election.electionName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">Filter by Party</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedParty("")}>
                                All Parties
                            </Dropdown.Item>
                            {Array.from(new Set(candidates.map((c) => c.party))).map((party) => (
                                <Dropdown.Item key={party} onClick={() => setSelectedParty(party)}>
                                    {party}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="row">
                    {filteredCandidates.map((candidate) => (
                        <div className="col-md-4 mb-4" key={candidate.candidateId}>
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={candidate.image || "http://via.placeholder.com/150"}
                                    alt={candidate.fullName}
                                />
                                <Card.Body>
                                    <Card.Title>{candidate.fullName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {candidate.party}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Election:</strong>{" "}
                                        {candidate.election?.electionName || "No Election"}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            variant="outline-warning"
                                            onClick={() => openModal(candidate)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => handleDelete(candidate.candidateId)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {currentCandidate ? "Edit Candidate" : "Add Candidate"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Party</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="party"
                                    value={formData.party}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Election</Form.Label>
                                <Form.Select
                                    name="electionId"
                                    value={formData.electionId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Election</option>
                                    {elections.map((election) => (
                                        <option
                                            key={election.electionId}
                                            value={election.electionId}
                                        >
                                            {election.electionName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default CandidateManagement;
