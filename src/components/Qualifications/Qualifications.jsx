import React, { useState, useEffect } from "react";
import TypingEffect from "react-typing-effect";
import styles from "./Qualifications.module.css";

const TypingText = ({ text, speed, onTypingDone }) => {
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingFinished(true);
      if (onTypingDone) {
        onTypingDone();
      }
    }, text.length * speed + 1000); // Adjust timing based on text length and speed
    return () => clearTimeout(timer);
  }, [text, speed, onTypingDone]);

  return (
    <>
      {!isTypingFinished ? (
        <TypingEffect
          text={text}
          speed={speed}
          typingDelay={500}
          cursorRenderer={(cursor) => <span>{cursor}</span>}
        />
      ) : (
        text
      )}
    </>
  );
};

export const Qualifications = () => {
  const [typingFinished, setTypingFinished] = useState(false);

  const handleTypingDone = () => {
    setTypingFinished(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.qualificationsContainer}>
      <h2 className={styles.title}>EDUCATION</h2>

      <div className={styles.educationItem}>
        <div className={styles.educationDetails}>
          <h1 className={styles.typingHeading}>
            <TypingText
              text="Bachelor of Technology"
              speed={100}
              onTypingDone={handleTypingDone}
            />
          </h1>
          <TypingText
            text="Calcutta Institute of Engineering and Management"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="06/2018 - 06/2022, Kudhghat, Tallygaunge"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="Computer Science and Engineering (GPA: 8.6)"
            speed={50}
            onTypingDone={handleTypingDone}
          />
        </div>
      </div>

      <div className={styles.educationItem}>
        <div className={styles.educationDetails}>
          <h1 className={styles.typingHeading}>
            <TypingText
              text="Indian Certificate Of Secondary Education (12th)"
              speed={100}
              onTypingDone={handleTypingDone}
            />
          </h1>
          <TypingText
            text="St. Mary's English School"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="08/2017 - 08/2018, Ranaghat, Nadia"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="Physics, Chemistry & Maths (GPA: 6.1)"
            speed={50}
            onTypingDone={handleTypingDone}
          />
        </div>
      </div>

      <div className={styles.educationItem}>
        <div className={styles.educationDetails}>
          <h1 className={styles.typingHeading}>
            <TypingText
              text="Indian Certificate Of Secondary Education (10th)"
              speed={100}
              onTypingDone={handleTypingDone}
            />
          </h1>
          <TypingText
            text="St. Mary's English School"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="05/2015 - 05/2016, Ranaghat, Nadia"
            speed={50}
            onTypingDone={handleTypingDone}
          />
          <br/>
          <TypingText
            text="Physics, Chemistry & Maths (GPA: 7.3)"
            speed={50}
            onTypingDone={handleTypingDone}
          />
        </div>
      </div>
    </div>
  );
};
