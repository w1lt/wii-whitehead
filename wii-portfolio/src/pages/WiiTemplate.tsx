import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import links from "@/data/links";

import arrow from "@/assets/ui/arrow.png";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import SpotifyPage from "./SpotifyPage";
import SettingsPage from "./SettingsPage";
import ProjectsPage from "./ProjectsPage";
import ResumePage from "./ResumePage";

function WiiTemplate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState(0);
  const isNavigating = useRef(false);
  const [zoomOut, setZoomOut] = useState(false);

  const pages = links.map((link) => link.route);

  // Handles the 'Home' navigation
  const handleHomeClick = () => {
    setZoomOut(true);
    setTimeout(() => {
      navigate("/");
      setZoomOut(false);
    }, 175);
  };

  // Combines content rendering with button logic
  const renderPageAndStartButton = () => {
    switch (location.pathname) {
      case "/about":
        return {
          content: <AboutPage />,
          buttonText: "Learn More",
          buttonAction: () => navigate("/"),
        };
      case "/experience":
        return {
          content: <ExperiencePage />,
          buttonText: "View Resume",
          buttonAction: () => navigate("/resume"),
        };
      case "/projects":
        return {
          content: <ProjectsPage />,
          buttonText: "View GitHub",
          buttonAction: () => window.open("https://github.com/w1lt", "_blank"),
        };
      case "/spotify":
        return {
          content: <SpotifyPage />,
          buttonText: "Listen on Spotify",
          buttonAction: () =>
            window.open("https://open.spotify.com/", "_blank"),
        };
      case "/resume":
        return {
          content: <ResumePage />,
          buttonText: "Download PDF",
          buttonAction: () =>
            window.open(
              "https://docs.google.com/document/d/1AfyetAPTr0x9UEfcnXV7LvWgqlnbYmetNXsP6QqOhN4/export?format=pdf"
            ),
        };
      case "/settings":
        return {
          content: <SettingsPage />,
          buttonText: "View Source",
          buttonAction: () =>
            window.open("https://github.com/w1lt/wii-whitehead"),
        };
      default:
        return {
          content: <AboutPage />,
          buttonText: "Start",
          buttonAction: () => navigate("/"),
        };
    }
  };

  const { content, buttonText, buttonAction } = renderPageAndStartButton();

  // Handles the page navigation with debounce to prevent rapid clicking
  const handlePageChange = (newDirection: number) => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    const currentPageIndex = pages.indexOf(location.pathname);
    const nextPageIndex =
      (currentPageIndex + newDirection + pages.length) % pages.length;

    setDirection(newDirection);
    navigate(pages[nextPageIndex]);

    setTimeout(() => {
      isNavigating.current = false;
    }, 600);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const zoomOutVariants = {
    initial: { scale: 1, opacity: 1 },
    zoomOut: { scale: 0.5, opacity: 0, transition: { duration: 0.175 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={zoomOut ? zoomOutVariants : variants}
          initial="enter"
          animate={zoomOut ? "zoomOut" : "center"}
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.25,
          }}
          className="fixed inset-0 bg-white rounded-[60px] shadow-lg pt-6 px-12 pb-12 flex flex-col justify-between"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          {/* Scrollable content */}
          <div className="overflow-y-auto flex-grow pb-24">{content}</div>

          {/* Navigation arrows */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handlePageChange(-1)}
              className="text-4xl transform transition-all duration-300 hover:scale-150"
            >
              <img
                src={arrow}
                alt="Left arrow"
                className="w-12 h-12 transform -scale-x-100"
              />
            </button>
          </div>
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handlePageChange(1)}
              className="text-4xl transform transition-all duration-300 hover:scale-150"
            >
              <img
                src={arrow}
                alt="Right arrow"
                className="w-12 h-12 transform"
              />
            </button>
          </div>

          {/* Footer with dynamic Start button */}
          <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 py-3 w-full flex justify-center items-center space-x-12">
            <button
              onClick={handleHomeClick}
              className="bg-white px-16 py-8 rounded-full shadow-lg text-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              Home
            </button>

            <button
              onClick={buttonAction}
              className="bg-white px-16 py-8 rounded-full shadow-lg text-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              {buttonText}
            </button>
          </footer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default WiiTemplate;
