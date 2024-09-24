import { motion } from "framer-motion";

// Reusable ProjectCard component
interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
}

function ProjectCard({ title, date, description }: ProjectCardProps) {
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
      <p className="text-gray-500 text-lg mb-2">{date}</p>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

const projects = [
  {
    title: "Tickget",
    date: "Feb 2023 - Jun 2023",
    description:
      "Developed a ticket reselling platform for students with peer-to-peer payments using Stripe and PayPal.",
  },
  {
    title: "CSjobs",
    date: "Aug 2023 - Dec 2023",
    description:
      "Created a job search platform for students with full CRUD functionality and secure application tracking.",
  },
  {
    title: "HawkSwap",
    date: "Feb 2023 - May 2023",
    description:
      "Built a marketplace for KU students with real-time chat using Flask and AJAX.",
  },
  {
    title: "CookShare",
    date: "May 2023 - Aug 2023",
    description:
      "Developed a recipe sharing social media app using React and Firebase.",
  },
  {
    title: "Pupil Pong",
    date: "Jan 2022 - May 2022",
    description:
      "Collaborated on an accessible version of Pong controlled by eye movement and voice commands.",
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
            date={project.date}
            description={project.description}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectsPage;
