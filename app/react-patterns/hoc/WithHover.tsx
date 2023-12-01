import { useState } from "react";

export default function WithHover(Element: React.ComponentType) {
  return (props: any) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <Element
        {...props}
        hovering={isHovering} // custom props 전달 가능!!
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    );
  };
}
