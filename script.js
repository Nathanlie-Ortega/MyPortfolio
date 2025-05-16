// Prevent overscroll/bounce effect on mobile
document.addEventListener('touchmove', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Prevent pinch zoom
document.addEventListener('gesturestart', function(event) {
  event.preventDefault();
});

// Helper function to scroll to a section
function scrollToSection(sectionId) 
{
  const section = document.getElementById(sectionId);
  if (section) 
    {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mobile Menu Functions
function hamburg() 
{
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}

function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}

// Typewriter Effect
const texts = ["PROGRAMMER", "WEB DEVELOPER", "IT SPECIALIST", "CYBERSECURITY EXPERT", "DATA ANALYST"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() 
{
  const typewriterElement = document.querySelector(".typewriter-text");
  if (!typewriterElement) return; // Safety check
  
  const currentText = texts[textIndex % texts.length];

  if (isDeleting) 
    {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } 
  
  else 
  {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length)
     {
    // Pause at end of typing
    isDeleting = true;
    typingSpeed = 1000;
  } 
  
  else if (isDeleting && charIndex === 0)
     {
    isDeleting = false;
    textIndex++;
    // Pause before typing next
    typingSpeed = 500;
  }

  setTimeout(typeWriter, typingSpeed);
}

// Animation with Intersection Observer
function setupAnimations() {
  const animatedElements = document.querySelectorAll(".animated");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => 
        {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("visible");

          // Apply delay if specified
          const delay = element.getAttribute("data-delay");
          if (delay) {
            element.style.transitionDelay = `${delay}ms`;
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) =>
     {
    observer.observe(element);
  });
}

// Update this function in script.js to ensure it targets dropdown menu items too
function setupMultiColorGlow() {
  const elements = document.querySelectorAll(".multi-color-glow, .dropdown .links a");

  elements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";

    // Create spans for each letter, preserving spaces
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];

      // Add a special class for spaces to maintain proper spacing
      if (text[i] === " ") {
        span.classList.add("space-char");
        span.innerHTML = "&nbsp;";
      }

      element.appendChild(span);
    }
  });
}

// Certificate Modal Functionality
function setupCertificateModal() 
{
  const viewCertificateTriggers = document.querySelectorAll(".view-certificate, .view-certificate-trigger");
  const modal = document.getElementById("certificate-modal");
  const modalTitle = document.getElementById("modal-title");
  const certificateFrame = document.getElementById("certificate-frame");
  const closeModal = document.querySelector(".close-modal");
  const credentialLinks = document.querySelectorAll(".credential-link");

  // Prevent certificate card click from opening modal
  const certificateCards = document.querySelectorAll(".certificate-card");
  certificateCards.forEach((card) => 
    {
    card.addEventListener("click", (e) => 
      {
      // Only prevent default if it's not a trigger element
      if 
      (
        !e.target.classList.contains("view-certificate") &&
        !e.target.classList.contains("view-certificate-trigger") &&
        !e.target.closest(".view-certificate-trigger")
      ) 
      {
        e.preventDefault(); 
      }
    });
  });

  // Setup view certificate triggers
  viewCertificateTriggers.forEach((trigger) => 
    {
    trigger.addEventListener("click", (e) => 
      {
      e.stopPropagation();
      const certificateFile = trigger.getAttribute("data-certificate");
      const card = trigger.closest(".certificate-card");
      const title = card.querySelector("h3").textContent;

      modalTitle.textContent = title;
      certificateFrame.src = certificateFile;
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Prevent credential links from opening modal
  credentialLinks.forEach((link) => 
    {
    link.addEventListener("click", (e) => 
      {
      e.stopPropagation();
    });
  });

  // Close modal when clicking the X
  closeModal.addEventListener("click", () => 
    {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });

  // Close modal when clicking outside the content
  window.addEventListener("click", (event) => 
    {
    if (event.target === modal)
       {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// Contact Form Functionality
function setupContactForm() 
{
  const contactForm = document.getElementById("contact-form");
  const successModal = document.getElementById("success-modal");
  const closeSuccessModal = successModal.querySelector(".close-modal");

  // Check for the formspree_form_submitted flag in localStorage
  window.addEventListener("load", () => {
    if (localStorage.getItem("formspree_form_submitted") === "true") 
      {
      // Show success message
      successModal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Clear the form
      contactForm.reset();

      // Remove the flag
      localStorage.removeItem("formspree_form_submitted");
    }
  });

  contactForm.addEventListener("submit", (e) => 
    {
    // Set a flag in localStorage before form submission
    localStorage.setItem("formspree_form_submitted", "true");

    // Let Formspree handle the submission
  });

  // Close success modal
  closeSuccessModal.addEventListener("click", () => 
    {
    successModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => 
    {
    if (event.target === successModal) {
      successModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// More Projects Functionality
function setupMoreProjects() 
{
  const moreProjectsBtn = document.getElementById("more-projects-btn");
  const lessProjectsBtn = document.getElementById("less-projects-btn");
  const additionalProjects = document.getElementById("additional-projects");
  const lessProjectsContainer = document.getElementById("less-projects-container");

  if (!moreProjectsBtn || !lessProjectsBtn || !additionalProjects || !lessProjectsContainer) return;

  moreProjectsBtn.addEventListener("click", () => 
    {
    additionalProjects.classList.remove("hidden");
    moreProjectsBtn.parentElement.classList.add("hidden");
    lessProjectsContainer.classList.remove("hidden");
  });

  lessProjectsBtn.addEventListener("click", () =>
     {
    additionalProjects.classList.add("hidden");
    moreProjectsBtn.parentElement.classList.remove("hidden");
    lessProjectsContainer.classList.add("hidden");
    // Scroll back to the projects section
    scrollToSection("projects");
  });
}

// More Certificates Functionality
function setupMoreCertificates() 
{
  const moreCertificatesBtn = document.getElementById("more-certificates-btn");
  const lessCertificatesBtn = document.getElementById("less-certificates-btn");
  const additionalCertificates = document.getElementById("additional-certificates");
  const lessCertificatesContainer = document.getElementById("less-certificates-container");

  if (!moreCertificatesBtn || !lessCertificatesBtn || !additionalCertificates || !lessCertificatesContainer) return;

  moreCertificatesBtn.addEventListener("click", () => 
    {
    additionalCertificates.classList.remove("hidden");
    moreCertificatesBtn.parentElement.classList.add("hidden");
    lessCertificatesContainer.classList.remove("hidden");
  });

  lessCertificatesBtn.addEventListener("click", () =>
     {
    additionalCertificates.classList.add("hidden");
    moreCertificatesBtn.parentElement.classList.remove("hidden");
    lessCertificatesContainer.classList.add("hidden");
    // Scroll back to the certificates subsection
    scrollToSection("certificates");
  });
}

// More Skills Functionality
function setupMoreSkills() 
{
  const moreSkillsBtn = document.getElementById("more-skills-btn");
  const lessSkillsBtn = document.getElementById("less-skills-btn");
  const additionalSkills = document.getElementById("additional-skills");
  const lessSkillsContainer = document.getElementById("less-skills-container");

  if (!moreSkillsBtn || !lessSkillsBtn || !additionalSkills || !lessSkillsContainer) return;

  moreSkillsBtn.addEventListener("click", () => 
    {
    additionalSkills.classList.remove("hidden");
    moreSkillsBtn.parentElement.classList.add("hidden");
    lessSkillsContainer.classList.remove("hidden");
  });

  lessSkillsBtn.addEventListener("click", () => 
    {
    additionalSkills.classList.add("hidden");
    moreSkillsBtn.parentElement.classList.remove("hidden");
    lessSkillsContainer.classList.add("hidden");
    // Scroll back to the technical skills subsection
    scrollToSection("technical-skills");
  });
}

// More Tools Functionality
function setupMoreTools() 
{
  const moreToolsBtn = document.getElementById("more-tools-btn");
  const lessToolsBtn = document.getElementById("less-tools-btn");
  const additionalTools = document.getElementById("additional-tools");
  const lessToolsContainer = document.getElementById("less-tools-container");

  if (!moreToolsBtn || !lessToolsBtn || !additionalTools || !lessToolsContainer) return;

  moreToolsBtn.addEventListener("click", () => 
    {
    additionalTools.classList.remove("hidden");
    moreToolsBtn.parentElement.classList.add("hidden");
    lessToolsContainer.classList.remove("hidden");
  });

  lessToolsBtn.addEventListener("click", () => 
    {
    additionalTools.classList.add("hidden");
    moreToolsBtn.parentElement.classList.remove("hidden");
    lessToolsContainer.classList.add("hidden");
    // Scroll back to the tools & tech stack subsection
    scrollToSection("tools-tech");
  });
}

// Animated Border Color Change
function setupAnimatedBorders() 
{
  const innerBorder = document.querySelector(".animated-border-inner");
  const outerBorder = document.querySelector(".animated-border-outer");

  // Colors are handled by CSS animations now
}

// Fix background image on iOS devices
function fixIOSBackground() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.documentElement.style.height = '100vh';
    document.body.style.height = '100vh';
    document.body.style.webkitOverflowScrolling = 'touch';
  }
}

// Enhanced preload background image to prevent flash
function preloadBackgroundImage() {
  // Create a new image element
  const img = new Image();
  
  // Set up the onload handler
  img.onload = function() {
    // Once the image is loaded, apply it to the body
    document.body.classList.add('background-loaded');
    console.log('Background image loaded successfully');
  };
  
  // Set up error handler
  img.onerror = function() {
    console.error('Failed to load background image');
    // Apply a fallback background color
    document.body.style.backgroundColor = '#1a0b2e';
  };
  
  // Start loading the image
  img.src = 'backgroundImages/Background.jpg';
}

// Function to apply multi-color glow effect to text
function applyMultiColorGlow() {
  // Apply to About section subsection titles
  const aboutSubsectionTitles = document.querySelectorAll('#about-me .subsection-title, #education .subsection-title, #experience .subsection-title');
  aboutSubsectionTitles.forEach(title => {
    if (!title.classList.contains('multi-color-glow')) {
      title.classList.add('multi-color-glow');
      const text = title.textContent;
      title.textContent = '';
      
      // Split the text into individual characters and wrap each in a span
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        if (text[i] === ' ') {
          span.classList.add('space-char');
          span.textContent = ' ';
        } else {
          span.textContent = text[i];
        }
        title.appendChild(span);
      }
    }
  });
  
  // Apply to Skills section subsection titles
  const subsectionTitles = document.querySelectorAll('#technical-skills .subsection-title, #tools-tech .subsection-title, #certificates .subsection-title');
  subsectionTitles.forEach(title => {
    if (!title.classList.contains('multi-color-glow')) {
      title.classList.add('multi-color-glow');
      const text = title.textContent;
      title.textContent = '';
      
      // Split the text into individual characters and wrap each in a span
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        if (text[i] === ' ') {
          span.classList.add('space-char');
          span.textContent = ' ';
        } else {
          span.textContent = text[i];
        }
        title.appendChild(span);
      }
    }
  });
  
  // Apply to skill card text
  const skillCards = document.querySelectorAll('.skill-card p');
  skillCards.forEach(card => {
    // Check if already processed
    if (card.children.length === 0) {
      const text = card.textContent;
      card.textContent = '';
      
      // Split the text into individual characters and wrap each in a span
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        if (text[i] === ' ') {
          span.classList.add('space-char');
          span.textContent = ' ';
        } else {
          span.textContent = text[i];
        }
        card.appendChild(span);
      }
    }
  });
  
  // Apply to certificate titles
  const certificateTitles = document.querySelectorAll('.certificate-info h3');
  certificateTitles.forEach(title => {
    // Check if already processed
    if (title.children.length === 0) {
      const text = title.textContent;
      title.textContent = '';
      
      // Split the text into individual characters and wrap each in a span
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        if (text[i] === ' ') {
          span.classList.add('space-char');
          span.textContent = ' ';
        } else {
          span.textContent = text[i];
        }
        title.appendChild(span);
      }
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => 
{
  console.log('DOM loaded, initializing...');
  
  // Preload background image first
  preloadBackgroundImage();
  
  // Fix for iOS background
  fixIOSBackground();
  
  // Initialize all functions
  typeWriter();
  setupAnimations();
  setupMultiColorGlow();
  setupCertificateModal();
  setupContactForm();
  setupMoreProjects();
  setupMoreCertificates();
  setupMoreSkills();
  setupMoreTools();
  setupAnimatedBorders();
  
  // Apply multi-color glow effect
  applyMultiColorGlow();

  // Note: We've moved the particles setup to a separate file
  // for better organization and troubleshooting
  
  // Make sure to apply the effect to dynamically loaded content too
  document.getElementById('more-skills-btn')?.addEventListener('click', function() {
    setTimeout(applyMultiColorGlow, 100); // Apply after the content is shown
  });

  document.getElementById('more-tools-btn')?.addEventListener('click', function() {
    setTimeout(applyMultiColorGlow, 100); // Apply after the content is shown
  });

  document.getElementById('more-certificates-btn')?.addEventListener('click', function() {
    setTimeout(applyMultiColorGlow, 100); // Apply after the content is shown
  });
});

// Add window load event to ensure everything is fully loaded
window.addEventListener('load', function() {
  console.log('Window fully loaded');
  
  // If background image hasn't loaded by now, force it
  if (!document.body.classList.contains('background-loaded')) {
    console.log('Forcing background image load');
    document.body.classList.add('background-loaded');
  }
  
  // Apply multi-color glow effect again to ensure it's applied to all elements
  applyMultiColorGlow();
});