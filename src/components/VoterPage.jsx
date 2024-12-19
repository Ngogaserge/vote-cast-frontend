// import React, { useState, useEffect } from "react";
// import { Button, Card, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
//
// function VoterPage() {
//     const [elections, setElections] = useState([]);
//     const [candidates, setCandidates] = useState([]);
//     const [selectedElection, setSelectedElection] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [votedCandidates, setVotedCandidates] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [candidateToVote, setCandidateToVote] = useState(null);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         fetchElections();
//         fetchCandidates();
//     }, []);
//
//     const fetchElections = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/elections");
//             setElections(response.data);
//         } catch (error) {
//             console.error("Error fetching elections:", error);
//         }
//     };
//
//     const fetchCandidates = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/candidates");
//             setCandidates(response.data);
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//         }
//     };
//
//     const handleVote = async (candidate) => {
//         const user = JSON.parse(sessionStorage.getItem("user"));
//         setLoading(true);
//         try {
//             const payload = {
//                 candidateId: candidate.candidateId,
//                 userId: user.userId,
//             };
//
//             await axios.post(`http://localhost:8080/api/votes`, payload, {
//                 headers: { "Content-Type": "application/json" },
//             });
//             setVotedCandidates([...votedCandidates, candidate.candidateId]);
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error casting vote:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const confirmVote = (candidate) => {
//         setCandidateToVote(candidate);
//         setShowModal(true);
//     };
//
//     const filteredCandidates = candidates.filter((candidate) => {
//         const matchesSearch = candidate.fullName
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase());
//         const matchesElection =
//             !selectedElection || candidate.election?.electionId.toString() === selectedElection;
//         return matchesSearch && matchesElection;
//     });
//
//     const handleLogout = () => {
//         sessionStorage.clear();
//         window.location.href = "/login"; // Redirect to login page
//     };
//
//     return (
//         <>
//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
//                 <div className="container d-flex justify-content-between align-items-center">
//                     <div className="d-flex align-items-center">
//                         <img
//                             src="http://localhost:8080/images/icons8-vote-100.png"
//                             alt="VoteCast Logo"
//                             style={{ height: "40px", marginRight: "10px" }}
//                         />
//                         <a className="navbar-brand fw-bold" href="#">
//                             VoteCast
//                         </a>
//                     </div>
//                     <Button variant="outline-light" onClick={handleLogout}>
//                         Logout
//                     </Button>
//                 </div>
//             </nav>
//
//             {/* Header Section */}
//             <header
//                 className="d-flex align-items-center text-white text-center"
//                 style={{
//                     background: "linear-gradient(to bottom right, #007bff, #6610f2)",
//                     minHeight: "50vh",
//                 }}
//             >
//                 <div className="container">
//                     <h1 className="display-4 fw-bold">Vote for Your Candidate</h1>
//                     <p className="lead">Secure. Transparent. Convenient.</p>
//                 </div>
//             </header>
//
//             {/* Filters */}
//             <section className="py-4 bg-light">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-6">
//                             <Form.Select
//                                 onChange={(e) => setSelectedElection(e.target.value)}
//                                 value={selectedElection}
//                                 className="form-select"
//                             >
//                                 <option value="">All Elections</option>
//                                 {elections.map((election) => (
//                                     <option key={election.electionId} value={election.electionId}>
//                                         {election.electionName}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </div>
//                         <div className="col-md-6">
//                             <InputGroup>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search candidates"
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="form-control"
//                                 />
//                             </InputGroup>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Candidate Cards */}
//             <section className="py-4">
//                 <div className="container">
//                     <div className="row g-4">
//                         {filteredCandidates.map((candidate) => (
//                             <div className="col-md-3" key={candidate.candidateId}>
//                                 <Card className="shadow-sm" style={{ maxWidth: "18rem" }}>
//                                     <Card.Img
//                                         variant="top"
//                                         src={candidate.image || "http://via.placeholder.com/150"}
//                                         alt={candidate.fullName}
//                                     />
//                                     <Card.Body className="text-center">
//                                         <Card.Title>{candidate.fullName}</Card.Title>
//                                         <Card.Text>
//                                             <strong>Party:</strong> {candidate.party}
//                                         </Card.Text>
//                                         <Card.Text>
//                                             <strong>Election:</strong>{" "}
//                                             {candidate.election?.electionName || "N/A"}
//                                         </Card.Text>
//                                         <Button
//                                             variant="primary"
//                                             disabled={votedCandidates.includes(candidate.candidateId)}
//                                             onClick={() => confirmVote(candidate)}
//                                         >
//                                             {votedCandidates.includes(candidate.candidateId)
//                                                 ? "Voted"
//                                                 : "Vote"}
//                                         </Button>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//
//             {/* Confirmation Modal */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Your Vote</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to vote for{" "}
//                     <strong>{candidateToVote?.fullName}</strong> in{" "}
//                     <strong>{candidateToVote?.election?.electionName}</strong>?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="success"
//                         onClick={() => handleVote(candidateToVote)}
//                         disabled={loading}
//                     >
//                         {loading ? <Spinner animation="border" size="sm" /> : "Confirm Vote"}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
//
// export default VoterPage;



//
// import React, { useState, useEffect } from "react";
// import { Button, Card, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
//
// function VoterPage() {
//     const [elections, setElections] = useState([]);
//     const [candidates, setCandidates] = useState([]);
//     const [selectedElection, setSelectedElection] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [votedCandidates, setVotedCandidates] = useState([]);
//     const [votedElections, setVotedElections] = useState(new Set()); // Track elections where votes were cast
//     const [showModal, setShowModal] = useState(false);
//     const [candidateToVote, setCandidateToVote] = useState(null);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         fetchElections();
//         fetchCandidates();
//         loadVotingState(); // Load voting state from localStorage
//     }, []);
//
//     const fetchElections = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/elections");
//             setElections(response.data);
//         } catch (error) {
//             console.error("Error fetching elections:", error);
//         }
//     };
//
//     const fetchCandidates = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/candidates");
//             setCandidates(response.data);
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//         }
//     };
//
//     const loadVotingState = () => {
//         const storedVotedCandidates = JSON.parse(localStorage.getItem("votedCandidates")) || [];
//         const storedVotedElections = new Set(
//             JSON.parse(localStorage.getItem("votedElections")) || []
//         );
//         setVotedCandidates(storedVotedCandidates);
//         setVotedElections(storedVotedElections);
//     };
//
//     const saveVotingState = (candidateId, electionId) => {
//         const updatedVotedCandidates = [...votedCandidates, candidateId];
//         const updatedVotedElections = new Set(votedElections);
//         updatedVotedElections.add(electionId);
//
//         localStorage.setItem("votedCandidates", JSON.stringify(updatedVotedCandidates));
//         localStorage.setItem("votedElections", JSON.stringify([...updatedVotedElections]));
//
//         setVotedCandidates(updatedVotedCandidates);
//         setVotedElections(updatedVotedElections);
//     };
//
//     const handleVote = async (candidate) => {
//         const user = JSON.parse(sessionStorage.getItem("user"));
//         setLoading(true);
//         try {
//             const payload = {
//                 candidateId: candidate.candidateId,
//                 userId: user.userId,
//             };
//
//             await axios.post(`http://localhost:8080/api/votes`, payload, {
//                 headers: { "Content-Type": "application/json" },
//             });
//             saveVotingState(candidate.candidateId, candidate.election.electionId); // Save voting state
//             setShowModal(false);
//         } catch (error) {
//             console.error("Error casting vote:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const confirmVote = (candidate) => {
//         setCandidateToVote(candidate);
//         setShowModal(true);
//     };
//
//     const filteredCandidates = candidates.filter((candidate) => {
//         const matchesSearch = candidate.fullName
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase());
//         const matchesElection =
//             !selectedElection || candidate.election?.electionId.toString() === selectedElection;
//         return matchesSearch && matchesElection;
//     });
//
//     const handleLogout = () => {
//         sessionStorage.clear();
//         window.location.href = "/login"; // Redirect to login page
//     };
//
//     return (
//         <>
//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
//                 <div className="container d-flex justify-content-between align-items-center">
//                     <div className="d-flex align-items-center">
//                         <img
//                             src="http://localhost:8080/images/icons8-vote-100.png"
//                             alt="VoteCast Logo"
//                             style={{ height: "40px", marginRight: "10px" }}
//                         />
//                         <a className="navbar-brand fw-bold" href="#">
//                             VoteCast
//                         </a>
//                     </div>
//                     <Button variant="outline-light" onClick={handleLogout}>
//                         Logout
//                     </Button>
//                 </div>
//             </nav>
//
//             {/* Header Section */}
//             <header
//                 className="d-flex align-items-center text-white text-center"
//                 style={{
//                     background: "linear-gradient(to bottom right, #007bff, #6610f2)",
//                     minHeight: "50vh",
//                 }}
//             >
//                 <div className="container">
//                     <h1 className="display-4 fw-bold">Vote for Your Candidate</h1>
//                     <p className="lead">Secure. Transparent. Convenient.</p>
//                 </div>
//             </header>
//
//             {/* Filters */}
//             <section className="py-4 bg-light">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-6">
//                             <Form.Select
//                                 onChange={(e) => setSelectedElection(e.target.value)}
//                                 value={selectedElection}
//                                 className="form-select"
//                             >
//                                 <option value="">All Elections</option>
//                                 {elections.map((election) => (
//                                     <option key={election.electionId} value={election.electionId}>
//                                         {election.electionName}
//                                     </option>
//                                 ))}
//                             </Form.Select>
//                         </div>
//                         <div className="col-md-6">
//                             <InputGroup>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search candidates"
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="form-control"
//                                 />
//                             </InputGroup>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* Candidate Cards */}
//             <section className="py-4">
//                 <div className="container">
//                     <div className="row g-4">
//                         {filteredCandidates.map((candidate) => (
//                             <div className="col-md-3" key={candidate.candidateId}>
//                                 <Card className="shadow-sm" style={{ maxWidth: "18rem" }}>
//                                     <Card.Img
//                                         variant="top"
//                                         src={candidate.image || "http://via.placeholder.com/150"}
//                                         alt={candidate.fullName}
//                                     />
//                                     <Card.Body className="text-center">
//                                         <Card.Title>{candidate.fullName}</Card.Title>
//                                         <Card.Text>
//                                             <strong>Party:</strong> {candidate.party}
//                                         </Card.Text>
//                                         <Card.Text>
//                                             <strong>Election:</strong>{" "}
//                                             {candidate.election?.electionName || "N/A"}
//                                         </Card.Text>
//                                         <Button
//                                             variant="primary"
//                                             disabled={
//                                                 votedCandidates.includes(candidate.candidateId) ||
//                                                 votedElections.has(candidate.election.electionId)
//                                             }
//                                             onClick={() => confirmVote(candidate)}
//                                         >
//                                             {votedCandidates.includes(candidate.candidateId)
//                                                 ? "Voted"
//                                                 : "Vote"}
//                                         </Button>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//
//             {/* Confirmation Modal */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Your Vote</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to vote for{" "}
//                     <strong>{candidateToVote?.fullName}</strong> in{" "}
//                     <strong>{candidateToVote?.election?.electionName}</strong>?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="success"
//                         onClick={() => handleVote(candidateToVote)}
//                         disabled={loading}
//                     >
//                         {loading ? <Spinner animation="border" size="sm" /> : "Confirm Vote"}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
//
// export default VoterPage;
//

import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function VoterPage() {
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedElection, setSelectedElection] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [votedCandidates, setVotedCandidates] = useState([]);
    const [votedElections, setVotedElections] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [candidateToVote, setCandidateToVote] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user")); // Logged-in user

    useEffect(() => {
        if (!user) {
            window.location.href = "/login"; // Redirect to login if no user is logged in
            return;
        }
        fetchElections();
        fetchCandidates();
        loadVotingState(); // Load voting state for the logged-in user
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/elections");
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/candidates");
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const loadVotingState = () => {
        const storedVotedCandidates = JSON.parse(
            localStorage.getItem(`votedCandidates_${user.userId}`)
        ) || [];
        const storedVotedElections = new Set(
            JSON.parse(localStorage.getItem(`votedElections_${user.userId}`)) || []
        );
        setVotedCandidates(storedVotedCandidates);
        setVotedElections(storedVotedElections);
    };

    const saveVotingState = (candidateId, electionId) => {
        const updatedVotedCandidates = [...votedCandidates, candidateId];
        const updatedVotedElections = new Set(votedElections);
        updatedVotedElections.add(electionId);

        localStorage.setItem(
            `votedCandidates_${user.userId}`,
            JSON.stringify(updatedVotedCandidates)
        );
        localStorage.setItem(
            `votedElections_${user.userId}`,
            JSON.stringify([...updatedVotedElections])
        );

        setVotedCandidates(updatedVotedCandidates);
        setVotedElections(updatedVotedElections);
    };

    const handleVote = async (candidate) => {
        setLoading(true);
        try {
            const payload = {
                candidateId: candidate.candidateId,
                userId: user.userId,
            };

            await axios.post(`http://localhost:8080/api/votes`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            saveVotingState(candidate.candidateId, candidate.election.electionId);
            setShowModal(false);
        } catch (error) {
            console.error("Error casting vote:", error);
        } finally {
            setLoading(false);
        }
    };

    const confirmVote = (candidate) => {
        setCandidateToVote(candidate);
        setShowModal(true);
    };

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch = candidate.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesElection =
            !selectedElection || candidate.election?.electionId.toString() === selectedElection;
        return matchesSearch && matchesElection;
    });

    const handleLogout = () => {
        sessionStorage.clear(); // Clear session storage
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img
                            src="http://localhost:8080/images/icons8-vote-100.png"
                            alt="VoteCast Logo"
                            style={{ height: "40px", marginRight: "10px" }}
                        />
                        <a className="navbar-brand fw-bold" href="#">
                            VoteCast
                        </a>
                    </div>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Header Section */}
            <header
                className="d-flex align-items-center text-white text-center"
                style={{
                    background: "linear-gradient(to bottom right, #007bff, #6610f2)",
                    minHeight: "50vh",
                }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold">Vote for Your Candidate</h1>
                    <p className="lead">Secure. Transparent. Convenient.</p>
                </div>
            </header>

            {/* Filters */}
            <section className="py-4 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Select
                                onChange={(e) => setSelectedElection(e.target.value)}
                                value={selectedElection}
                                className="form-select"
                            >
                                <option value="">All Elections</option>
                                {elections.map((election) => (
                                    <option key={election.electionId} value={election.electionId}>
                                        {election.electionName}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-md-6">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search candidates"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-control"
                                />
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </section>

            {/* Candidate Cards */}
            <section className="py-4">
                <div className="container">
                    <div className="row g-4">
                        {filteredCandidates.map((candidate) => (
                            <div className="col-md-3" key={candidate.candidateId}>
                                <Card className="shadow-sm" style={{ maxWidth: "18rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={candidate.image || "http://via.placeholder.com/150"}
                                        alt={candidate.fullName}
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title>{candidate.fullName}</Card.Title>
                                        <Card.Text>
                                            <strong>Party:</strong> {candidate.party}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Election:</strong>{" "}
                                            {candidate.election?.electionName || "N/A"}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            disabled={
                                                votedCandidates.includes(candidate.candidateId) ||
                                                votedElections.has(candidate.election.electionId)
                                            }
                                            onClick={() => confirmVote(candidate)}
                                        >
                                            {votedCandidates.includes(candidate.candidateId)
                                                ? "Voted"
                                                : "Vote"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Your Vote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to vote for{" "}
                    <strong>{candidateToVote?.fullName}</strong> in{" "}
                    <strong>{candidateToVote?.election?.electionName}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleVote(candidateToVote)}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Confirm Vote"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VoterPage;


