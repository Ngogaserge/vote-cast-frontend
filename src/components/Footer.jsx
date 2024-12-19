import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";

const ElectionManagement = () => {
    const [elections, setElections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'create' or 'edit'
    const [currentElection, setCurrentElection] = useState({
        electionName: "",
        electionDescription: "",
        image: "",
        electionStartDate: "",
        electionEndDate: "",
        electionTime: "",
        electionStatus: false,
    });

    // Fetch elections
    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/elections");
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentElection({
            ...currentElection,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Open modal for create/edit
    const openModal = (type, election = null) => {
        setModalType(type);
        setShowModal(true);
        setCurrentElection(
            election || {
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

    // Save election
    const saveElection = async () => {
        try {
            if (modalType === "create") {
                await axios.post("http://localhost:8080/api/elections", currentElection);
            } else if (modalType === "edit") {
                await axios.put(`http://localhost:8080/api/elections/${currentElection.electionId}`, currentElection);
            }
            setShowModal(false);
            fetchElections();
        } catch (error) {
            console.error("Error saving election:", error);
        }
    };

    // Delete election
    const deleteElection = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/elections/${id}`);
            fetchElections();
        } catch (error) {
            console.error("Error deleting election:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Election Management</h2>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={() => openModal("create")} variant="primary">
                    Add New Election
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {elections.map((election) => (
                    <tr key={election.electionId}>
                        <td>{election.electionName}</td>
                        <td>{election.electionDescription}</td>
                        <td>{election.electionStartDate}</td>
                        <td>{election.electionEndDate}</td>
                        <td>{election.electionStatus ? "Active" : "Inactive"}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Modal for Create/Edit Election */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "create" ? "Create Election" : "Edit Election"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Election Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="electionName"
                                value={currentElection.electionName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="electionDescription"
                                value={currentElection.electionDescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={currentElection.image}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="electionStartDate"
                                value={currentElection.electionStartDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="electionEndDate"
                                value={currentElection.electionEndDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="text"
                                name="electionTime"
                                value={currentElection.electionTime}
                                onChange={handleChange}
                            />
                        </Form.Group>
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
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ElectionManagement;
