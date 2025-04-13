import React, { useState } from "react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Certificates = () => {
  const [showProjects, setShowProjects] = useState(true);

  const toggleProjects = () => {
    setShowProjects((prevShow) => !prevShow);
  };

  // Show only the first 3 projects if showProjects is false
  const visibleProjects = showProjects ? projects : projects.slice(0, 3);

  return (
    <section className={styles.container} id="certificates">
      <div className={styles.header}>
        <h2 className={styles.title}>Certificates</h2>
        {/* <button onClick={toggleProjects} className={styles.toggleButton}>
          {showProjects ? "Show Less" : "Show More"}
        </button> */}
      </div>
      <div className={styles.projectsWrapper}>
        <div className={styles.projects}>
          {visibleProjects.map((project, id) => (
            <div key={id} style={{ "--project-index": id }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
