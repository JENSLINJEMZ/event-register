// Premium JavaScript for Tecno Spark

// Global Variables
let isLoading = false;
const EVENT_PRICE = 200;

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('loaded');
        
        // Initialize animations after preload
        initializeAnimations();
        initializeParticles();
        initializeCounters();
    }, 2000);
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .event-box, .event-select-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });
});

// Particle System
function initializeParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                );
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Navigation
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Number Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / 50;
                    
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                        
                        // Add "+" or "K" suffix if needed
                        if (counter.parentElement.querySelector('.stat-label').textContent.includes('(K)')) {
                            counter.innerText = target + 'K';
                        } else {
                            counter.innerText = target + '+';
                        }
                    }
                };
                
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Timeline Animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Progress bar
    window.addEventListener('scroll', () => {
        const timelineSection = document.querySelector('.timeline-container');
        if (timelineSection) {
            const rect = timelineSection.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, 
                (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
            ));
            
            if (timelineProgress) {
                timelineProgress.style.height = `${progress * 100}%`;
            }
        }
    });
}

// Initialize animations
function initializeAnimations() {
    initializeTimeline();
    
    // General fade animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                generalObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(el => {
        generalObserver.observe(el);
    });
}

// Form Handling
const registrationForm = document.getElementById('registrationForm');
const eventCheckboxes = document.querySelectorAll('input[name="events"]');
const totalAmountElement = document.getElementById('totalAmount');
const selectedCountElement = document.getElementById('selectedCount');

// Update total amount
function updateTotalAmount() {
    let count = 0;
    eventCheckboxes.forEach(checkbox => {
        if (checkbox.checked) count++;
    });
    
    const total = count * EVENT_PRICE;
    totalAmountElement.textContent = total;
    selectedCountElement.textContent = count;
}

// Event selection
eventCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalAmount);
});

// Event card click to select
document.querySelectorAll('.event-box').forEach(card => {
    card.addEventListener('click', function() {
        const eventType = this.dataset.event;
        const checkbox = document.querySelector(`input[value="${eventType}"]`);
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            updateTotalAmount();
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }
    });
});

// Form submission
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    // Validate event selection
    const selectedEvents = Array.from(eventCheckboxes).filter(cb => cb.checked);
    if (selectedEvents.length === 0) {
        showNotification('Please select at least one event!', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(registrationForm);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        college: formData.get('college'),
        year: formData.get('year'),
        department: formData.get('department'),
        events: selectedEvents.map(cb => cb.value),
        paymentMethod: formData.get('paymentMethod'),
        totalAmount: selectedEvents.length * EVENT_PRICE,
        registrationId: generateRegistrationId(),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    isLoading = true;
    
    // Simulate API call
    await simulateApiCall(data);
    
    // Show success state
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    // Show success modal
    setTimeout(() => {
        showSuccessModal(data.registrationId);
        
        // Reset form
        registrationForm.reset();
        updateTotalAmount();
        submitBtn.classList.remove('success');
        isLoading = false;
    }, 1000);
});

// Generate unique registration ID
function generateRegistrationId() {
    const prefix = 'TS2024';
    const random = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    return prefix + random;
}

// Simulate API call
async function simulateApiCall(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Registration Data:', data);
            
            // Save to localStorage (for demo)
            const registrations = JSON.parse(localStorage.getItem('tecnoSparkRegistrations') || '[]');
            registrations.push(data);
            localStorage.setItem('tecnoSparkRegistrations', JSON.stringify(registrations));
            
            resolve(true);
        }, 2000);
    });
}

// Success Modal
function showSuccessModal(registrationId) {
    const modal = document.getElementById('successModal');
    const regIdElement = document.getElementById('regId');
    
    regIdElement.textContent = registrationId;
    modal.classList.add('show');
    
    // Add confetti effect
    createConfetti();
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Download ticket function
function downloadTicket() {
    showNotification('Ticket download will start shortly...', 'success');
    // In real implementation, generate PDF ticket
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: -400px;
        background: var(--bg-card);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px 30px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transition: right 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification.success {
        border-color: var(--success);
    }
    
    .notification.success i {
        color: var(--success);
    }
    
    .notification.error {
        border-color: var(--danger);
    }
    
    .notification.error i {
        color: var(--danger);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Confetti effect
function createConfetti() {
    const colors = ['#00F5FF', '#FF0080', '#7B2FFF', '#00FF88'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        // Remove after animation
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// Add confetti styles
const confettiStyles = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        z-index: 10001;
        animation: confettiFall linear;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;

const confettiStyleSheet = document.createElement('style');
confettiStyleSheet.textContent = confettiStyles;
document.head.appendChild(confettiStyleSheet);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Mobile detection
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
    
    // Form input animations
    const inputs = document.querySelectorAll('.premium-input-group input, .premium-select-group select');
    inputs.forEach(input => {
        if (input.value) {
            input.classList.add('filled');
        }
        
        input.addEventListener('blur', () => {
            if (input.value) {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });
    
    // Event box hover effect
    const eventBoxes = document.querySelectorAll('.event-box');
    eventBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            box.style.setProperty('--x', `${x}px`);
            box.style.setProperty('--y', `${y}px`);
        });
    });
    
    console.log('🚀 Tecno Spark 2024 - Ready to ignite!');
});

// Export functions for global use
window.closeModal = closeModal;
window.downloadTicket = downloadTicket;
