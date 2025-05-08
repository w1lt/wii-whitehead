import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Tickget",
      description:
        "Built a peer-to-peer ticket resale platform for students with real-time listings and payment integration.",
      technologies: ["TypeScript", "React", "Express", "PostgreSQL", "Stripe"],
    },
    {
      title: "CSjobs",
      description:
        "Developed a job search portal for early-career CS students, supporting resume uploads, filters, and secure application tracking.",
      technologies: ["JavaScript", "React", "Express", "PostgreSQL"],
    },
    {
      title: "OpenSesame",
      description:
        "Led AI facial recognition system design for a smart doorbell using a Raspberry Pi and Pynq-Z2, with a custom web interface for visitor tracking.",
      technologies: ["Python", "OpenCV", "Flask", "React", "Pynq-Z2"],
    },
    {
      title: "HackKU Management System",
      description:
        "Designed and led development of the HackKU registration, scheduling, and check-in system used by 500+ attendees.",
      technologies: ["Next.js", "Prisma", "Tailwind", "PostgreSQL"],
    },
    {
      title: "Deal Sniper Extension",
      description:
        "Browser extension that scans Facebook Marketplace for underpriced tech, with authentication and real-time alerts.",
      technologies: ["TypeScript", "Plasmo", "React", "Tailwind", "tRPC"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg"
    >
      <h1 className="text-4xl font-bold text-center mb-10">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              y: -10,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white p-5 rounded-lg shadow-lg cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 text-lg mb-3">{project.description}</p>
            <ul className="flex flex-wrap">
              {project.technologies.map((tech, i) => (
                <li
                  key={i}
                  className="text-sm bg-gray-100 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
