
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import demoImage1 from "../assets/images.png";
import demoImage2 from "../assets/images1.jpg";
import demoImage3 from "../assets/images2.jpg";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white">
        <div className="container text-center" data-aos="fade-up">
          <h1 className="display-4 fw-bold">Welcome to Teamsphere</h1>
          <p className="lead mt-3">
            Streamline project planning, collaboration, and execution with our smart project management platform.
          </p>
          <a href="/login" className="btn btn-light btn-lg mt-4">
            Get Started
          </a>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section py-5 bg-light" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4">See Teamsphere in Action</h2>
          <p className="mb-4">Experience how you can manage projects and boost productivity with just a few clicks.</p>

          <div className="row justify-content-center">
            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <img
                src={demoImage1}
                alt="Dashboard View"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <img
                src={demoImage2}
                alt="Team Collaboration"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <img
                src={demoImage3}
                alt="Project Analytics"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-down">Why Choose Teamsphere?</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4" data-aos="zoom-in-up">
              <i className="bi bi-kanban fs-1 text-primary"></i>
              <h5 className="mt-3">Task Management</h5>
              <p>Organize tasks efficiently with Kanban boards and track progress in real time.</p>
            </div>
            <div className="col-md-4 text-center mb-4" data-aos="zoom-in-up" data-aos-delay="200">
              <i className="bi bi-people fs-1 text-success"></i>
              <h5 className="mt-3">Team Collaboration</h5>
              <p>Keep everyone in sync with shared boards, messaging, and notifications.</p>
            </div>
            <div className="col-md-4 text-center mb-4" data-aos="zoom-in-up" data-aos-delay="400">
              <i className="bi bi-bar-chart-line fs-1 text-danger"></i>
              <h5 className="mt-3">Analytics & Reports</h5>
              <p>Gain insights with performance dashboards, project health, and reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-4 bg-primary text-white text-center" data-aos="fade-up">
        <div className="container">
          <h2>Ready to boost your team's productivity?</h2>
          <p className="mt-2">Start using Teamsphere today. It's fast, flexible, and built for growing teams.</p>
          <a href="/register-admin" className="btn btn-light mt-3">Create Your Account</a>
        </div>
      </section>

      {/* Employee Reviews Section */}
      <section className="reviews-section py-5 bg-white" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center mb-5">What Our Team Says</h2>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[
              {
                name: "Jane Doe",
                review: "Teamsphere has completely transformed the way we collaborate and manage tasks. It's intuitive and powerful!",
                stars: 5,
              },
              {
                name: "John Smith",
                review: "The real-time dashboards and reports help me make quick decisions. It's a game-changer.",
                stars: 4,
              },
              {
                name: "Aisha Khan",
                review: "Easy to use and very collaborative! Teamsphere keeps our remote teams connected and focused.",
                stars: 5,
              },
              {
                name: "Priya Verma",
                review: "I love how clean and user-friendly the UI is. It makes project tracking enjoyable!",
                stars: 4,
              },
             
            ].map((user, index) => (
              <div className="card" style={{ width: "18rem" }} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="card-body text-center">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text fst-italic">"{user.review}"</p>
                  <span className="text-warning">{"\u2B50".repeat(user.stars)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
