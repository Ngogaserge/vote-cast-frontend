import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import Masonry from "react-masonry-css";
import "./ElectionManagement.css";

const VotesManagement = () => {
    const [elections, setElections] = useState([]);
    const [votes, setVotes] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log("Elections:", elections);
        fetchElections();
        fetchVotes();
        fetchCandidates();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/elections`);
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    const fetchVotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/votes`);
            setVotes(response.data);
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/candidates`);
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    };

    const announceWinner = async (electionId, email) => {
        console.log(`Announcing winner for Election ID: ${electionId}`);
        try {
            const response = await axios.post(`${API_URL}/api/elections/${electionId}/announce-winner`, null, {
                params: { email }
            });
            alert(response.data);
        } catch (error) {
            console.error("There was an error announcing the winner!", error);
        }
    };


    const calculateResults = (electionId) => {
        const electionVotes = votes.filter(
            (vote) => vote.candidate?.election?.electionId === electionId
        );

        const totalVotes = electionVotes.length;

        return candidates
            .filter((candidate) => candidate.election?.electionId === electionId)
            .map((candidate) => {
                const candidateVotes = electionVotes.filter(
                    (vote) => vote.candidate.candidateId === candidate.candidateId
                ).length;

                const percentage = totalVotes ? ((candidateVotes / totalVotes) * 100).toFixed(2) : 0;

                return {
                    candidate,
                    votes: candidateVotes,
                    percentage,
                };
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <img
                        src="https://vote-cast-backend-production-b22a.up.railway.app/images/icons8-vote-100.png"
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
                                   style={{cursor: "pointer"}}>Users Management</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="/admin/election-management"
                                   style={{cursor: "pointer"}}>Election Management</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="/admin/candidate-management" style={{ cursor: "pointer" }}>Candidates Management</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="/admin/vote-management" style={{ cursor: "pointer" }}>Votes Management</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="/login" style={{ cursor: "pointer" }}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero text-white text-center py-5">
                <div className="container">
                    <h1>Vote Management</h1>
                    <p className="lead">View results and statistics for each election.</p>
                </div>
            </header>

            {/* Results Section */}
            <div className="container my-5">
                {elections.map((election) => {
                    const results = calculateResults(election.electionId);

                    return (
                        <div>
                            <h2>Testing Button Rendering</h2>
                            {elections.length > 0 ? (
                                elections.map((election) => (
                                    <div key={election.electionId}>
                                        <h3>{election.electionName}</h3>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => announceWinner(election.electionId, "sergengoga05@gmail.com")}
                                        >
                                            Announce Winner
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No elections available. Check your backend API response.</p>
                            )}
                        </div>


                    );
                })}
            </div>
        </>
    );
};

export default VotesManagement;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card } from "react-bootstrap";
// import Masonry from "react-masonry-css";
// import "./ElectionManagement.css";
//
// const VotesManagement = () => {
//     const [elections, setElections] = useState([]);
//     const [votes, setVotes] = useState([]);
//     const [candidates, setCandidates] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         fetchElections();
//         fetchVotes();
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
//     const fetchVotes = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/votes");
//             setVotes(response.data);
//         } catch (error) {
//             console.error("Error fetching votes:", error);
//         }
//     };
//
//     const fetchCandidates = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/candidates");
//             setCandidates(response.data);
//         } catch (error) {
//             console.error("Error fetching candidates:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const calculateResults = (electionId) => {
//         const electionVotes = votes.filter(
//             (vote) => vote.candidate?.election?.electionId === electionId
//         );
//
//         const totalVotes = electionVotes.length;
//
//         return candidates
//             .filter((candidate) => candidate.election?.electionId === electionId)
//             .map((candidate) => {
//                 const candidateVotes = electionVotes.filter(
//                     (vote) => vote.candidate.candidateId === candidate.candidateId
//                 ).length;
//
//                 const percentage = totalVotes ? ((candidateVotes / totalVotes) * 100).toFixed(2) : 0;
//
//                 return {
//                     candidate,
//                     votes: candidateVotes,
//                     percentage,
//                 };
//             });
//     };
//
//     if (loading) return <div>Loading...</div>;
//
//     return (
//         <>
//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
//                 <div className="container">
//                     <img
//                         src="http://localhost:8080/images/icons8-vote-100.png"
//                         alt="VoteCast Logo"
//                         style={{ height: "40px", marginRight: "10px" }}
//                     />
//                     <a className="navbar-brand fw-bold" href="http://localhost:3000/admin">VoteCast Admin</a>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarNav"
//                         aria-controls="navbarNav"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href="http://localhost:3000/admin"
//                                    style={{cursor: "pointer"}}>Users Management</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href="/admin/election-management"
//                                    style={{cursor: "pointer"}}>Election Management</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href="/admin/candidate-management" style={{ cursor: "pointer" }}>Candidates Management</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href="/admin/vote-management" style={{ cursor: "pointer" }}>Votes Management</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link text-white fw-semibold" href="/login" style={{ cursor: "pointer" }}>Logout</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//
//             {/* Hero Section */}
//             <header className="hero text-white text-center py-5">
//                 <div className="container">
//                     <h1>Vote Management</h1>
//                     <p className="lead">View results and statistics for each election.</p>
//                 </div>
//             </header>
//
//             {/* Results Section */}
//             <div className="container my-5">
//                 {elections.map((election) => {
//                     const results = calculateResults(election.electionId);
//
//                     return (
//                         <div key={election.electionId} className="mb-5">
//                             <h3 className="text-center">{election.electionName}</h3>
//                             <Masonry
//                                 breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
//                                 className="masonry-grid"
//                                 columnClassName="masonry-grid_column"
//                             >
//                                 {results.map(({ candidate, votes, percentage }) => (
//                                     <Card key={candidate.candidateId} className="election-card">
//                                         <Card.Img
//                                             variant="top"
//                                             src={candidate.image || "http://via.placeholder.com/150"}
//                                             alt={candidate.fullName}
//                                         />
//                                         <Card.Body>
//                                             <Card.Title>{candidate.fullName}</Card.Title>
//                                             <Card.Text>
//                                                 <strong>Votes:</strong> {votes} <br />
//                                                 <strong>Percentage:</strong> {percentage}%
//                                             </Card.Text>
//                                         </Card.Body>
//                                     </Card>
//                                 ))}
//                             </Masonry>
//                         </div>
//                     );
//                 })}
//             </div>
//         </>
//     );
// };
//
// export default VotesManagement;