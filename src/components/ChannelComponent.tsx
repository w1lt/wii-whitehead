import { motion } from "framer-motion";

interface ChannelProps {
  channel: {
    name: string;
    icon: string;
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
      className="relative border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center justify-center overflow-hidden group bg-black h-full w-full"
    >
      {/* CSS-Based Infinite Diagonal Emoji Background */}
      <div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='24' y='32' font-size='24' text-anchor='middle' fill='white' opacity='0.6'%3E${encodeURIComponent(
            channel.icon
          )}%3C/text%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
          animation: "diagonal-scroll 12s linear infinite",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .3))",
          zIndex: 10,
        }}
      ></div>

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
