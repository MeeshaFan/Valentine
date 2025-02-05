// Simple Dragging System
let currentDragged = null;
let offset = [0, 0];

document.addEventListener('mousedown', (e) => {
    const draggable = e.target.closest('.paper');
    
    // Prevent dragging of `.letter-paper`
    if (!draggable || e.target.closest('.letter-paper')) return;

    currentDragged = draggable;
    const rect = currentDragged.getBoundingClientRect();
    offset = [e.clientX - rect.left, e.clientY - rect.top];
    currentDragged.style.zIndex = 1000;
});


document.addEventListener('mousemove', (e) => {
    if (currentDragged) {
        currentDragged.style.left = `${e.clientX - offset[0]}px`;
        currentDragged.style.top = `${e.clientY - offset[1]}px`;
    }
});

document.addEventListener('mouseup', () => {
    currentDragged = null;
});

// Create Permanent Sparkly Hearts
function createHearts() {
    const container = document.body;
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 120}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.fontSize = `${Math.random() * 2 + 1}em`;
        container.appendChild(heart);
        
        // Add continuous sparkles
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, 500);
    }
}

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const valentinesDay = new Date(now.getFullYear(), 1, 14);
    if(now > valentinesDay) valentinesDay.setFullYear(now.getFullYear() + 1);
    const diff = valentinesDay - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').textContent = 
        `${days} days until Valentine's Day 💖`;
}

// Initialize Everything
window.addEventListener('load', () => {
    createHearts();
    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Letter Text Expansion
document.addEventListener('DOMContentLoaded', () => {
    const letterText = document.querySelector('.letter-text');
    const expandButton = document.querySelector('.btn-expand-letter');
    const fullText = document.querySelector('.letter-text-full');

    if (expandButton) {
        expandButton.addEventListener('click', () => {
            if (fullText.style.display === 'none') {
                fullText.style.display = 'inline';
                expandButton.textContent = 'Collapse';
            } else {
                fullText.style.display = 'none';
                expandButton.textContent = 'Read More';
            }
        });
    }
});

// Button Interactions
const yesButton = document.querySelector('.btn-yes');
const noButton = document.querySelector('.btn-no');
const responseMessage = document.querySelector('.response-message');

// Yes Button Response
yesButton.addEventListener('click', () => {
    responseMessage.innerHTML = `
        <span style="font-size:3rem">🎉💖</span><br>
        I lovee you soo so so muchhh<br>
        My baby!<br>
        <span style="font-size:3rem">💌🌹</span>
    `;
    responseMessage.classList.add('visible');
    
    // Celebration effects
    createHeartConfetti();
    createFloatingHearts();
    animateCelebration();
});

// No Button Interaction
// No Button Interaction
let noClickCount = 0;

noButton.addEventListener('click', function () {
    // Get letter-paper container
    const paper = document.querySelector('.letter-paper');
    const paperRect = paper.getBoundingClientRect();
    const buttonRect = this.getBoundingClientRect();

    // Get current position of the button **relative to the parent container**
    const currentX = parseFloat(this.style.left) || 0;
    const currentY = parseFloat(this.style.top) || 0;

    // Define movement constraints (stay inside `.letter-paper`)
    const padding = 20;
    const maxX = paperRect.width - buttonRect.width - padding;
    const maxY = paperRect.height - buttonRect.height - padding;

    // Generate new position **inside container**
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Ensure the button doesn't go out of bounds
    newX = Math.max(padding, Math.min(maxX, newX));
    newY = Math.max(padding, Math.min(maxY, newY));

    // Move button inside the `.letter-paper` container
    gsap.to(this, {
        left: `${newX}px`,
        top: `${newY}px`,
        rotation: Math.random() * 360,
        duration: 0.5,
        ease: "power2.out"
    });

    // Change button text progressively
    noClickCount++;
    const messages = [
        "Ha you really thought you could say no?",
        "Good try!",
        "I'll kill you!",
        "Stop bhai!",
        "Okay i admire the effort! 😘",
        "You will never succeed!",
        "Yuh go ask that!",
        "why u still here? ",
        "Going blaze up the place",
        "Nice weather we having",
        "Just click yes",
        "Okay i done",
        "LMAO NO im not",
        "i funny eh",
        "okay let's not lose track",
        "I love you"
    ];
    if (noClickCount <= messages.length) {
        this.textContent = messages[noClickCount - 1];
    } else {
        noClickCount = 0;
        this.textContent = "Not a Chance ❌";
    }
});

// Celebration Effects
function createHeartConfetti() {
    const hearts = ['💖', '💕', '💞', '💓', '💗'];
    const container = document.querySelector('.letter-paper');
    
    for(let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-confetti';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }
}

function animateCelebration() {
    // Bounce animation
    gsap.to('.letter-paper', {
        scale: 1.05,
        yoyo: true,
        repeat: 3,
        duration: 0.3
    });
    
    // Floating hearts
    for(let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💖';
        heart.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            y: -window.innerHeight,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            ease: "power1.out",
            onComplete: () => heart.remove()
        });
    }
}

function createFloatingHearts() {
    // Floating hearts
    for(let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💖';
        heart.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            y: -window.innerHeight,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            ease: "power1.out",
            onComplete: () => heart.remove()
        });
    }
}
