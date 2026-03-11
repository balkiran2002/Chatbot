/**
 * Rule-Based Chatbot Widget
 * Simple script to embed a floating chatbot on any website
 * 
 * Usage:
 * <script src="https://your-domain.com/chatbot-widget.js"></script>
 * <script>
 *   ChatbotWidget.init({
 *     apiUrl: 'http://localhost:5000',
 *     position: 'bottom-right', // bottom-right, bottom-left
 *     theme: 'light' // light, dark
 *   });
 * </script>
 */

const ChatbotWidget = {
  config: {
    apiUrl: 'http://localhost:5000',
    position: 'bottom-right',
    theme: 'light',
    widgetTitle: 'Chat with us',
    placeholder: 'Ask me anything...',
    defaultMessage: 'Hello! How can I help you today?'
  },

  state: {
    isOpen: false,
    messages: []
  },

  /**
   * Initialize the chatbot widget
   */
  init(options = {}) {
    this.config = { ...this.config, ...options };
    this.createWidget();
    this.attachEventListeners();
  },

  /**
   * Create the chatbot widget DOM elements
   */
  createWidget() {
    // Create container
    const container = document.createElement('div');
    container.id = 'chatbot-widget-container';
    container.className = `chatbot-widget-${this.config.theme}`;

    // Floating icon
    const icon = document.createElement('div');
    icon.id = 'chatbot-icon';
    icon.className = `chatbot-icon chatbot-position-${this.config.position}`;
    icon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>
      </svg>
    `;

    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.className = `chatbot-window chatbot-position-${this.config.position} hidden`;

    // Header
    const header = document.createElement('div');
    header.className = 'chatbot-header';
    header.innerHTML = `
      <h3>${this.config.widgetTitle}</h3>
      <button id="chatbot-close" class="chatbot-close-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    // Messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'chatbot-messages';
    messagesContainer.className = 'chatbot-messages';

    // Input area
    const inputArea = document.createElement('div');
    inputArea.className = 'chatbot-input-area';
    inputArea.innerHTML = `
      <input type="text" id="chatbot-input" placeholder="${this.config.placeholder}" />
      <button id="chatbot-send" class="chatbot-send-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    `;

    // Assemble chat window
    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);

    // Inject into page
    container.appendChild(icon);
    container.appendChild(chatWindow);
    document.body.appendChild(container);

    // Inject styles
    this.injectStyles();

    // Add welcome message (AFTER DOM is ready)
    this.addBotMessage(this.config.defaultMessage);
  },

  /**
   * Inject CSS styles for the chatbot widget
   */
  injectStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      * {
        box-sizing: border-box;
      }

      #chatbot-widget-container {
        position: fixed;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }

      .chatbot-widget-light {
        --primary-color: #007bff;
        --bg-color: #ffffff;
        --text-color: #333333;
        --border-color: #e0e0e0;
        --bot-bg: #f0f0f0;
        --user-bg: #007bff;
        --user-text: #ffffff;
      }

      .chatbot-widget-dark {
        --primary-color: #00d4ff;
        --bg-color: #1e1e1e;
        --text-color: #ffffff;
        --border-color: #404040;
        --bot-bg: #2a2a2a;
        --user-bg: #00d4ff;
        --user-text: #000000;
      }

      /* Floating Icon */
      .chatbot-icon {
        width: 56px;
        height: 56px;
        background: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: white;
        transition: all 0.3s ease;
      }

      .chatbot-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }

      .chatbot-position-bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .chatbot-position-bottom-left {
        bottom: 20px;
        left: 20px;
      }

      /* Chat Window */
      .chatbot-window {
        position: fixed;
        width: 380px;
        height: 500px;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease;
      }

      .chatbot-window.hidden {
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
      }

      .chatbot-window.visible {
        opacity: 1;
        pointer-events: all;
        transform: translateY(0);
      }

      /* Header */
      .chatbot-header {
        background: var(--primary-color);
        color: white;
        padding: 16px;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chatbot-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .chatbot-close-btn {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .chatbot-close-btn:hover {
        opacity: 0.8;
      }

      /* Messages */
      .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .chatbot-message {
        display: flex;
        animation: slideIn 0.3s ease;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .chatbot-message.bot {
        justify-content: flex-start;
      }

      .chatbot-message.user {
        justify-content: flex-end;
      }

      .chatbot-message-content {
        max-width: 70%;
        padding: 10px 14px;
        border-radius: 8px;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
      }

      .chatbot-message.bot .chatbot-message-content {
        background: var(--bot-bg);
        color: var(--text-color);
        border-bottom-left-radius: 2px;
      }

      .chatbot-message.user .chatbot-message-content {
        background: var(--user-bg);
        color: var(--user-text);
        border-bottom-right-radius: 2px;
      }

      /* Input Area */
      .chatbot-input-area {
        border-top: 1px solid var(--border-color);
        padding: 12px;
        display: flex;
        gap: 8px;
      }

      #chatbot-input {
        flex: 1;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 14px;
        outline: none;
        background: var(--bg-color);
        color: var(--text-color);
        transition: border-color 0.3s ease;
      }

      #chatbot-input:focus {
        border-color: var(--primary-color);
      }

      .chatbot-send-btn {
        background: var(--primary-color);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
      }

      .chatbot-send-btn:hover {
        opacity: 0.9;
      }

      .chatbot-send-btn:active {
        transform: scale(0.95);
      }

      /* Scrollbar styling */
      .chatbot-messages::-webkit-scrollbar {
        width: 6px;
      }

      .chatbot-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      .chatbot-messages::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 3px;
      }

      .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: var(--primary-color);
      }

      /* Responsive */
      @media (max-width: 480px) {
        .chatbot-window {
          width: calc(100vw - 32px);
          height: calc(100vh - 32px);
          max-width: 100%;
          max-height: 100%;
        }

        .chatbot-message-content {
          max-width: 85%;
        }
      }
    `;
    document.head.appendChild(styles);
  },

  /**
   * Add bot message to chat
   */
  addBotMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message bot';
    messageDiv.innerHTML = `<div class="chatbot-message-content">${this.escapeHtml(text)}</div>`;
    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  },

  /**
   * Add user message to chat
   */
  addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message user';
    messageDiv.innerHTML = `<div class="chatbot-message-content">${this.escapeHtml(text)}</div>`;
    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  },

  /**
   * Scroll messages to bottom
   */
  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 0);
  },

  /**
   * Send message to chatbot API
   */
  async sendMessage(message) {
    try {
      const response = await fetch(`${this.config.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chatbot error:', error);
      return {
        success: false,
        answer: 'Sorry, I encountered an error. Please try again later or contact our support team.'
      };
    }
  },

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const icon = document.getElementById('chatbot-icon');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const chatWindow = document.getElementById('chatbot-window');

    // Toggle chat window
    icon.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
      chatWindow.classList.toggle('visible');
    });

    // Close button
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
      chatWindow.classList.remove('visible');
    });

    // Send message on button click
    sendBtn.addEventListener('click', () => {
      this.handleSendMessage();
    });

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSendMessage();
      }
    });
  },

  /**
   * Handle sending message
   */
  async handleSendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message === '') return;

    // Add user message
    this.addUserMessage(message);
    input.value = '';

    // Show typing indicator
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="chatbot-message-content">
        <span>.</span><span>.</span><span>.</span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();

    // Get response from API
    const response = await this.sendMessage(message);

    // Remove typing indicator
    typingDiv.remove();

    // Add bot response
    if (response.success || response.answer) {
      this.addBotMessage(response.answer);
    } else {
      this.addBotMessage('Sorry, I couldn\'t understand your question. Please try rephrasing it.');
    }
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Auto-initialize if data attributes are provided
document.addEventListener('DOMContentLoaded', () => {
  const script = document.currentScript;
  if (script && script.dataset.apiUrl) {
    ChatbotWidget.init({
      apiUrl: script.dataset.apiUrl,
      position: script.dataset.position || 'bottom-right',
      theme: script.dataset.theme || 'light'
    });
  }
});
