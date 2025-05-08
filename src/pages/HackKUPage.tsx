import { motion } from "framer-motion";

const HackKUPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white "
    >
      <h1 className="text-4xl font-bold text-center mb-6">HackKU 2024</h1>
      <p className="text-xl text-gray-700 leading-relaxed mb-4">
        I'm the Tech Lead for HackKU. HackKU is the University of Kansas' annual
        hackathon, where students come together to collaborate, innovate, and
        create exciting projects over the course of a weekend.
      </p>

      <p className="text-xl text-gray-700 leading-relaxed mb-4">
        As the Tech Lead, I help organize the event's technical infrastructure,
        including the website, registration system, and the event management
        tools. I'm excited to bring the best experience possible to all the
        participants!
      </p>
    </motion.div>
  );
};

export default HackKUPage;
