import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeFooter from "@/components/HomeFooter";
import ChannelComponent from "@/components/ChannelComponent"; // Import ChannelComponent
import links from "@/data/links";
import click from "@/assets/sounds/click.mp3"; // Import the click sound

function HomePage() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState<number | null>(null);
  const [zoomPosition, setZoomPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [, setIsZooming] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Total number of channels (4 wide x 3 tall)
  const totalGridItems = 4 * 3;
  const numPlaceholders = totalGridItems - links.length; // Calculate how many placeholders are needed

  const handleChannelClick = (
    index: number,
    route: string,
    element: HTMLElement
  ) => {
    const clickAudio = new Audio(click);
    clickAudio.play();
    const rect = element.getBoundingClientRect();
    setZoomPosition({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });

    setZoom(index);
    setIsZooming(true);
    setFadeOut(true);

    setTimeout(() => {
      navigate(route);
    }, 250);
  };

  // Fade-out animation variants
  const fadeOutVariants = {
    initial: { opacity: 1 },
    fade: { opacity: 0.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col"
    >
      <motion.div
        initial="initial"
        animate={fadeOut ? "fade" : "initial"}
        variants={fadeOutVariants}
        className="relative flex-1 flex flex-col"
      >
        {/* Main content area that takes up 75% of screen height */}
        <div className="flex flex-col items-center justify-center h-[75vh] pt-[5vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((channel, index) => (
              <div
                key={index}
                className="aspect-[5/3] w-[17.5vw] max-w-[220px]"
              >
                <ChannelComponent
                  channel={channel}
                  index={index}
                  onClick={handleChannelClick}
                />
              </div>
            ))}

            {Array.from({ length: numPlaceholders }).map((_, index) => (
              <div
                key={index}
                className="relative border border-gray-300 rounded-3xl shadow-lg flex-col items-center justify-center overflow-hidden group bg-gray-300 hidden sm:flex aspect-[5/3] w-[17.5vw] max-w-[220px]"
              >
                <div className="p-4 flex flex-col items-center justify-center z-10">
                  <p className="text-6xl opacity-0">e</p>
                  <p className="text-md font-bold mt-2 text-center text-gray-400">
                    willwhitehead.com
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {zoom !== null && (
          <motion.div
            initial={{
              left: zoomPosition.left,
              top: zoomPosition.top,
              width: zoomPosition.width,
              height: zoomPosition.height,
              borderRadius: "1.5rem",
            }}
            animate={{
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 20,
              borderRadius: "1.5rem",
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed bg-black flex justify-center items-center"
          >
            <div className="text-center">
              <p className="text-6xl">{links[zoom].icon}</p>
              <p className="text-xl font-semibold mt-2">{links[zoom].name}</p>
            </div>
          </motion.div>
        )}

        {/* Render footer only if not on mobile - positioned in the bottom 25% */}
        <div className=" sm:block flex items-center justify-center h-[25vh]">
          <HomeFooter />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
