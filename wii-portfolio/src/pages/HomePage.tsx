import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeFooter from "@/components/HomeFooter";
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

  // Add dummy channels if links count is less than 12
  const filledLinks = [...links];
  const dummyChannelsNeeded = 8 - filledLinks.length;

  if (dummyChannelsNeeded > 0) {
    for (let i = 0; i < dummyChannelsNeeded; i++) {
      filledLinks.push({
        name: "willwhitehead.com",
        route: "#",
        icon: "",
        backgroundImage: "",
      });
    }
  }

  // Framer Motion Hover Animation
  const hoverAnimation = {
    scale: 1.05,
    y: -10,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
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
          {filledLinks.map((channel, index) => (
            <motion.div
              key={index}
              onClick={(e) =>
                handleChannelClick(index, channel.route, e.currentTarget)
              }
              whileHover={hoverAnimation}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center overflow-hidden group bg-black"
            >
              <div className="relative w-full h-full bg-black">
                {/* Channel Image */}
                <img
                  src={channel.backgroundImage}
                  alt={`${channel.name} background`}
                  className="absolute transform opacity-100 -top-8 transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ backgroundColor: "black" }}
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, .9), rgba(0, 0, 0, .6))",
                  zIndex: 10,
                }}
              ></div>

              {/* Content */}
              <div className="p-4 flex flex-col items-center justify-center z-10">
                <p className="text-6xl">{channel.icon}</p>
                <p className="text-xl font-semibold mt-2 text-center text-white group-hover:translate-y-0 transition-transform duration-300">
                  {channel.name}
                </p>
              </div>
            </motion.div>
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
              <p className="text-6xl">{filledLinks[zoom].icon}</p>
              <p className="text-xl font-semibold mt-2">
                {filledLinks[zoom].name}
              </p>
            </div>
          </motion.div>
        )}

        <HomeFooter />
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
