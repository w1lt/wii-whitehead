import { IconBrandLinkedin } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { useState, useEffect } from "react";

function HomeFooter() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ampm, setAmpm] = useState("");
  const [colonVisible, setColonVisible] = useState(true);
  const [, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      setHours(hours.toString());
      setMinutes(minutes);
      setAmpm(ampm);
      setColonVisible((prev) => !prev);

      const day = now.getDate();
      const month = now.getMonth() + 1;
      setDate(`Sun ${month}/${day}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex justify-between w-full px-20 z-10">
        <a
          href="https://www.linkedin.com/in/willwhitehead122/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 rounded-full w-20 h-20 shadow-lg flex items-center justify-center hover:scale-110 hover:ring-4 hover:ring-blue-500 hover:ring-offset-2 transition-transform"
        >
          <span className="text-3xl text-opacity-100">
            <IconBrandLinkedin size={32} />
          </span>
        </a>

        <div className="text-center">
          <p className="text-4xl text-gray-600">
            <code>
              {hours}
              <span>{colonVisible ? ":" : " "}</span>
              {minutes} <span className="text-xl">{ampm}</span>
            </code>
          </p>
        </div>

        <a
          href="https://github.com/w1lt"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 rounded-full w-20 h-20 shadow-lg flex items-center justify-center hover:scale-110 hover:ring-4 hover:ring-blue-500 hover:ring-offset-2 transition-transform"
        >
          <span className="text-3xl text-opacity-100">
            <IconBrandGithub size={32} />
          </span>
        </a>
      </div>

      <footer className="absolute bottom-0 left-0 w-full z-0">
        <div className="flex justify-between items-end">
          <div className="flex items-center">
            <div className="bg-gray-200 w-[170px] h-[70px]"></div>
            <svg
              width="170"
              height="70"
              viewBox="0 0 170 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[170px] h-[70px]"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M123.317 10.6215C134.082 3.68745 146.615 0 159.42 0H170L170 70H0H11.525C24.3294 70 36.863 66.3125 47.6274 59.3785L123.317 10.6215Z"
                className="fill-current text-gray-200"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <svg
              width="170"
              height="70"
              viewBox="0 0 170 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[170px] h-[70px]"
            >
              <path
                d="M123.317 10.6215C134.082 3.68745 146.615 0 159.42 0H170L170 70H0H11.525C24.3294 70 36.863 66.3125 47.6274 59.3785L123.317 10.6215Z"
                className="fill-current text-gray-200"
              />
            </svg>
            <div className="bg-gray-200 w-[170px] h-[70px]"></div>
          </div>
        </div>
        <div className="bg-gray-200 h-[100px] w-full"></div>
      </footer>
    </>
  );
}

export default HomeFooter;
