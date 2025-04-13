import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactElement = document.getElementById('contact');
      const rect = contactElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer id="contact" className={`${styles.container} ${inView ? styles.inView : ''}`}>
      <div className={styles.text}>
        <h2 style={{background: '#002244', margin: 'auto', display: 'flex', justifyContent: 'center', paddingLeft: '1rem', paddingRight: '1rem', borderRadius: '20%', fontSize: '5rem'}}>Contact</h2>
        <p style={{fontSize: '2rem'}}>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:banerjeeashmita7@gmail.com">Mail</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
          <a href="https://www.linkedin.com/in/ashmitabanerjee/">Linkedin</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/anubhabguha1999">GitHub</a>
        </li>
      </ul>
    </footer>
  );
};
