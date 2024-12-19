import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./HomePage.css";

const HomePage = () => {
    const features = [
        {
            icon: "fa-shield-alt",
            title: "Secure & Encrypted",
            text: "VoteCast ensures your vote is confidential and secure using top-tier encryption technology.",
        },
        {
            icon: "fa-users",
            title: "User-Friendly",
            text: "Simplified design makes voting accessible and intuitive for all users.",
        },
        {
            icon: "fa-chart-line",
            title: "Real-Time Results",
            text: "Monitor live election results with complete transparency.",
        },
        {
            icon: "fa-mobile-alt",
            title: "Mobile-Optimized",
            text: "Vote seamlessly from any device, be it a desktop, tablet, or smartphone.",
        },
        {
            icon: "fa-clock",
            title: "24/7 Accessibility",
            text: "Cast your vote at any time with a system available round the clock.",
        },
        {
            icon: "fa-leaf",
            title: "Environmental Impact",
            text: "A paperless, eco-friendly voting solution that contributes to sustainability.",
        },
    ];

    const steps = [
        {
            icon: "fa-user-plus",
            title: "Sign Up",
            text: "Create your VoteCast account to participate in online elections.",
        },
        {
            icon: "fa-id-card",
            title: "Verify Identity",
            text: "Securely verify your identity to ensure voting eligibility.",
        },
        {
            icon: "fa-envelope",
            title: "Receive Confirmation",
            text: "Get an email confirmation with voting instructions and updates.",
        },
        {
            icon: "fa-check-circle",
            title: "Cast Your Vote",
            text: "Choose your candidates and submit your vote securely.",
        },
        {
            icon: "fa-poll",
            title: "Track Election Progress",
            text: "Follow live election updates and view results in real-time.",
        },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <img
                        src="http://localhost:8080/images/icons8-vote-100.png"
                        alt="VoteCast Logo"
                        style={{height: "40px", marginRight: "10px"}}
                    />
                    <a className="navbar-brand fw-bold" href="#">VoteCast</a>
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
                                <a className="nav-link text-white fw-semibold" href="#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="#how-it-works">How It Works</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-white fw-semibold"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Learn More
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#about">About Us</a></li>
                                    <li><a className="dropdown-item" href="#faq">FAQs</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white fw-semibold" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-light text-primary px-3 ms-2" href="/register">Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="hero d-flex align-items-center text-white"
                style={{
                    background: "linear-gradient(to bottom right, #007bff, #6610f2)",
                    minHeight: "90vh",
                }}
            >
                <div className="container text-center">
                    <h1 className="display-3 fw-bold mb-4">Empowering Your Voice</h1>
                    <p className="lead mb-5">
                        Your vote matters. With VoteCast, you can participate in secure, transparent, and convenient online elections from anywhere.
                    </p>
                    <a href="/register" className="btn btn-light btn-lg shadow-sm me-3">Get Started</a>
                    <a href="#how-it-works" className="btn btn-outline-light btn-lg shadow-sm">Learn How</a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Why Choose VoteSmart?</h2>
                        <p className="text-muted">The features that make us the most reliable online voting solution.</p>
                    </div>
                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <i className={`fas ${feature.icon} fa-3x text-primary mb-3`}></i>
                                        <h5 className="card-title">{feature.title}</h5>
                                        <p className="card-text">{feature.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">How It Works</h2>
                        <p className="text-muted">Participate in elections in just a few simple steps.</p>
                    </div>
                    <div className="row g-4">
                        {steps.map((step, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <i className={`fas ${step.icon} fa-3x text-primary mb-3`}></i>
                                        <h5 className="card-title">{step.title}</h5>
                                        <p className="card-text">{step.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-5 text-white"
                style={{
                    background: "linear-gradient(to bottom, #007bff, #6610f2)",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>VoteCast</h5>
                            <p>
                                Revolutionizing democracy with a secure, transparent, and accessible online voting platform.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#features" className="text-white text-decoration-none">Features</a>
                                </li>
                                <li>
                                    <a href="#how-it-works" className="text-white text-decoration-none">How It Works</a>
                                </li>
                                <li>
                                    <a href="/register" className="text-white text-decoration-none">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact Us</h5>
                            <form>
                                <div className="mb-3">
                                    <input type="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" placeholder="Your Message" rows="3"></textarea>
                                </div>
                                <button className="btn btn-light text-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <p>&copy; 2024 VoteCast. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default HomePage;
