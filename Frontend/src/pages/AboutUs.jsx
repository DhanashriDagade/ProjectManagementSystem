import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import dhanashri from "../assets/dhanashridagade.jpeg";
import pradnya from "../assets/pradnyamore.jpeg";
import shubhada from "../assets/shubhadaaher.jpeg";
import aboutImage from "../assets/images1.jpg"; // Can be any banner-style image

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    {
        name: "Pradnya More",
      role: "Frontend Developer",
      description: "Expert in React, Vite, and building modern UIs with Bootstrap and responsive design.",
     image: pradnya,
    },
    {
      name: "Dhanashri Dagade",
      role: "Backend Developer",
      description: "Specializes in Spring Boot, REST APIs, database design, and secure authentication.",
       image: dhanashri,
    },
    {
      name: "Shubhada Aaher",
      role: "UI/UX Designer",
      description: "Focused on intuitive UX, wireframes, and modern design aesthetics for seamless user experience.",
      image: shubhada,
    },
  ];

  return (
    <>
      <Navbar />

     <section
  className="hero-section d-flex align-items-center text-white"
  style={{
    backgroundImage: `url("https://t3.ftcdn.net/jpg/02/81/97/02/360_F_281970265_KR6Ey4XF3miLYq0QDp3WsH0m35MR2tGC.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    minHeight: "60vh"
  }}
>
        <div className="container text-center" data-aos="fade-down">
          <h1 className="display-4 fw-bold " style={{color: "#f3e872"}} >About Teamsphere</h1>
          <p className="lead mt-3 ">
            Empowering teams through smart project planning, collaboration, and innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6" data-aos="fade-right">
              <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Mission" style={{ width: "80px" }} />
              <h3 className="mt-3">Our Mission</h3>
              <p>
                To simplify project workflows with innovative tools that drive productivity, collaboration, and clarity.
              </p>
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <img src="https://cdn-icons-png.flaticon.com/512/4359/4359963.png" alt="Vision" style={{ width: "80px" }} />
              <h3 className="mt-3">Our Vision</h3>
              <p>
                To be the leading project management platform that evolves with modern teams and growing businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-5" data-aos="fade-down">What Makes Us Unique</h2>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <i className="bi bi-kanban fs-1 text-primary"></i>
              <h5 className="mt-3">Task Simplification</h5>
              <p>We break down complex processes into simple steps for better execution and tracking.</p>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <i className="bi bi-lightning fs-1 text-warning"></i>
              <h5 className="mt-3">Rapid Collaboration</h5>
              <p>Real-time updates and easy communication help teams move fast and stay on track.</p>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <i className="bi bi-check2-circle fs-1 text-success"></i>
              <h5 className="mt-3">Reliable Delivery</h5>
              <p>We help ensure on-time delivery with planning tools and smart notifications.</p>
            </div>
          </div>
          
        </div>
        <section className="py-5 bg-secondary text-white text-center" data-aos="fade-up">
             <p className="mt-2">Driven by innovation and passion, our team crafts powerful project management solutions that transform how work gets done. We believe every project deserves clarity, collaboration, and control — so we build tools that inspire productivity, spark teamwork, and make deadlines feel effortless. From seamless task tracking to real-time insights, our platform empowers teams to break down barriers, unleash creativity, and deliver
           outstanding results — because great projects start with great people and the right technology.</p>
        </section>
      </section>

      {/* Meet the Team */}
    <section className="py-5 bg-light" data-aos="fade-up">
  <div className="container text-center">
    <h2 className="mb-5">Meet Our Team</h2>
    <div className="row justify-content-center">
      {teamMembers.map((member, index) => (
        <div
          className="col-md-4 mb-4"
          key={index}
          data-aos="zoom-in"
          data-aos-delay={index * 200}
        >
          <div
            className="card h-100 shadow border-0 rounded-4"
            style={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <div className="d-flex justify-content-center mt-4">
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #0d6efd",
                  boxShadow: "0 4px 8px rgba(13, 110, 253, 0.3)",
                }}
              />
            </div>
            <div className="card-body text-center">
              <h5 className="card-title fw-bold">{member.name}</h5>
              <p
                className="text-primary fst-italic mb-2"
                style={{ fontWeight: "600" }}
              >
                {member.role}
              </p>
              <p className="card-text fst-italic text-secondary">
                {member.description}
              </p>
            </div>
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
