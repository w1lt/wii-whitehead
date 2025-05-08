import { useEffect } from "react";
import { IconDownload } from "@tabler/icons-react"; // Import Tabler icon
import { motion } from "framer-motion"; // Import motion for animation
import resume from "../assets/resume.pdf";

function ResumePage() {
  useEffect(() => {
    const embedElement = document.querySelector("embed");
    if (embedElement) {
      embedElement.style.pointerEvents = "none"; // Disable pointer events for the embed
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 ">My Resume</h1>

        {/* Animated Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }} // Scale up slightly on hover
          whileTap={{ scale: 0.95 }} // Scale down on click
          onClick={() =>
            window.open(
              "https://docs.google.com/document/d/1AfyetAPTr0x9UEfcnXV7LvWgqlnbYmetNXsP6QqOhN4/export?format=pdf"
            )
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300"
        >
          <IconDownload size={24} /> {/* Tabler Download Icon */}
          <span>Download PDF</span>
        </motion.button>
      </div>

      <div className="relative h-[800px] w-full">
        {/* Embed PDF */}
        <embed
          src={resume}
          type="application/pdf"
          width="100%"
          height="150%"
          className="border rounded-lg shadow-lg"
        />

        {/* Transparent overlay for custom cursor interaction */}
        <div className="absolute inset-0 pointer-events-auto" />
      </div>
    </div>
  );
}

export default ResumePage;
