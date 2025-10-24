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

    const createCursorElement = (
      src: string,
      zIndex: number,
      opacity = "1"
    ) => {
      const element = document.createElement("img");
      element.src = src;
      element.style.position = "fixed";
      element.style.pointerEvents = "none";
      element.style.width = "90px";
      element.style.height = "90px";
      element.style.zIndex = String(zIndex);
      element.style.display = "none"; // Start hidden
      element.style.top = "0";
      element.style.left = "0";
      element.style.willChange = "transform";
      element.style.opacity = opacity;
      document.body.appendChild(element);
      return element;
    };

    // Create all cursor and trail variations
    const cursorDefault = createCursorElement(cursorImage, 1000);
    const cursorGrab = createCursorElement(grabImage, 1000);
    const trailDefault = createCursorElement(cursorTrailImage, 999, ".3");
    const trailGrab = createCursorElement(grabShadowImage, 999, ".3");

    // Function to update cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      cursorPos.x = e.clientX - 40; // Adjust for cursor center
      cursorPos.y = e.clientY - 40;

      // Immediately update cursor position for zero-lag feel
      const cursorTransform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      cursorDefault.style.transform = cursorTransform;
      cursorGrab.style.transform = cursorTransform;

      // Show the default cursor and trail when moving within the page
      cursorDefault.style.display = "block";
      trailDefault.style.display = "block";
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
      cursorDefault.style.display = "none";
      cursorGrab.style.display = "none";
      trailDefault.style.display = "none";
      trailGrab.style.display = "none";
    };

    // Change cursor and trail to grabbing state on click
    const handleMouseDown = () => {
      cursorDefault.style.display = "none";
      cursorGrab.style.display = "block";
      trailDefault.style.display = "none";
      trailGrab.style.display = "block";
    };

    // Revert cursor and trail to normal on mouse up
    const handleMouseUp = () => {
      cursorDefault.style.display = "block";
      cursorGrab.style.display = "none";
      trailDefault.style.display = "block";
      trailGrab.style.display = "none";
    };

    // Mouse move listener for cursor movement
    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mouseleave", hideCursorOnLeave);
    window.addEventListener("mousedown", handleMouseDown); // Listen for mouse down
    window.addEventListener("mouseup", handleMouseUp); // Listen for mouse up

    // Rendering positions of the trail only (cursor updates immediately on mousemove)
    const render = () => {
      updateTrailPosition(); // Move the trail

      const trailTransform = `translate3d(${trailPos.x}px, ${trailPos.y}px, 0)`;
      trailDefault.style.transform = trailTransform;
      trailGrab.style.transform = trailTransform;

      requestAnimationFrame(render); // Continuous update
    };
    render();

    // Cleanup event listeners and elements on unmount
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseleave", hideCursorOnLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeChild(cursorDefault);
      document.body.removeChild(cursorGrab);
      document.body.removeChild(trailDefault);
      document.body.removeChild(trailGrab);
    };
  }, []);

  return null; // No JSX required, cursor is handled dynamically
};

export default CustomCursor;
