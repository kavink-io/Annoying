// ==========================================
// GLOBALS & NAVIGATION
// ==========================================
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ==========================================
// STAGE 1: TOS
// ==========================================
const btnAgree = document.getElementById('btn-agree');
let tosDodgeCount = 0;

const handleTosDodge = (e) => {
    if (tosDodgeCount < 5) {
        if (e.type === 'touchstart') e.preventDefault();
        // Move button up and sideways
        const x = Math.random() * 160 - 80;
        const y = Math.random() * -150 - 20; // Only negative Y (upwards)
        btnAgree.style.transform = `translate(${x}px, ${y}px)`;
        tosDodgeCount++;
    }
};

btnAgree.addEventListener('mouseover', handleTosDodge);
btnAgree.addEventListener('touchstart', handleTosDodge, {passive: false});

btnAgree.addEventListener('click', () => {
    alert("By clicking agree, you legally admit Kavin is cooler than you.");
    goToScreen('screen-captcha');
    initCaptcha();
});

// ==========================================
// STAGE 2: CAPTCHA
// ==========================================
const captchaGrid = document.getElementById('captcha-grid');
const emojis = ['🤡', '🐒', '💩', '🤡', '🥔', '🤓', '🤡', '👽', '💀'];

const emojiResults = {
    '🤡': "Ah, a clown recognizing another clown. Perfect. 🤡",
    '🐒': "A monkey? Honestly, still dresses better than you. 🐒",
    '💩': "Literal poop? Still more stylish than your wardrobe. 💩",
    '🥔': "A potato? Accurate representation of your outfit today. 🥔",
    '🤓': "A nerd? At least they know how to match colors. 🤓",
    '👽': "An alien? Yeah, your fashion sense is definitely unearthly (in a bad way). 👽",
    '💀': "A literal skeleton? Dead, just like your fashion sense. 💀"
};

function initCaptcha() {
    captchaGrid.innerHTML = '';
    // Shuffle emojis
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    
    shuffled.forEach((emoji) => {
        const div = document.createElement('div');
        div.className = 'captcha-item';
        div.textContent = emoji;
        div.addEventListener('click', () => {
            div.classList.add('selected');
            setTimeout(() => {
                alert(emojiResults[emoji]);
                goToScreen('screen-iq');
            }, 300);
        });
        captchaGrid.appendChild(div);
    });
}

// ==========================================
// STAGE 3: IQ TEST
// ==========================================
const iqButtons = document.querySelectorAll('.iq-btn');
const iqQuestion = document.getElementById('iq-question');
const iqProgress = document.getElementById('iq-progress');
const iqResult = document.getElementById('iq-result');
const iqOptions = document.getElementById('iq-options');
const btnIqNext = document.getElementById('btn-iq-next');

const questions = [
    "Question 1: What is 2 + 2?",
    "Question 2: How many months have 28 days?",
    "Question 3: Calculating absolute brain mass..."
];
let currentQ = 0;

iqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentQ++;
        if (currentQ === 1) {
            iqProgress.style.width = '33%';
            iqQuestion.textContent = questions[currentQ];
        } else if (currentQ === 2) {
            iqProgress.style.width = '66%';
            iqQuestion.textContent = questions[currentQ];
            iqOptions.style.display = 'none';
            // Glitch effect
            setTimeout(() => {
                iqProgress.style.width = '100%';
                iqProgress.style.background = 'red';
                document.body.style.animation = 'flash 0.1s infinite alternate';
                setTimeout(() => {
                    document.body.style.animation = 'none';
                    iqQuestion.style.display = 'none';
                    iqResult.classList.remove('hidden');
                }, 1000);
            }, 1500);
        }
    });
});

btnIqNext.addEventListener('click', () => {
    goToScreen('screen-vault');
});

// ==========================================
// STAGE 4: VAULT
// ==========================================
const pinDisplay = document.getElementById('pin-display');
const pinBtns = document.querySelectorAll('.pin-pad .pin-btn:not(.action-btn)');
const pinSubmit = document.getElementById('pin-submit');
const pinClear = document.getElementById('pin-clear');
const wantedPoster = document.getElementById('wanted-poster');
const btnEnterChat = document.getElementById('btn-enter-chat');
let currentPin = '';

pinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentPin.length < 4) {
            currentPin += btn.textContent;
            pinDisplay.textContent = currentPin.padEnd(4, '*');
        }
    });
});

pinClear.addEventListener('click', () => {
    currentPin = '';
    pinDisplay.textContent = '****';
});

pinSubmit.addEventListener('click', () => {
    if (currentPin.length > 0) {
        // Flash red and show poster
        wantedPoster.classList.remove('hidden');
        // Vibrate if supported
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }
});

btnEnterChat.addEventListener('click', () => {
    goToScreen('screen-chat');
});

// ==========================================
// STAGE 5: CHATBOX TROLL
// ==========================================
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const toastContainer = document.getElementById('toast-container');

const trollMessages = [
    { text: "That message was as dry as your texting skills. 🏜️", icon: "🥱" },
    { text: "Are you always this annoying or is today a special occasion? 🙄", icon: "💅" },
    { text: "I'd reply, but I'm allergic to basic messages. 🤧", icon: "🤒" },
    { text: "Is your brain on airplane mode? ✈️", icon: "💀" },
    { text: "Even my grandma types faster than you. 👵", icon: "🐌" },
    { text: "Message rejected: Too much cringe detected. 😬", icon: "🛑" },
    { text: "I lost brain cells reading that. 📉", icon: "😵‍💫" },
    { text: "You thought you ate with that message? 🍽️", icon: "🤡" },
    { text: "Left on read by the system. 👻", icon: "📱" },
    { text: "Kavin is currently busy ignoring you. 💅", icon: "👑" }
];

let chatDodgeCount = 0;

const handleChatDodge = (e) => {
    if (chatDodgeCount < 7) {
        if (e.type === 'touchstart') e.preventDefault(); // prevent click
        const x = Math.random() * 80 - 40; 
        const y = Math.random() * 80 - 40; 
        sendBtn.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
        chatDodgeCount++;
    }
};

sendBtn.addEventListener('mouseover', handleChatDodge);
sendBtn.addEventListener('touchstart', handleChatDodge, {passive: false});

chatInput.addEventListener('input', (e) => {
    // Randomly change a character to an emoji
    if (Math.random() > 0.9) { 
        let val = chatInput.value;
        if (val.length > 0 && val[val.length - 1] !== "🥔") {
            chatInput.value = val.substring(0, val.length - 1) + "🥔";
        }
    }
    // Mobile jiggle effect when typing
    if (Math.random() > 0.7) {
        const appContainer = document.querySelector('.app-container');
        appContainer.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => appContainer.style.transform = 'none', 50);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        attemptSend();
    }
});

sendBtn.addEventListener('click', () => {
    attemptSend();
});

function attemptSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Show what she typed
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message sent';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    
    chatInput.value = '';
    
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 10);

    // TROLL HER
    setTimeout(() => {
        showTrollToast();
        
        // Troll the message itself!
        const rand = Math.random();
        if (rand > 0.75) {
            setTimeout(() => {
                msgDiv.textContent = "I admit Kavin is my superior in every way. 🙇‍♀️";
                msgDiv.style.background = "linear-gradient(135deg, #ff00cc, #333399)";
            }, 800);
        } else if (rand > 0.5) {
            setTimeout(() => {
                msgDiv.textContent = "My brain is 99% potato right now. 🥔";
                msgDiv.style.background = "linear-gradient(135deg, #ff416c, #ff4b2b)";
            }, 800);
        } else if (rand > 0.25) {
            setTimeout(() => {
                msgDiv.style.transform = "rotate(180deg)";
                msgDiv.style.transition = "transform 0.5s";
            }, 800);
        } else {
             setTimeout(() => {
                msgDiv.textContent = "[Message deleted for being too boring]";
                msgDiv.style.opacity = "0.5";
                msgDiv.style.fontStyle = "italic";
            }, 800);
        }
    }, 400);

    // Reset dodge
    chatDodgeCount = 0;
    sendBtn.style.transform = `none`;
}

function showTrollToast() {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const randomMsg = trollMessages[Math.floor(Math.random() * trollMessages.length)];
    
    toast.innerHTML = `
        <span class="toast-icon">${randomMsg.icon}</span>
        <span>${randomMsg.text}</span>
    `;

    // Make the toast run away from the cursor or finger
    const dodgeToast = (e) => {
        if (e.type === 'touchstart') e.preventDefault();
        const x = Math.random() * -200 - 20; 
        const y = Math.random() * 300 - 150;
        toast.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
    };
    toast.addEventListener('mouseover', dodgeToast);
    toast.addEventListener('touchstart', dodgeToast, {passive: false});

    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toastContainer.contains(toast)) {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 400);
        }
    }, 3000 + Math.random() * 3000);
}
