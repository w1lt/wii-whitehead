import { useEffect } from "react";
import { IconDownload } from "@tabler/icons-react";

function ResumePage() {
  useEffect(() => {
    const embedElement = document.querySelector("embed");
    if (embedElement) {
      embedElement.style.pointerEvents = "none";
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">My Resume</h1>

      <div className="relative">
        <img
          src="/resume.jpg"
          alt="Resume Preview"
          className="w-full rounded-lg shadow-lg border"
        />

        {/* Download button in top-right corner */}

        <a
          href="/whitehead_resume.pdf"
          download
          className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md flex items-center space-x-2 hover:bg-blue-700 transition duration-300"
        >
          <IconDownload size={20} />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}

export default ResumePage;
