import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeFooter from "@/components/HomeFooter";
import ChannelComponent from "@/components/ChannelComponent"; // Import ChannelComponent
import links from "@/data/links";

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

  const handleChannelClick = (
    index: number,
    route: string,
    element: HTMLElement
  ) => {
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
    >
      <motion.div
        initial="initial"
        animate={fadeOut ? "fade" : "initial"}
        variants={fadeOutVariants}
        className="relative min-h-screen flex flex-col items-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full px-5 mt-10">
          {links.map((channel, index) => (
            <ChannelComponent
              key={index}
              channel={channel}
              index={index}
              onClick={handleChannelClick}
            />
          ))}
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

        <HomeFooter />
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
