import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const firstPart = [
  "Finally the day came!",
  "Eisob natok amar dara hobe na!",
  "",
  "Bhaai kaa birthday hein,",
  "Bhaai khusss rehena aur khubb uchaiyaa choona,",
  "",
  "Now stop, take a deep breath and start reading again,",
  "I don’t want you to read it fast, karon tui eta jhor er begh a porchis, just go slow on the lines,",
];

const restOfMessage = [
  "",
  "",
  "💫 Kuch line-o mein tujhe, tujhko samjhana tha,",
  "💫 Tu hein kaun aaj wohi baatana tha,",
  "",
  "🌸 Iss umaar mein hoh nehi payega per, ek dusre janam mei kahi,",
  "🌸 Mein aaunga tere paas, per “mein wohi hoon!” yeh bataunga mein nehi,",
  "",
  "🎈 Mein fir seh tera dost banunga, bin-bole ki “mein tera dost tha kabhi”",
  "🎈 Fir bhi mein tu bankaar, tujhe woh saab na de paau jo tune mujhe diya aabhi,",
  "",
  "🎉 Happy Birthday Tiger! 🎉",
  "🌟 May god Bless you!",
  "👑 And always be the queen of your choices!",
  "",
  "r last a r ekta line likhechi, sune ja chup chaap",
  "",
  "buss dhiyaan rakhna itni si baath pe mera,",
  "tu Krishna hogi kisi aur ka,",
  "per Sudama hoon mein tera",
  "",
  "ki bhabjis sesh?",
  "hurr bal,",
  "tor bhai ki eto taratari chere debe,",
  "",
  "💐 With all due respect, presenting you the queen of the queens 💐",
  "👑 ASHMITA BANERJEE 👑",
];

function BirthdayPage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (lineIndex < firstPart.length) {
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex]);

  return (
    <div style={styles.container}>
      <div className="stars-container">
        {[...Array(300)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>

      <div className="hearts" />
      <div style={styles.card}>
        <h1 style={styles.title}>🎂 Happy Birthday, Queen! 🎂</h1>

        {firstPart.slice(0, lineIndex).map((line, idx) => (
          <p key={idx} style={styles.line}>{line}</p>
        ))}

        {lineIndex >= firstPart.length && !showRest && (
          <button style={styles.readMoreButton} onClick={() => setShowRest(true)}>
            💌 Read More
          </button>
        )}

        {showRest &&
          restOfMessage.slice(0, -6).map((line, index) => (
            <p key={index} style={styles.line}>{line}</p>
          ))}

        {/* Final dramatic reveal */}
        {showRest && (
          <div style={styles.finalReveal}>
            {restOfMessage.slice(-6).map((line, idx) => (
              <p key={idx} style={styles.line}>{line}</p>
            ))}

            <a href="https://ashmitabanerjee.netlify.app/" target="_blank" rel="noopener noreferrer">
              <button style={styles.queenButton}>
                👑 Meet the Queen 👑
              </button>
            </a>
          </div>
        )}
      </div>
      <style>{floatingHeartsCSS}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <BirthdayPage />
    </Router>
  );
}

// --- Dark Mode Styles ---
const styles = {
  container: {
    background: "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "'Dancing Script', cursive",
    overflow: "hidden",
    position: "relative",
  },
  card: {
    backgroundColor: "rgba(20, 20, 30, 0.9)",
    padding: "50px",
    borderRadius: "30px",
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    textAlign: "center",
    zIndex: 2,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#f48fb1",
    marginBottom: "30px",
    textShadow: "2px 2px 10px #ff4081",
  },
  line: {
    fontSize: "1.5rem",
    margin: "16px 0",
    color: "#e0e0e0",
    transition: "all 0.3s ease-in-out",
  },
  readMoreButton: {
    marginTop: "25px",
    padding: "12px 24px",
    fontSize: "1.2rem",
    backgroundColor: "#ff4081",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    animation: "pulse 2s infinite",
  },
  queenButton: {
    marginTop: "30px",
    padding: "14px 28px",
    fontSize: "1.3rem",
    background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    color: "white",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
  },
  finalReveal: {
    marginTop: "200vh", // Makes it appear far down
    textAlign: "center",
  },
};

// --- Floating Heart Animation CSS ---
const floatingHeartsCSS = `
/* existing animations... */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.hearts::before,
.hearts::after {
  content: "💖 💕 💗 💞 💘 💝";
  font-size: 2rem;
  position: absolute;
  top: -5%;
  left: 50%;
  animation: float 8s linear infinite;
  opacity: 0.4;
  color: white;
}

@keyframes float {
  0% {
    transform: translateX(0) translateY(0);
  }
  100% {
    transform: translateX(-50vw) translateY(100vh);
    opacity: 0;
  }
}

/* 🌠 Falling Stars 🌠 */
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 60px;
  background: linear-gradient(white, rgba(255, 255, 255, 0));
  animation: starFall linear infinite;
  opacity: 0.6;
}

@keyframes starFall {
  0% {
    transform: translateY(-100px) translateX(0) rotate(45deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) translateX(-100px) rotate(45deg);
    opacity: 0;
  }
}

/* Randomize stars with JS-like styling */
.stars-container .star {
  left: calc(100% * var(--rand-x));
  animation-duration: calc(2s + 3s * var(--rand-speed));
  animation-delay: calc(-5s * var(--rand-delay));
}

/* Generate random custom properties for each star using JS */
`;

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.style.setProperty("--rand-x", Math.random());
    star.style.setProperty("--rand-speed", Math.random());
    star.style.setProperty("--rand-delay", Math.random());
  });
});
