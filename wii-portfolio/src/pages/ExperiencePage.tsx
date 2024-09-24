import { motion } from "framer-motion";

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
        {/* Timeline vertical line */}
        <div className="absolute left-1/4 h-full border-l-2 border-gray-200"></div>

        {/* HackKU Tech Team Lead */}
        <div className="flex items-start relative">
          <div className="w-1/4 text-gray-500 text-lg font-semibold text-right pr-4">
            Aug 2024 - Present
          </div>
          <div className="w-3/4 pl-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">Tech Team Lead, HackKU</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Leading the tech team, responsible for building the HackKU
                portal using React and FastAPI. Focused on high-performance API
                responses and QR code-based user authentication for event
                check-ins.
              </p>
            </div>
          </div>
        </div>

        {/* Tradebot Financial Analyst Intern */}
        <div className="flex items-start relative">
          <div className="w-1/4 text-gray-500 text-lg font-semibold text-right pr-4">
            Summer 2024
          </div>
          <div className="w-3/4 pl-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">
                Financial Analyst Intern, Tradebot
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Developed a web dashboard using Pandas and NumPy to aggregate
                and display market data, aiding researchers in formulating new
                trading strategies. Attended market microstructure lectures to
                deepen my understanding of market dynamics.
              </p>
            </div>
          </div>
        </div>

        {/* Owner, Praise Exodus */}
        <div className="flex items-start relative">
          <div className="w-1/4 text-gray-500 text-lg font-semibold text-right pr-4">
            Aug 2022 - Aug 2023
          </div>
          <div className="w-3/4 pl-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">Owner, Exodus</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Generated $1,500 in revenue across five countries through
                organic marketing strategies. Drove over 4,000 store sessions,
                achieving 65 conversions.
              </p>
            </div>
          </div>
        </div>

        {/* ACM Web Director */}
        <div className="flex items-start relative">
          <div className="w-1/4 text-gray-500 text-lg font-semibold text-right pr-4">
            Dec 2023 - May 2024
          </div>
          <div className="w-3/4 pl-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">
                Web Director, ACM at KU
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Redesigned and maintained the ACM website using Astro, React,
                and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExperiencePage;
