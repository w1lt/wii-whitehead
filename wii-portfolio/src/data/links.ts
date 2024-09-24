import spotifyimage from "@/assets/channels/spotify.png";
import projectsimage from "@/assets/channels/projects.png";
import experienceimage from "@/assets/channels/experience.webp";

const links = [
  {
    name: "about me",
    icon: "👨‍💻",
    route: "/about",
  },
  {
    name: "experience",
    icon: "📁",
    route: "/experience",
    backgroundImage: experienceimage,
  },
  {
    name: "projects",
    icon: "🚀",
    route: "/projects",
    backgroundImage: projectsimage,
  },
  {
    name: "spotify",
    icon: "🎧",
    route: "/spotify",
    backgroundImage: spotifyimage, // Directly use the imported image variable
  },
  {
    name: "resume",
    icon: "📄",
    route: "/resume",
  },
  {
    name: "settings",
    icon: "⚙️",
    route: "/settings",
    backgroundImage: "/path/to/settings-background.jpg", // Ensure the path is correct or import the image
  },
];

export default links;
