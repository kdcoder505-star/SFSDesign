document.addEventListener('DOMContentLoaded', () => {
    // Select elements with safety checks
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatClose = document.querySelector('.chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');

    if (!chatbotButton || !chatbotContainer || !chatBody) {
        console.error("Chatbot elements missing from the page.");
        return;
    }

    let isInitialised = false;

    // Toggle Chatbot
    chatbotButton.addEventListener('click', (e) => {
        e.preventDefault();
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active') && !isInitialised) {
            initChat();
            isInitialised = true;
        }
    });

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Initial Message
    function initChat() {
        addMessage("Hello! 👋 Welcome to SFS Assist. I'm here to help you navigate our college.", 'bot');
        setTimeout(() => {
            addMessage("Please select who you are so I can provide the best info:", 'bot');
            addRoleOptions();
        }, 800);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-msg`;
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);

        // Smooth scroll to bottom
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: 'smooth'
        });
    }

    function addRoleOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'role-options';

        const roles = ['Visitor', 'Student', 'Parent'];
        roles.forEach(role => {
            const btn = document.createElement('div');
            btn.className = 'role-btn';
            btn.innerText = role;
            btn.addEventListener('click', () => selectRole(role));
            optionsDiv.appendChild(btn);
        });

        chatBody.appendChild(optionsDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function selectRole(role) {
        const options = document.querySelector('.role-options');
        if (options) options.remove();

        addMessage(`I am a ${role}`, 'user');

        setTimeout(() => {
            if (role === 'Visitor') {
                addMessage(`Great! Welcome to SFS. 🏛️ Are you interested in Admissions, Courses, or seeing our Campus Gallery?`, 'bot');
            } else if (role === 'Student') {
                addMessage(`Hey there! 🎓 How can I assist you? Need help with Linways login, Exam dates, or Events?`, 'bot');
            } else {
                addMessage(`Greetings! 👪 We appreciate our parents. Would you like to know about Fees, Faculty contacts, or Transport?`, 'bot');
            }
        }, 800);
    }

    // Handle User Input
    function handleUserQuery() {
        if (!chatInput) return;
        const query = chatInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        chatInput.value = '';

        setTimeout(() => {
            generateBotResponse(query.toLowerCase());
        }, 1000);
    }

    function generateBotResponse(query) {
        let response = "I'm not quite sure about that yet. Please call our helpdesk at +91 80 2783 2165 for immediate assistance!";

        if (query.includes('admission') || query.includes('apply')) {
            response = "Admissions for 2025 are OPEN! 🎓 We offer BBA, BCom, BCA, BSc, BA, MCA, MCom, and MSc programs. Click 'Apply Now' to start.";
        } else if (query.includes('courses') || query.includes('program')) {
            response = "We offer a wide range of programs:<br><strong>UG:</strong> BBA (Aviation, Analytics, Finance, etc.), BCom, BCA, BSc (CS, Electronics, etc.), BA.<br><strong>PG:</strong> MCA, MCom, MA Economics, MSc Psychology/Maths.";
        } else if (query.includes('club') || query.includes('student support')) {
            response = "We have vibrant student clubs like DISHA, Rotaract, CSA, and more! Visit our <strong>Student Support</strong> page to explore them.";
        } else if (query.includes('recruit') || query.includes('partner') || query.includes('placement')) {
            response = "We are proud to have top recruitment partners like Accenture, Amazon, Toyota, Infosys, and many more! Check our 'Recruitment Partners' section on the home page.";
        } else if (query.includes('fee')) {
            response = "Fee structures vary by course. Please contact the accounts office using the number below or visit us for details.";
        } else if (query.includes('location')) {
            response = "We are located in <strong>Electronic City, Bengaluru</strong>. A hub of technology and innovation! 🏙️";
        } else if (query.includes('placement')) {
            response = "Our placement cell is very active! Top recruiters visit every year. We provide training for interviews and soft skills.";
        } else if (query.includes('contact') || query.includes('phone')) {
            response = "You can reach us at <strong>+91 80 2783 2165</strong> or email <strong>contact@sfscollege.in</strong>.";
        }

        addMessage(response, 'bot');
    }

    if (sendMessage) {
        sendMessage.addEventListener('click', handleUserQuery);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserQuery();
        });
    }
});
