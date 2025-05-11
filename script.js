// Mobile Menu Functions
function hamburg() {
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(0px)';
}

function cancel() {
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(-500px)';
}

// Typewriter Effect
const texts = ["PROGRAMMER", "WEB DEVELOPER", "SOFTWARE DEVELOPER", "CYBERSECURITY EXPERT", "DATA ANALYST"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const typewriterElement = document.querySelector('.typewriter-text');
    const currentText = texts[textIndex % texts.length];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of typing
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        // Pause before typing next
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Animation with Intersection Observer
function setupAnimations() {
    const animatedElements = document.querySelectorAll('.animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                
                // Apply delay if specified
                const delay = element.getAttribute('data-delay');
                if (delay) {
                    element.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.className = savedTheme;
        updateThemeIcon(savedTheme === 'light-mode');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const isLightMode = htmlElement.classList.contains('light-mode');
        
        if (isLightMode) {
            htmlElement.classList.remove('light-mode');
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon(false);
        } else {
            htmlElement.classList.remove('dark-mode');
            htmlElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon(true);
        }
    });
}

function updateThemeIcon(isLightMode) {
    const themeIcon = document.querySelector('#theme-toggle-btn i');
    if (isLightMode) {
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

// Certificate Modal Functionality
function setupCertificateModal() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificate-modal');
    const modalTitle = document.getElementById('modal-title');
    const certificateFrame = document.getElementById('certificate-frame');
    const closeModal = document.querySelector('.close-modal');
    
    certificateCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const certificateFile = card.getAttribute('data-certificate');
            
            modalTitle.textContent = title;
            certificateFrame.src = certificateFile;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact Form Functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessModal = successModal.querySelector('.close-modal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would normally send the data to a server
        // For demonstration, we'll simulate sending an email
        
        // Simulate email sending with a timeout
        setTimeout(() => {
            // Show success message
            successModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Reset form
            contactForm.reset();
            
            // In a real implementation, you would use a service like EmailJS, FormSubmit, or your own backend
            console.log('Email would be sent with:', { name, email, message });
            
            // For a real implementation, you would use code like this:
            /*
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: name,
                reply_to: email,
                message: message
            })
            .then(() => {
                successModal.style.display = 'block';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert('There was an error sending your message. Please try again later.');
            });
            */
        }, 1000);
    });
    
    // Close success modal
    closeSuccessModal.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
    setupAnimations();
    setupThemeToggle();
    setupCertificateModal();
    setupContactForm();
});