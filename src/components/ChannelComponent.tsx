import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface ChannelProps {
  channel: {
    name: string;
    icon: string;
    route: string;
    gradient: string;
  };
  index: number;
  onClick: (index: number, route: string, element: HTMLElement) => void;
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channel,
  index,
  onClick,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const hoverAnimation = {
    scale: 1.05,
    y: -10,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate offset from center (-50 to 50 range)
    const x = ((e.clientX - rect.left) / rect.width) * 100 - 50;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - 50;
    setMouseOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Simple subtle gradient per channel
  const randomGradient = useMemo(() => {
    const gradients = [
      "linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 50%, #1a1a1a 100%)",
      "linear-gradient(135deg, #252525 0%, #3a3a3a 50%, #202020 100%)",
      "linear-gradient(135deg, #1c1c1c 0%, #303030 50%, #181818 100%)",
      "linear-gradient(135deg, #232323 0%, #353535 50%, #1e1e1e 100%)",
    ];

    return gradients[index % gradients.length];
  }, [index]);

  return (
    <motion.div
      onClick={(e) => onClick(index, channel.route, e.currentTarget)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={hoverAnimation}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center overflow-hidden group bg-black h-full w-full"
    >
      {/* Random Gray Gradient Background - Bottom Layer */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          background: randomGradient,
          zIndex: 0,
        }}
      />

      {/* CSS-Based Infinite Diagonal Emoji Background - Middle Layer */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='24' y='32' font-size='24' text-anchor='middle' fill='white' opacity='0.5'%3E${encodeURIComponent(
            channel.icon
          )}%3C/text%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
          animation: "diagonal-scroll 3s linear infinite",
          animationPlayState: isHovered ? "paused" : "running",
          zIndex: 5,
          transform: `translate(${mouseOffset.x * 0.4}px, ${
            mouseOffset.y * 0.4
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full p-4">
        <p className="text-4xl sm:text-5xl lg:text-6xl">{channel.icon}</p>
        <p className="text-sm sm:text-lg lg:text-xl font-semibold mt-2 text-center text-white group-hover:translate-y-0 transition-transform duration-300">
          {channel.name}
        </p>
      </div>
    </motion.div>
  );
};

export default ChannelComponent;
