import { motion } from "framer-motion";

interface ChannelProps {
  channel: {
    name: string;
    icon: string;
    backgroundImage?: string;
    route: string;
  };
  index: number;
  onClick: (index: number, route: string, element: HTMLElement) => void;
}

const ChannelComponent: React.FC<ChannelProps> = ({
  channel,
  index,
  onClick,
}) => {
  const hoverAnimation = {
    scale: 1.05,
    y: -10,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
  };

  return (
    <motion.div
      onClick={(e) => onClick(index, channel.route, e.currentTarget)}
      whileHover={hoverAnimation}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center overflow-hidden group bg-black"
    >
      <div className="relative w-full h-full bg-black">
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
  );
};

export default ChannelComponent;
