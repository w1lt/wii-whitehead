import projectsimage from "@/assets/channels/projects.png";
import experienceimage from "@/assets/channels/experience.webp";
import resumeimage from "@/assets/channels/resume.png";
import aboutimage from "@/assets/channels/about.jpg";

const links = [
  {
    name: "about me",
    icon: "👨‍💻",
    route: "/about",
    backgroundImage: aboutimage,
  },
  {
    name: "experience",
    icon: "💼",
    route: "/experience",
    backgroundImage: experienceimage,
  },
  {
    name: "resume",
    icon: "📄",
    route: "/resume",
    backgroundImage: resumeimage,
  },
  {
    name: "projects",
    icon: "🚀",
    route: "/projects",
    backgroundImage: projectsimage,
  },
  {
    name: "settings",
    icon: "⚙️",
    route: "/settings",
  },
];

export default links;
