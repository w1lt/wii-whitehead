import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[]; // New prop for technologies
}

export default function ProjectCard({
  title,
  description,
  technologies,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
      <div className="mt-4">
        <ul className="flex flex-wrap mt-1">
          {technologies.map((tech, index) => (
            <li
              key={index}
              className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2 mb-2"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
