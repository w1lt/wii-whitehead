import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper function to fetch the user's IP address using a public API
const fetchIpAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return "Unknown";
  }
};

function SettingsPage() {
  const [toggles, setToggles] = useState({
    darkMode: false,
    notifications: false,
    autoPilot: false, // Airplane Mode
    selfDestruct: false,
    wifi: false,
  });
  const [currentTime, setCurrentTime] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string>("");

  useEffect(() => {
    // Update the current time every second
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    };
    const interval = setInterval(updateTime, 1000);

    // Fetch the user's IP address
    fetchIpAddress().then(setIpAddress);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [key]: !prevToggles[key],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white"
    >
      <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>

      {/* Real-time information section */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">System Information</h2>
        <p className="text-lg">
          Current Time: <strong>{currentTime}</strong>
        </p>
        {/* Conditionally show IP address based on Airplane Mode */}
        {!toggles.autoPilot ? (
          <p className="text-lg">
            IP Address: <strong>{ipAddress || "Loading..."}</strong>
          </p>
        ) : (
          <p className="text-lg">
            IP Address: <strong>Disabled (Airplane Mode)</strong>
          </p>
        )}
        <p className="text-lg">
          Screen Resolution:{" "}
          <strong>
            {window.innerWidth}x{window.innerHeight}
          </strong>
        </p>
      </div>

      {/* Toggles for various settings */}
      <ul className="space-y-6">
        {[
          { label: "Notifications", key: "notifications" as const },
          { label: "Airplane Mode", key: "autoPilot" as const },
          {
            label: "MKWii Unlock All Characters",
            key: "selfDestruct" as const,
          },
        ].map((setting) => (
          <li key={setting.key} className="flex justify-between items-center">
            <span className="text-xl font-semibold">{setting.label}</span>
            <button
              onClick={() => handleToggle(setting.key)}
              className={`${
                toggles[setting.key] ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300`}
            >
              <span
                className={`${
                  toggles[setting.key] ? "translate-x-9" : "translate-x-1"
                } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300`}
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Install Homebrew Channel button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
          Install Homebrew Channel
        </button>
      </div>
    </motion.div>
  );
}

export default SettingsPage;
