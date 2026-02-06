// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        // Custom clamped sizes – tune min/max/vw based on your design
        // Use https://clamp.font-size.app/ to generate (e.g., min 3rem at 1024px, max 5rem at 1920px)
        'responsive-4xl': 'clamp(2rem, 2.5vw + 1rem, 2.5rem)',  // For logo (caps at 40px)
        'responsive-6xl': 'clamp(3rem, 4vw + 1rem, 4rem)',      // Medium headings
        'responsive-7xl': 'clamp(3.5rem, 5vw + 1rem, 4.5rem)',  // Large headings
        'responsive-8xl': 'clamp(4rem, 6vw + 1rem, 5rem)',      // Hero – caps at 80px instead of 96px
        'responsive-xl': 'clamp(1.125rem, 1vw + 0.5rem, 1.25rem)',
        'responsive-2xl': 'clamp(1.25rem, 1.2vw + 0.5rem, 1.5rem)',
      },
    },
  },
};