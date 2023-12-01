import { useState, useEffect, useRef } from "react";

export function useHover() {
  const [isHovering, setIsHovering] = useState(false);
  const hoverRef = useRef<HTMLElement>(null);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  useEffect(() => {
    const hoverElement = hoverRef.current;
    if (hoverElement) {
      hoverElement.addEventListener("mouseover", handleMouseOver);
      hoverElement.addEventListener("mouseout", handleMouseOut);

      return () => {
        hoverElement.removeEventListener("mouseover", handleMouseOver);
        hoverElement.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [hoverRef.current]);

  return [hoverRef, isHovering];
}
