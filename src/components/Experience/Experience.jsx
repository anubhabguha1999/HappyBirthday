import React from "react";

import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import certificate from "../../data/certificate.json";
import { getImageUrl } from "../../utils";
import { Link } from "react-router-dom";

export const Experience = () => {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes snakeAnimation {
        0% { 
          border-image-source: linear-gradient(90deg,rgb(91, 0, 122), transparent); 
          border-image-slice: 1; 
          border-image-width: 5px; 
          box-shadow: 0 0 15px 5px rgb(99, 0, 133); 
        }
        25% { 
          border-image-source: linear-gradient(180deg,rgb(2, 56, 131), transparent); 
          border-image-slice: 1; 
          border-image-width: 5px; 
          box-shadow: 0 0 15px 5px rgb(0, 61, 146); 
        }
        50% { 
          border-image-source: linear-gradient(270deg, rgb(99, 0, 133), transparent); 
          border-image-slice: 1; 
          border-image-width: 5px; 
          box-shadow: 0 0 15px 5px rgb(99, 0, 133); 
        }
        75% { 
          border-image-source: linear-gradient(360deg,rgb(0, 61, 146), transparent); 
          border-image-slice: 1; 
          border-image-width: 5px; 
          box-shadow: 0 0 15px 5px rgb(0, 61, 146); 
        }
        100% { 
          border-image-source: linear-gradient(90deg, rgb(91, 0, 122), transparent); 
          border-image-slice: 1; 
          border-image-width: 5px; 
          box-shadow: 0 0 15px 5px rgb(99, 0, 133); 
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Define inline styles
  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "1200px",
    gap: "60px",
  };

  const skillStyle = {
    border: "5px solid transparent",
    margin: "0.5rem",
    padding: "1rem",
    width: "120px",
    height: "120px",
    display: "flex",
    maxHeight: "90px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: "1 1 120px",
    maxWidth: "150px",
    position: "relative",
    overflow: "hidden",

    borderImageSlice: 1,
    borderImageWidth: "5px",
    animation: "snakeAnimation 7s infinite linear",
  };

  const skillIconContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
    borderRadius: "100%",
  };

  const skillTextStyle = {
    fontSize: "0.9rem",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience </h2>

      <div className={styles.content}>
        <ul style={listStyle}>
          {skills.map((skill, id) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
              key={id}
            >
              <li
                style={{
                  ...skillStyle,
                }}
                onMouseEnter={() => setHoveredIndex(id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={skillIconContainerStyle}>
                  <img
                    src={getImageUrl(skill.imageSrc)}
                    alt={skill.title}
                    style={{ width: "70px" }}
                  />
                </div>
              </li>
              <p style={skillTextStyle}>{skill.title}</p>
            </div>
          ))}
        </ul>
        <ul className={styles.history}>
          {history.map((historyItem, id) => (
            <li key={id} className={styles.historyItem}>
              <div className={styles.historyItemDetails}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ height: "fit" }}>
                      <img
                        style={{ borderRadius: "100%" }}
                        className={styles.historyImg}
                        src={getImageUrl(historyItem.imageSrc)}
                        alt={`${historyItem.organisation} Logo`}
                      />
                    </div>
                  </div>
                  {` ${historyItem.organisation}`}
                </h3>
                <h3>{`${historyItem.role}`}</h3>
                <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                <ul>
                  {historyItem.experiences.map((experience, id) => (
                    <li key={id} className={styles?.expoerence}>{experience}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
       
      </div>
    </section>
  );
};
