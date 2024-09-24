import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import HomeFooter from "@/components/HomeFooter";

function HomePage() {
  const [channels] = useState([
    {
      name: "about me",
      icon: "💿",
      route: "/about",
    },
    {
      name: "experience",
      icon: "📁",
      route: "/experience",
      tint: "rgba(255, 0, 0, 0.2)",
    },
    {
      name: "spotify",
      icon: "🎧",
      route: "/spotify",
      tint: "rgba(0, 255, 0, 0.2)",
    },
    {
      name: "settings",
      icon: "⚙️",
      route: "/settings",
    },
  ]);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ampm, setAmpm] = useState("");
  const [colonVisible, setColonVisible] = useState(true);
  const [, setDate] = useState("");
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      setHours(hours.toString());
      setMinutes(minutes);
      setAmpm(ampm);
      setColonVisible((prev) => !prev);

      const day = now.getDate();
      const month = now.getMonth() + 1;
      setDate(`Sun ${month}/${day}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      transition={{ duration: 0.5 }} // You can adjust the duration as needed
    >
      <motion.div
        initial="initial"
        animate={fadeOut ? "fade" : "initial"}
        variants={fadeOutVariants}
        className="relative min-h-screen bg-white flex flex-col items-center"
      >
        <div className="grid grid-cols-4 gap-4 max-w-7xl w-full px-5 mt-10">
          {channels.map((channel, index) => (
            <motion.div
              key={index}
              onClick={(e) =>
                handleChannelClick(index, channel.route, e.currentTarget)
              }
              className={` relative bg-gray-200 border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center transition-transform duration-300 ${
                zoom === index ? "z-10" : ""
              } ${zoom === null ? "hover:scale-105" : ""}`}
            >
              {/* Tint Overlay */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ backgroundColor: channel.tint }}
              ></div>

              <div className="p-4 flex flex-col items-center justify-center z-10">
                <p className="text-6xl">{channel.icon}</p>
                <p className="text-xl font-semibold mt-2 text-center">
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
            className="fixed bg-gray-200 flex justify-center items-center"
          >
            <div className="text-center">
              <p className="text-6xl">{channels[zoom].icon}</p>
              <p className="text-xl font-semibold mt-2">
                {channels[zoom].name}
              </p>
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex justify-between w-full  px-20 z-10">
          <a
            href="https://www.linkedin.com/in/willwhitehead122/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 rounded-full w-20 h-20 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span className="text-3xl text-opacity-100">
              <IconBrandLinkedin size={32} />
            </span>
          </a>

          <div className="text-center">
            <p className="text-4xl text-gray-600">
              <code>
                {hours}
                <span>{colonVisible ? ":" : " "}</span>
                {minutes} <span className="text-xl">{ampm}</span>
              </code>
            </p>
          </div>

          <a
            href="https://github.com/w1lt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 rounded-full w-20 h-20 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span className="text-3xl text-opacity-100">
              <IconBrandGithub size={32} />
            </span>
          </a>
        </div>

        <HomeFooter />
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
