import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={`${styles.container} ${styles.drops} ${styles.rainingStars}`} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
            <h3>Backend Developer</h3>
              <p>
              With extensive experience in backend development, I specialize in 
                building scalable, high-performance APIs and backend systems using 
                Node.js, Python, MongoDB, and SQL. I focus on optimizing databases, 
                designing robust architectures, and ensuring seamless integrations.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
            <h3>Database Management</h3>
              <p>
                Proficient in SQL and NoSQL databases, I design and optimize 
                database structures for efficiency and scalability. I have extensive 
                experience working with PostgreSQL, MySQL, and MongoDB, ensuring 
                data integrity, security, and high availability.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
            <h3>Cloud & DevOps</h3>
              <p>
                I have experience deploying and managing applications on cloud platforms, 
                leveraging Docker, Kubernetes, and CI/CD pipelines to streamline 
                development workflows and ensure high availability.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
