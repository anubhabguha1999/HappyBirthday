import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { firstPart, restOfMessage } from "./data";
import { getImageUrl } from "../src/utils";
function BirthdayPage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isImageDisplayed, setIsImageDisplayed] = useState(true); // Track whether images or messages are displayed
  const [imageIndex, setImageIndex] = useState(0); // To keep track of the image index
  const ashmita1 = getImageUrl("hero/ashmita1.png");
  const ashmita2 = getImageUrl("hero/ashmita2.png");
  const ashmita3 = getImageUrl("hero/ashmita3.png");
  const ashmita4 = getImageUrl("hero/ashmita4.png");
  const ashmita5 = getImageUrl("hero/ashmita5.png");
  const barso = getImageUrl("hero/barso.mp3");
  const images = [ashmita1, ashmita2, ashmita3, ashmita4, ashmita5];

  // Change content after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageDisplayed(false); // Show birthday message after 5 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Change the image randomly every 1 second
  useEffect(() => {
    if (isImageDisplayed) {
      const imageTimer = setInterval(() => {
        setImageIndex(Math.floor(Math.random() * images.length)); // Randomize the image
      }, 200);

      return () => clearInterval(imageTimer);
    }
  }, [isImageDisplayed]);

  useEffect(() => {
    if (!isImageDisplayed && lineIndex < firstPart.length) {
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [lineIndex, isImageDisplayed]);

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.setProperty("--rand-x", Math.random().toString());
      star.style.setProperty("--rand-y", Math.random().toString());
      star.style.setProperty("--rand-speed", Math.random().toString());
      star.style.setProperty("--rand-delay", Math.random().toString());
    });
  }, []);

  const handleMeetQueen = () => {
    setShowPopup(true);
    setTimeout(() => {
      window.location.href = "https://ashmitabanerjee.netlify.app/";
    }, 2000);
  };
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;

    // Try to play on load (likely blocked)
    if (audio) {
      audio.play().catch((err) => {
        console.warn("Autoplay failed. Waiting for user interaction...", err);
      });
    }

    const enableAudio = () => {
      if (audio && audio.paused) {
        audio.play().catch((err) => {
          console.error("User interaction play failed:", err);
        });
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, [imageIndex]);

  return (
    <div style={styles.container}>
      {/* <audio ref={audioRef} loop>
  <source src={barso} type="audio/mpeg" />
</audio> */}
      {/* <button onClick={() => audioRef.current?.play()}>Play Music</button> */}

      <div className="stars-container">
        {[...Array(500)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>

      <div className="hearts" />

      {/* Display random images for the first 5 seconds */}
      {isImageDisplayed ? (
        <div style={styles.imageContainer}>
          <img
            src={images[imageIndex]}
            alt="Ashmita"
            style={styles.randomImage}
          />
        </div>
      ) : (
        <div style={styles.card}>
          <h1 style={styles.title}>🎂 Happy Birthday, Bhai! 🎂</h1>

          {firstPart.slice(0, lineIndex).map((line, idx) => (
            <p key={idx} style={styles.line}>
              {line}
            </p>
          ))}

          {lineIndex >= firstPart.length && !showRest && (
            <button
              style={styles.readMoreButton}
              onClick={() => setShowRest(true)}
            >
              💌 Read More
            </button>
          )}

          {showRest &&
            restOfMessage.slice(0, -6).map((line, index) => (
              <p
                key={index}
                style={{
                  ...styles.line,
                  marginTop: line === "" ? "50px" : styles.line.margin,
                }}
              >
                {line}
              </p>
            ))}

          {showRest && (
            <div style={styles.finalReveal}>
              {restOfMessage.slice(-6).map((line, idx) => (
                <p
                  key={idx}
                  style={{
                    ...styles.line,
                    marginTop: line === "" ? "50px" : styles.line.margin,
                  }}
                >
                  {line}
                </p>
              ))}

              <button style={styles.queenButton} onClick={handleMeetQueen}>
                Meet the Queen 👑
              </button>
            </div>
          )}
        </div>
      )}

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupBox}>
            <h2 style={styles.popupText}>SMILE PLEASE! 😊</h2>
          </div>
        </div>
      )}

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

// 🎨 Styles
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
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    maxWidth: "800px",
    width: "100%",
    height: "80vh",
    marginBottom: "20px",
  },
  randomImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "20px",
    objectFit: "cover",
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
    marginTop: "200vh",
    textAlign: "center",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popupBox: {
    background: "white",
    padding: "40px 60px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  popupText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#ff4081",
  },
};

const floatingHeartsCSS = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.hearts::before,
.hearts::after {
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
  width: 1px;
  height: 20px;
  background: white;
  border-radius: 50%;
  animation: starFall linear infinite;
  opacity: 0.6;
}

@keyframes starFall {
  0% {
    transform: translateX(100vw) translateY(-100px) rotate(250deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100vw) translateY(100vh) rotate(250deg);
    opacity: 0;
  }
}

.stars-container .star {
  left: calc(100% * var(--rand-x));
  top: calc(100vh * var(--rand-y));
  animation-duration: calc(3s + 4s * var(--rand-speed));
  animation-delay: calc(-5s * var(--rand-delay));
}
`;
