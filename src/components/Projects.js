import React from 'react';
import '../styles/Projects.css';

function Projects() {
  const projects = [
    { title: 'Project 1', desc: 'A responsive website built with React.' },
    { title: 'Project 2', desc: 'Interactive animations using CSS and JS.' },
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((proj, index) => (
          <div key={index} className="project-card">
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;