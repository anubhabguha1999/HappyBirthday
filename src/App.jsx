import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { firstPart, restOfMessage } from "./data";
import { getImageUrl } from "../src/utils";

function BirthdayPage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isImageDisplayed, setIsImageDisplayed] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [useAltTheme, setUseAltTheme] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ashmita1 = getImageUrl("hero/ashmita1.png");
  const ashmita2 = getImageUrl("hero/ashmita2.png");
  const ashmita3 = getImageUrl("hero/ashmita3.png");
  const ashmita4 = getImageUrl("hero/ashmita4.png");
  const ashmita5 = getImageUrl("hero/ashmita5.png");
  const ashmita6 = getImageUrl("hero/ashmita6.jpg");
  const ashmita7 = getImageUrl("hero/ashmita7.jpg");
  const barso = getImageUrl("hero/barso.mp3");
  const images = [
    ashmita1,
    ashmita2,
    ashmita3,
    ashmita4,
    ashmita5,
    ashmita6,
    ashmita7,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageDisplayed(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isImageDisplayed) {
      const imageTimer = setInterval(() => {
        setImageIndex(Math.floor(Math.random() * images.length));
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMeetQueen = () => {
    setShowPopup(true);
    setTimeout(() => {
      window.location.href = "https://ashmitabanerjee.netlify.app/";
      setShowPopup(false);
    }, 2000);
  };

  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
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

  const handleReadMore = () => {
    setShowRest(true);
    setUseAltTheme(true);
  };

  const theme = useAltTheme
    ? scrolled
      ? scrolledTheme
      : lightDarkTheme
    : scrolled
    ? scrolledTheme
    : darkTheme;
  const [showBirthdayPopover, setShowBirthdayPopover] = useState(false);
  useEffect(() => {
    if (!isImageDisplayed) {
      setShowBirthdayPopover(true);
      const timer = setTimeout(() => {
        setShowBirthdayPopover(false);
      }, 2000); // Show for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isImageDisplayed]);

  return (
    <div style={theme.container}>
      <div className="confetti">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-Math.random() * 100}px`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              "--hue": Math.random(),
            }}
          />
        ))}
      </div>

      <div className="notes" />

      <div className="hearts" />

      {isImageDisplayed ? (
        <div style={theme.imageContainer}>
          <img
            src={images[imageIndex]}
            alt="Ashmita"
            style={theme.randomImage}
          />
        </div>
      ) : showBirthdayPopover ? (
        <div className="fade-in-greeting" style={theme.card}>
          <h1 style={theme.title} className="fade-in-greeting sparkle">
            🎂 Happy Birthday, Bhai! 🎂
          </h1>
        </div>
      ) : (
        <div style={theme.card}>
          <h1 style={theme.title} className="fade-in-greeting sparkle">
            🎂 Happy Birthday, Bhai! 🎂
          </h1>

          {firstPart.slice(0, lineIndex).map((line, idx) => (
            <p key={idx} style={theme.line} className="line-slide">
              {line}
            </p>
          ))}

          {lineIndex >= firstPart.length && !showRest && (
            <button
              style={theme.readMoreButton}
              className="glow-button"
              onClick={handleReadMore}
            >
              💌 Read More
            </button>
          )}
          {showRest && (
            <>
              {restOfMessage.slice(0, -6).map((line, index) => (
                <p
                  key={index}
                  style={{
                    ...theme.line,
                    marginTop: line === "" ? "50px" : theme.line.margin,
                  }}
                >
                  {line}
                </p>
              ))}
              <div style={theme.finalReveal}>
                {restOfMessage.slice(-6).map((line, idx) => (
                  <p
                    key={idx}
                    style={{
                      ...theme.line,
                      marginTop: line === "" ? "50px" : theme.line.margin,
                    }}
                  >
                    {line}
                  </p>
                ))}
                <button
                  style={theme.queenButton}
                  className="glow-button"
                  onClick={handleMeetQueen}
                >
                  Meet the Queen 👑
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showPopup && (
        <div style={theme.popupOverlay}>
          <div style={theme.popupBox}>
            <h2 style={theme.popupText}>SMILE PLEASE! 😊</h2>
          </div>
        </div>
      )}

      <style>{`
${floatingHeartsCSS}

.fade-in-greeting {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 1; }
}
`}</style>
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

const baseStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "'Dancing Script', cursive",
    overflow: "hidden",
    position: "relative",
    transition: "background 1s ease-in-out, opacity 1s ease-in-out",
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
    padding: "50px",
    borderRadius: "30px",
    maxWidth: "800px",
    width: "100%",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
    textAlign: "center",
    zIndex: 2,
  },
  line: {
    fontSize: "1.5rem",
    margin: "16px 0",
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

const scrolledTheme = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    background: "linear-gradient(to top, #000428,rgb(0, 46, 86))",
    transition: "background 1s ease-in-out", // Add transition for smooth background change
  },
  card: {
    ...baseStyles.card,
    backgroundColor: "rgba(10, 10, 20, 0.95)",
    transition: "background-color 1s ease-in-out", // Smooth transition for card background color
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#a0c4ff",
    marginBottom: "30px",
    textShadow: "2px 2px 10px #0077b6",
  },
  line: {
    ...baseStyles.line,
    color: "#d0d8ff",
  },
};

const darkTheme = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    background: "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)",
  },
  card: {
    ...baseStyles.card,
    backgroundColor: "rgba(20, 20, 30, 0.9)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#f48fb1",
    marginBottom: "30px",
    textShadow: "2px 2px 10px #ff4081",
  },
  line: {
    ...baseStyles.line,
    color: "#e0e0e0",
  },
};

const lightDarkTheme = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    background: "linear-gradient(to top, #000428,rgb(0, 46, 86))",
  },
  card: {
    ...baseStyles.card,
    backgroundColor: "rgba(20, 20, 43, 0.9)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#b39ddb",
    marginBottom: "30px",
    textShadow: "2px 2px 10px #9575cd",
  },
  line: {
    ...baseStyles.line,
    color: "#dcdce4",
  },
};

const floatingHeartsCSS = `
/* Confetti effect */
.confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: hsl(calc(360 * var(--hue)), 70%, 60%);
  animation: confetti-fall linear infinite;
  opacity: 0.7;
  border-radius: 50%;
  transform: rotate(45deg);
}

@keyframes confetti-fall {
  0% { transform: translateY(-10%) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}

/* Sparkle around title */
.sparkle {
  animation: sparkle 1.5s infinite alternate ease-in-out;
}
@keyframes sparkle {
  0% { text-shadow: 0 0 5px #fff; }
  100% { text-shadow: 0 0 20px #fff, 0 0 30px #f0f, 0 0 40px #0ff; }
}

/* Slide in for birthday lines */
.line-slide {
  animation: slideIn 0.6s ease-out forwards;
  transform: translateX(-30px);
  opacity: 0;
}
@keyframes slideIn {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Glowing button effect */
.glow-button {
  animation: glow 2s ease-in-out infinite alternate;
}
@keyframes glow {
  from {
    box-shadow: 0 0 5px #ff80ab, 0 0 10px #ff4081;
  }
  to {
    box-shadow: 0 0 20px #ff80ab, 0 0 40px #ff4081;
  }
}

/* Floating notes */
@keyframes floatNote {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

.notes::before {
  content: '🎵';
  position: absolute;
  font-size: 2rem;
  left: 10%;
  animation: floatNote 10s infinite linear;
}

.notes::after {
  content: '🎶';
  position: absolute;
  font-size: 2rem;
  left: 80%;
  animation: floatNote 8s infinite linear;
}

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
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-50vw) translateY(100vh); opacity: 0; }
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
  10% { opacity: 1; }
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
