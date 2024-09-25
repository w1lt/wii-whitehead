import { useEffect } from "react";
import cursorImage from "@/assets/ui/cursor.png";
import cursorTrailImage from "@/assets/ui/cursortrail.png";
import grabImage from "@/assets/ui/grab.png";
import grabShadowImage from "@/assets/ui/grabshadow.png";

const CustomCursor = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // You can adjust this breakpoint if needed

    if (isMobile) {
      // Do not show the custom cursor on mobile
      return;
    }
    const cursorPos = { x: 0, y: 0 };
    const trailPos = { x: 0, y: 0 };

    // Main cursor
    const customCursor = document.createElement("img");
    customCursor.src = cursorImage;
    customCursor.style.position = "fixed";
    customCursor.style.pointerEvents = "none";
    customCursor.style.width = "90px";
    customCursor.style.height = "90px";
    customCursor.style.zIndex = "1000";
    customCursor.style.display = "none"; // Start hidden
    document.body.appendChild(customCursor);

    // Cursor trail
    const cursorTrail = document.createElement("img");
    cursorTrail.src = cursorTrailImage;
    cursorTrail.style.position = "fixed";
    cursorTrail.style.pointerEvents = "none";
    cursorTrail.style.width = "90px";
    cursorTrail.style.height = "90px";
    cursorTrail.style.zIndex = "999";
    cursorTrail.style.display = "none"; // Start hidden
    cursorTrail.style.opacity = ".3";
    document.body.appendChild(cursorTrail);

    // Function to update cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      cursorPos.x = e.clientX - 40; // Adjust for cursor center
      cursorPos.y = e.clientY - 40;

      // Show the custom cursor and trail when moving within the page
      customCursor.style.display = "block";
      cursorTrail.style.display = "block";
    };

    // Function to update trail position with a slight delay
    const updateTrailPosition = () => {
      const dx = cursorPos.x - trailPos.x;
      const dy = cursorPos.y - trailPos.y;
      trailPos.x += dx * 0.35; // 35% of the distance to cursor
      trailPos.y += dy * 0.35;
    };

    // Hide cursor and trail when leaving the window
    const hideCursorOnLeave = () => {
      customCursor.style.display = "none";
      cursorTrail.style.display = "none";
    };

    // Change cursor and trail to grabbing state on click
    const handleMouseDown = () => {
      customCursor.src = grabImage; // Change to grab image
      cursorTrail.src = grabShadowImage; // Change trail to grab shadow
    };

    // Revert cursor and trail to normal on mouse up
    const handleMouseUp = () => {
      customCursor.src = cursorImage; // Revert back to cursor image
      cursorTrail.src = cursorTrailImage; // Revert back to trail image
    };

    // Mouse move listener for cursor movement
    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mouseleave", hideCursorOnLeave);
    window.addEventListener("mousedown", handleMouseDown); // Listen for mouse down
    window.addEventListener("mouseup", handleMouseUp); // Listen for mouse up

    // Rendering positions of the custom cursor and trail
    const render = () => {
      updateTrailPosition(); // Move the trail
      customCursor.style.left = `${cursorPos.x}px`;
      customCursor.style.top = `${cursorPos.y}px`;

      cursorTrail.style.left = `${trailPos.x}px`;
      cursorTrail.style.top = `${trailPos.y}px`;

      requestAnimationFrame(render); // Continuous update
    };
    render();

    // Cleanup event listeners and elements on unmount
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseleave", hideCursorOnLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeChild(customCursor);
      document.body.removeChild(cursorTrail);
    };
  }, []);

  return null; // No JSX required, cursor is handled dynamically
};

export default CustomCursor;
