// particles-config.js - Updated with multiple shapes and detailed comments
document.addEventListener("DOMContentLoaded", () => 
  {

  if (typeof tsParticles !== "undefined") 
    {
    tsParticles
      .load("tsparticles",
         {
        // PERFORMANCE SETTINGS
        fullScreen: 
        {
          enable: false, // Set to true to cover the entire screen
          zIndex: -1,    // Keep particles behind content
        },
        fpsLimit: 60,    // Limit frames per second (lower for better performance)
        
        // PARTICLE APPEARANCE
        particles: 
        {
          // NUMBER OF PARTICLES
          number:
           {
            value: 60,   // Total number of particles (adjust for density)
            density: 
            {
              enable: true,
              value_area: 800, // Higher = more spread out
            },
          },
          
          // PARTICLE COLORS
          color: 
          {
            // You can add/remove colors from this array
            value: ["#ffffff", "#ebf1f1", "#d8c9ff", "#c7568c", "#9d7fe8"],
          },
          
          // PARTICLE SHAPES
          shape: 
          {
            // Available shapes: "circle", "square", "triangle", "polygon", "star"
            type: ["circle", "triangle", "polygon", "star"],
            // Options for polygon shape
            polygon: 
            {
              sides: 5, // Pentagon
            },
            // Options for star shape
            star: 
            {
              sides: 5,
              inset: 2
            },
          },
          
          // PARTICLE OPACITY
          opacity: 
          {
            value: 0.6,  // Base opacity (0 to 1)
            random: true, // Randomize opacity
          },
          
          // PARTICLE SIZE
          size: 
          {
            value: { min: 2, max: 6 }, // Size range in pixels
            random: true, // Randomize size
          },
          
          // CONNECTING LINES
          links: 
          {
            enable: true,
            // Distance at which particles connect
            distance: 150,
            // Line color
            color: "#ffffff",
            // Line opacity
            opacity: 0.4,
            // Line width in pixels
            width: 1.5,
          },
          
          // PARTICLE MOVEMENT
          move: 
          {
            enable: true,
            // Speed of movement
            speed: 2,
            // Direction: "none", "top", "bottom", "left", "right"
            direction: "none",
            // Random movement
            random: true,
            // Straight lines or not
            straight: false,
            // What happens at the edge: "out", "bounce"
            outMode: "out",
            bounce: false,
          },
        },
        
        // INTERACTIVE BEHAVIOR
        interactivity:
         {
          detectOn: "canvas", // Detect on "canvas" or "window"
          events: 
          {
            // Mouse hover behavior
            onHover: {
              enable: true,
              mode: "grab", // "grab", "bubble", "repulse", "connect"
            },
            // Click behavior
            onClick: {
              enable: true,
              mode: "push", // "push", "remove", "bubble", "repulse"
            },
            resize: true, // Adjust on window resize
          },
          modes: 
          {
            // Settings for grab mode (connect particles near mouse)
            grab: 
            {
              distance: 180, // Connection distance
              links: 
              {
                opacity: 0.8, // Connection opacity
              },
            },
            // Settings for push mode (add particles on click)
            push: 
            {
              quantity: 6, // Number of particles to add
            },
          },
        },
        
        // OTHER SETTINGS
        detectRetina: true, // Adjust for retina displays 
        background: 
        {
          color: "transparent",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
        },
      })
      .catch((error) => 
        {
        console.error("Error loading particles:", error)
      })
  }
})