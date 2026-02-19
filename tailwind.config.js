// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'responsive-4xl': 'clamp(2rem, 2.5vw + 1rem, 2.5rem)',  
        'responsive-6xl': 'clamp(3rem, 4vw + 1rem, 4rem)',    
        'responsive-7xl': 'clamp(3.5rem, 5vw + 1rem, 4.5rem)', 
        'responsive-8xl': 'clamp(4rem, 6vw + 1rem, 5rem)',  
        'responsive-xl': 'clamp(1.125rem, 1vw + 0.5rem, 1.25rem)',
        'responsive-2xl': 'clamp(1.25rem, 1.2vw + 0.5rem, 1.5rem)',
      },
    },
  },
};