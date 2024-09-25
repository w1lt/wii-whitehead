import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Tickget",
    description:
      "Developed a ticket reselling platform for students with peer-to-peer payments using Stripe and PayPal.",
    technologies: ["TypeScript", "Express", "React", "Postgres", "Stripe"],
  },
  {
    title: "CSjobs",
    description:
      "Created a job search platform for students with full CRUD functionality and secure application tracking.",
    technologies: ["JavaScript", "Express", "React", "Postgres", "Mantine UI"],
  },
  {
    title: "HawkSwap",
    description:
      "Built a marketplace for KU students with real-time chat using Flask and AJAX.",
    technologies: ["Python", "Flask", "Jinja2", "AJAX"],
  },
  {
    title: "CookShare",
    description:
      "Developed a recipe sharing social media app using React and Firebase.",
    technologies: ["JavaScript", "React", "Firebase", "Material UI"],
  },
  {
    title: "Pupil Pong",
    description:
      "Collaborated on an accessible version of Pong controlled by eye movement and voice commands.",
    technologies: ["Python", "PyGame", "Speech Recognition"],
  },
];

function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6 bg-white rounded-lg"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Projects</h1>

      {/* Grid layout for project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            technologies={project.technologies} // Pass technologies to ProjectCard
          />
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectsPage;
