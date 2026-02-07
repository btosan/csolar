export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,           // ← reduced from 1 → faster animation
        delay: delay * 0.25,     // ← ¼ of original delay
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};