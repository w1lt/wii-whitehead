import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import links from "@/data/links";

import arrow from "../assets/arrow.png";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import SpotifyPage from "./SpotifyPage";
import SettingsPage from "./SettingsPage";
import ProjectsPage from "./ProjectsPage";

function WiiTemplate() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [direction, setDirection] = useState(0); // Track direction of navigation
  const isNavigating = useRef(false); // Ref to prevent multiple fast clicks
  const [zoomOut, setZoomOut] = useState(false); // Track zoom out for home navigation

  const pages = links.map((link) => link.route); // Extract the routes from the links array

  // Handles the 'Home' navigation
  const handleHomeClick = () => {
    setZoomOut(true); // Trigger zoom-out animation
    setTimeout(() => {
      navigate("/");
      setZoomOut(false); // Reset zoom-out after navigation
    }, 175); // Delay navigation to complete zoom-out
  };

  // Handles the 'Start' button to open a link in a new tab
  const handleStartClick = () => {
    window.open("https://example.com", "_blank"); // Replace with desired URL
  };

  // Handles the page navigation with debounce to prevent rapid clicking
  const handlePageChange = (newDirection: number) => {
    if (isNavigating.current) return; // Prevent navigation if already navigating
    isNavigating.current = true; // Set navigation lock

    const currentPageIndex = pages.indexOf(location.pathname);
    const nextPageIndex =
      (currentPageIndex + newDirection + pages.length) % pages.length;

    setDirection(newDirection); // Set the direction for animation
    navigate(pages[nextPageIndex]); // Navigate to the next or previous page

    // Allow navigation again after the animation duration
    setTimeout(() => {
      isNavigating.current = false;
    }, 600); // Slightly longer delay to ensure smooth animation
  };

  // Animation variants for sliding in and out
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

  // Animation variants for zooming out
  const zoomOutVariants = {
    initial: { scale: 1, opacity: 1 },
    zoomOut: { scale: 0.5, opacity: 0, transition: { duration: 0.175 } }, // Shrink and fade-out
  };

  // Render the appropriate page content based on the current route
  const renderContent = () => {
    switch (location.pathname) {
      case "/about":
        return <AboutPage />;
      case "/experience":
        return <ExperiencePage />;
      case "/settings":
        return <SettingsPage />;
      case "/spotify":
        return <SpotifyPage />;
      case "/projects":
        return <ProjectsPage />;
      default:
        return <AboutPage />; // Default page or 404 page
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // You can adjust the duration as needed
    >
      <AnimatePresence initial={false} custom={direction}>
        {/* Motion.div for animating the entire content, including footer */}
        <motion.div
          key={location.pathname} // Ensure animation occurs when path changes
          custom={direction} // Pass direction to variants
          variants={zoomOut ? zoomOutVariants : variants} // Zoom-out if navigating home
          initial="enter"
          animate={zoomOut ? "zoomOut" : "center"} // Trigger zoom-out when navigating home
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.25,
          }} // Customize transition
          className="fixed inset-0 bg-white rounded-[60px] shadow-lg pt-6 px-12 pb-12 flex flex-col justify-between"
          style={{ minHeight: "100vh", minWidth: "100vw" }} // Ensures full viewport
        >
          {/* Scrollable content */}
          <div className="overflow-y-auto flex-grow pb-24">
            {renderContent()}
          </div>

          {/* Navigation arrows */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handlePageChange(-1)}
              className="text-4xl transform transition-all duration-300 hover:scale-150"
            >
              {/* Flip the left arrow horizontally using css transform */}
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

          {/* Footer included in the animations */}
          <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 py-3 w-full flex justify-center items-center space-x-12">
            <button
              onClick={handleHomeClick}
              className="bg-white px-16 py-8 rounded-full shadow-lg text-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              Home
            </button>

            <button
              onClick={handleStartClick}
              className="bg-white px-16 py-8 rounded-full shadow-lg text-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              Start
            </button>
          </footer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default WiiTemplate;
