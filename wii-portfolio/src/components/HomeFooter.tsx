function HomeFooter() {
  return (
    <footer className="absolute bottom-0 left-0 w-full z-0">
      {/* Footer container to position the SVGs and boxes */}

      <div className="flex justify-between items-end">
        {/* Left box and Left Edge SVG */}
        <div className="flex items-center">
          {/* Left box */}
          <div className="bg-gray-200 w-[170px] h-[70px]"></div>

          {/* Left Edge SVG (Mirrored) */}
          <svg
            width="170"
            height="70"
            viewBox="0 0 170 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[170px] h-[70px]"
            style={{ transform: "scaleX(-1)" }} // Mirroring the SVG
          >
            <path
              d="M123.317 10.6215C134.082 3.68745 146.615 0 159.42 0H170L170 70H0H11.525C24.3294 70 36.863 66.3125 47.6274 59.3785L123.317 10.6215Z"
              className="fill-current text-gray-200"
            />
          </svg>
        </div>

        {/* Right Edge SVG and Right box */}
        <div className="flex items-center">
          {/* Right Edge SVG (Mirrored) */}
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

          {/* Right box */}
          <div className="bg-gray-200 w-[170px] h-[70px]"></div>
        </div>
      </div>
      {/* Connecting box (fills the space between the SVGs) */}
      <div className="bg-gray-200 h-[100px] w-full"></div>
    </footer>
  );
}

export default HomeFooter;
