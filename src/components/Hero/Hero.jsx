import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const fullText =
      "I'm a Senior Software Engineer with 3+ years experience of using Recent Technologies. Reach out if you'd like to learn more!";
    let index = 0;

    const interval = setInterval(() => {
      setVisibleText(fullText.slice(0, index + 1));
      index += 1;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 50); 

    return () => clearInterval(interval);
  }, []);

  
  const textWithAnimation = visibleText.split(/(\s+)/).map((part, i) => (
    <span key={i} className={part.trim() === "" ? styles.space : styles.word}>
      {part}
    </span>
  ));

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span style={{fontSize: '50px'}}>Hi, I'm</span> <span className={styles.animateText}>Ashmita</span>
        </h1>
        <pre className={styles.description}>{textWithAnimation}</pre>
        <a
          href="mailto:banerjeeashmita7@gmail.com"
          className={styles.contactBtn}
        >
          Contact Me
        </a>
        
      </div>
      <img
        src={getImageUrl("hero/heroIcon.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
