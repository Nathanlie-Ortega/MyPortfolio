// particles-config.js - Fixed to only have nearby particles follow cursor
document.addEventListener("DOMContentLoaded", () => {
  if (typeof tsParticles !== "undefined") {
    tsParticles
      .load("tsparticles", {
        // PERFORMANCE SETTINGS
        fullScreen: {
          enable: true, // Cover the entire screen
          zIndex: -1,   // Keep particles behind content
        },
        fpsLimit: 60,   // Limit frames per second
        
        // PARTICLE APPEARANCE
        particles: {
          // NUMBER OF PARTICLES
          number: {
            value: 70,   // Slightly increased number of particles
            density: {
              enable: true,
              value_area: 800,
            },
          },
          
          // PARTICLE COLORS - Brighter colors
          color: {
            // Enhanced color palette with brighter colors
            value: ["#ffffff", "#f8f8ff", "#e6e6fa", "#ffc0cb", "#add8e6", "#d8c9ff", "#c7568c", "#9d7fe8"],
          },
          
          // PARTICLE SHAPES
          shape: {
            // Available shapes with more variety
            type: ["circle", "triangle", "polygon", "star", "square"],
            // Options for polygon shape
            polygon: {
              sides: 6, // Hexagon
            },
            // Options for star shape
            star: {
              sides: 5,
              inset: 2
            },
          },
          
          // PARTICLE OPACITY - Increased for brightness
          opacity: {
            value: 0.8,  // Increased base opacity (was 0.6)
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.4,
              sync: false
            }
          },
          
          // PARTICLE SIZE - Increased for larger particles
          size: {
            value: { min: 3, max: 8 }, // Larger size range (was 2-6)
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 2,
              sync: false
            }
          },
          
          // GLOW EFFECT
          shadow: {
            enable: true,
            color: "#9d7fe8",
            blur: 5,
            offset: {
              x: 0,
              y: 0
            }
          },
          
          // CONNECTING LINES - Brighter and more visible
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.5, // Increased opacity
            width: 1.8,   // Thicker lines
          },
          
          // PARTICLE MOVEMENT
          move: {
            enable: true,
            speed: 1.0,   // Slightly faster movement
            direction: "none",
            random: true,
            straight: false,
            outMode: "out",
            bounce: false,
            // Removed the attract setting that was causing all particles to be affected
          },
        },
        
        // INTERACTIVE BEHAVIOR - Fixed to only affect nearby particles
        interactivity: {
          detectOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Only grab nearby particles
              // Removed parallax effect that was causing all particles to move
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            // Grab mode - only connects nearby particles with lines
            grab: {
              distance: 150, // Only particles within this distance will be affected
              links: {
                opacity: 1,  // Full opacity on hover
                color: "#c7568c", // Highlight color
              },
            },
            // Push mode - adds particles on click
            push: {
              quantity: 8, // More particles added on click
            },
            // Bubble mode - enlarges nearby particles on hover
            bubble: {
              distance: 150, // Only affects particles within this distance
              size: 12,
              duration: 2,
              opacity: 0.8
            }
          },
        },
        
        // OTHER SETTINGS
        detectRetina: true,
        background: {
          color: "transparent",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
        },
      })
      .catch((error) => {
        console.error("Error loading particles:", error)
      })
  }
})