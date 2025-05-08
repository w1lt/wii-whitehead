import { motion } from "framer-motion";

// Reusable ExperienceCard component
interface ExperienceCardProps {
  role: string;
  company: string;
  date: string;
  description: string;
}

function ExperienceCard({ role, company, description }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold">{role}</h2>
      <p className="text-gray-500 text-lg mb-2">{company}</p>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Experience data array
const experiences = [
  {
    role: "Tech Team Lead",
    company: "HackKU",
    date: "Aug 2024 - Present",
    description:
      "Leading the tech team, responsible for building the HackKU portal using React and FastAPI. Focused on high-performance API responses and QR code-based user authentication for event check-ins.",
  },
  {
    role: "Financial Analyst Intern",
    company: "Tradebot",
    date: "Summer 2024",
    description:
      "Developed a web dashboard using Pandas and NumPy to aggregate and display market data, aiding researchers in formulating new trading strategies. Attended market microstructure lectures to deepen my understanding of market dynamics.",
  },
  {
    role: "Owner",
    company: "Exodus",
    date: "Aug 2022 - Aug 2023",
    description:
      "Generated $1,500 in revenue across five countries through organic marketing strategies. Drove over 4,000 store sessions, achieving 65 conversions.",
  },
  {
    role: "Web Director",
    company: "ACM at KU",
    date: "Dec 2023 - May 2024",
    description:
      "Redesigned and maintained the ACM website using Astro, React, and Tailwind CSS.",
  },
];

function ExperiencePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg"
    >
      <h1 className="text-4xl font-bold text-center mb-6">Experience</h1>

      <div className="space-y-8 relative">
        {/* Timeline vertical line, hidden on mobile */}
        <div className="absolute left-1/4 h-full border-l-2 border-gray-200 hidden md:block"></div>

        {/* Mapping experiences */}
        {experiences.map((experience, index) => (
          <div className="flex items-start relative" key={index}>
            {/* Date column, hidden on mobile */}
            <div className="w-1/4 text-gray-500 text-lg font-semibold text-right pr-4 hidden md:block">
              {experience.date}
            </div>

            {/* Experience card, full width on mobile */}
            <div className="w-full md:w-3/4 md:pl-8">
              <ExperienceCard
                role={experience.role}
                company={experience.company}
                date={experience.date}
                description={experience.description}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ExperiencePage;
