// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChat');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message on button click
    sendBtn.addEventListener('click', function() {
        sendMessage();
    });

    // Send message on Enter (Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            userInput.value = message;
            sendMessage();
        });
    });

    // Clear chat functionality
    clearChatBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            // Keep only the initial bot message
            const messages = chatMessages.querySelectorAll('.message');
            messages.forEach((msg, index) => {
                if (index > 0) { // Skip the first message (welcome message)
                    msg.remove();
                }
            });
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        
        if (!message) {
            return;
        }

        // Disable input while processing
        userInput.disabled = true;
        sendBtn.disabled = true;

        // Add user message to chat
        addMessage(message, 'user');

        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';

        // Show typing indicator
        showTypingIndicator();

        // Send message to backend
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            hideTypingIndicator();

            // Add bot response
            if (data.response) {
                addMessage(data.response, 'bot');
            } else if (data.error) {
                addMessage('Sorry, there was an error processing your request. Please try again.', 'bot');
            }
        })
        .catch(error => {
            hideTypingIndicator();
            console.error('Error:', error);
            addMessage('Sorry, there was an error connecting to the server. Please try again.', 'bot');
        })
        .finally(() => {
            // Re-enable input
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus();
        });
    }

    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Convert markdown-like formatting to HTML
        const formattedContent = formatMessage(content);
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function formatMessage(content) {
        // Convert basic markdown-like formatting
        let formatted = content
            // Bold text **text**
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Convert line breaks
            .replace(/\n/g, '<br>')
            // Convert bullet points
            .replace(/^- (.*?)(<br>|$)/gm, '<ul><li>$1</li></ul>')
            .replace(/<\/ul><br><ul>/g, '')
            .replace(/<\/ul><ul>/g, '');
        
        // Handle numbered lists
        formatted = formatted.replace(/^\d+\.\s+(.*?)(<br>|$)/gm, function(match, p1) {
            return '<ol><li>' + p1 + '</li></ol>';
        });
        formatted = formatted.replace(/<\/ol><br><ol>/g, '').replace(/<\/ol><ol>/g, '');
        
        return formatted;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator active';
        typingDiv.id = 'typingIndicator';
        
        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'typing-dots';
        dotsDiv.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(dotsDiv);
        chatMessages.appendChild(typingDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Focus on input on page load
    userInput.focus();

    // Add timestamp to console for QA testing
    console.log('Career Kaki Staging - Loaded at:', new Date().toISOString());
    console.log('Version: 1.0.0-staging');
    console.log('Note: All bot responses are hardcoded for QA testing');
});

// Health check function for QA testing
function checkHealth() {
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('Health Check:', data);
            return data;
        })
        .catch(error => {
            console.error('Health Check Failed:', error);
        });
}

// Expose health check function globally for QA team
window.checkHealth = checkHealth;

// Staging environment notice
console.log('Note: All messages will receive the same staging response');
