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
    role: "Software Engineer Intern",
    company: "Cboe Global Markets",
    date: "Jun 2025 - Present",
    description:
      "Selected for a 10-week SWE internship at a major options exchange, joining the Web Engineering team.",
  },
  {
    role: "Technology Director",
    company: "HackKU25",
    date: "May 2024 – Apr 2025",
    description:
      "Built a hackathon platform used by 900+ registrants with real-time check-ins, live metrics, and role-based admin tools.",
  },
  {
    role: "Quantitative Trading Intern",
    company: "Tradebot Systems",
    date: "Jun 2024 – Jul 2024",
    description:
      "Visualized order book dynamics, backtested signals, and automated data aggregation for multi-exchange feeds.",
  },
  {
    role: "Founder",
    company: "Exodus",
    date: "Aug 2022 – Aug 2023",
    description:
      "Launched an e-commerce brand with 4,000+ sessions and 65 conversions through organic social campaigns.",
  },
  {
    role: "Web Director",
    company: "ACM at KU",
    date: "Dec 2023 – May 2024",
    description:
      "Developed KU ACM’s website and tutoring tool using Astro and Tailwind; automated deploys via GitHub Actions.",
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
