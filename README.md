# Rule-Based Website Chatbot - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [API Documentation](#api-documentation)
6. [Widget Integration](#widget-integration)
7. [Admin Dashboard](#admin-dashboard)
8. [Customization Guide](#customization-guide)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a **rule-based website chatbot** system designed to integrate into any website for instant customer support. It's built on predefined FAQ matching rather than AI, making it lightweight, fast, and fully controllable.

### Key Features:
- ✅ **Rule-Based Matching** - Uses intelligent keyword matching, not AI
- ✅ **Easy Integration** - Single script embed on any website
- ✅ **Admin Dashboard** - Manage FAQs without coding
- ✅ **JSON Support** - Import/export FAQs from JSON files
- ✅ **Floating Widget** - Modern, responsive chat interface
- ✅ **No Dependencies** - Widget uses vanilla JavaScript
- ✅ **Fast & Lightweight** - Minimal API calls, optimized matching

---

## ✨ Features

### For Website Visitors:
- Floating chat icon on website
- Clean, modern chat interface
- Light and dark themes
- Mobile responsive design
- Instant answers from FAQ database
- Graceful fallback to support contact info

### For Administrators:
- Web-based dashboard to manage FAQs
- Add, edit, delete questions and answers
- Keyword management for better matching
- Import/export FAQs as JSON
- Real-time FAQ count dashboard
- Search and filter functionality

### For Developers:
- RESTful API for all operations
- Simple JSON file storage
- CORS enabled for cross-origin requests
- Easy to extend and customize
- Well-documented code

---

## 📁 Project Structure

```
chatbot/
├── backend/                 # Node.js/Express API server
│   ├── server.js           # Main server file with all endpoints
│   ├── package.json        # Dependencies
│   └── data/
│       └── faqs.json       # FAQ database (JSON storage)
│
├── widget/                 # Chatbot widget for websites
│   ├── chatbot-widget.js   # Embeddable JavaScript widget
│   └── example-website.html # Demo integration example
│
├── admin/                  # Admin dashboard
│   └── index.html          # Web-based dashboard for managing FAQs
│
└── docs/                   # Documentation
    └── README.md           # This file

```

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **Modern web browser** for admin dashboard

### Step 1: Install Backend Dependencies

```bash
cd chatbot/backend
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin request handling
- `body-parser` - Request parsing
- `uuid` - Unique ID generation

### Step 2: Start the Backend Server

```bash
npm start
# or for development
npm run dev
```

The server will start at: **http://localhost:5000**

You should see:
```
Chatbot API running on http://localhost:5000
Chat endpoint: http://localhost:5000/api/chat
FAQs endpoint: http://localhost:5000/api/faqs
```

### Step 3: Access the Admin Dashboard

Open in your browser:
```
http://localhost:5000/admin
```

The dashboard loads automatically from the Express server.

You can also:
- View example website: `http://localhost:5000/example`
- Check API: `http://localhost:5000/api/faqs`
- Get widget script: `http://localhost:5000/chatbot-widget.js`

### Step 4: Test the Integration

1. Visit example website at `http://localhost:5000/example`
2. Click the floating chat icon in the bottom right
3. Ask a question like "What are your business hours?"
4. You should get an instant answer!

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. **Health Check**
Get API status

```http
GET /api/health
```

**Response:**
```json
{
  "status": "API is running"
}
```

---

#### 2. **Chat - Rule-Based Matching**
Send a message and get the best matching answer

```http
POST /api/chat
Content-Type: application/json

{
  "message": "What are your business hours?"
}
```

**Response (Match Found):**
```json
{
  "success": true,
  "answer": "We are open Monday to Friday, 9:00 AM to 6:00 PM...",
  "question": "What are your business hours?",
  "confidence": "high",
  "faqId": "1"
}
```

**Response (No Match):**
```json
{
  "success": false,
  "answer": "I couldn't find a matching answer. Please contact support...",
  "question": null,
  "confidence": "low"
}
```

---

#### 3. **Get All FAQs**
Retrieve all questions and answers

```http
GET /api/faqs
```

**Response:**
```json
{
  "faqs": [
    {
      "id": "1",
      "question": "What is your company?",
      "keywords": ["company", "about", "who are you"],
      "answer": "We are a leading digital solutions provider..."
    },
    ...
  ]
}
```

---

#### 4. **Get Single FAQ**
Retrieve a specific FAQ by ID

```http
GET /api/faqs/:id
```

**Response:**
```json
{
  "id": "1",
  "question": "What is your company?",
  "keywords": ["company", "about", "who are you"],
  "answer": "We are a leading digital solutions provider..."
}
```

---

#### 5. **Create New FAQ**
Add a new question and answer

```http
POST /api/faqs
Content-Type: application/json

{
  "question": "Do you offer support?",
  "keywords": ["support", "help", "assistance"],
  "answer": "Yes, we offer 24/7 customer support via email and phone."
}
```

**Response:**
```json
{
  "id": "9",
  "question": "Do you offer support?",
  "keywords": ["support", "help", "assistance"],
  "answer": "Yes, we offer 24/7 customer support via email and phone."
}
```

---

#### 6. **Update FAQ**
Modify an existing FAQ

```http
PUT /api/faqs/:id
Content-Type: application/json

{
  "question": "Updated question?",
  "keywords": ["updated", "keywords"],
  "answer": "Updated answer..."
}
```

**Response:**
```json
{
  "id": "1",
  "question": "Updated question?",
  "keywords": ["updated", "keywords"],
  "answer": "Updated answer..."
}
```

---

#### 7. **Delete FAQ**
Remove a question and answer

```http
DELETE /api/faqs/:id
```

**Response:**
```json
{
  "message": "FAQ deleted",
  "deletedFAQ": {
    "id": "1",
    "question": "What is your company?",
    ...
  }
}
```

---

## 💬 Widget Integration

### Quick Start

Add this code to your website's HTML:

```html
<!-- Load the chatbot widget -->
<script src="http://localhost:5000/chatbot-widget.js"></script>

<!-- Initialize the chatbot -->
<script>
  ChatbotWidget.init({
    apiUrl: 'http://localhost:5000',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

### Configuration Options

```javascript
ChatbotWidget.init({
  // (Required) Backend API URL
  apiUrl: 'http://localhost:5000',
  
  // (Optional) Widget position: 'bottom-right' or 'bottom-left'
  position: 'bottom-right',
  
  // (Optional) Theme: 'light' or 'dark'
  theme: 'light',
  
  // (Optional) Chat window title
  widgetTitle: 'Chat with us',
  
  // (Optional) Input placeholder text
  placeholder: 'Ask me anything...',
  
  // (Optional) Welcome message
  defaultMessage: 'Hello! How can I help you today?'
});
```

### Alternative: Auto-Initialize via Data Attributes

If loading the widget script, you can auto-initialize using data attributes:

```html
<script 
  src="http://localhost:5000/chatbot-widget.js"
  data-api-url="http://localhost:5000"
  data-position="bottom-right"
  data-theme="light">
</script>
```

### Widget CSS Classes

You can style the widget by targeting these classes:

```css
#chatbot-widget-container    /* Main container */
#chatbot-icon               /* Floating icon */
#chatbot-window             /* Chat window */
.chatbot-header            /* Header section */
.chatbot-messages          /* Messages container */
.chatbot-message.bot       /* Bot message */
.chatbot-message.user      /* User message */
.chatbot-input-area        /* Input section */
```

### Customizing the Widget

To customize colors, edit the widget's CSS variables:

The widget uses CSS custom properties for theming:

**Light theme:**
```css
--primary-color: #007bff;
--bg-color: #ffffff;
--text-color: #333333;
```

**Dark theme:**
```css
--primary-color: #00d4ff;
--bg-color: #1e1e1e;
--text-color: #ffffff;
```

---

## 📊 Admin Dashboard

### Accessing the Dashboard

1. **Via Browser:**
   ```
   http://localhost:5000/admin/
   ```

2. **Direct File:**
   ```
   Open widget/admin/index.html in a browser
   ```

### Dashboard Features

#### Add New FAQ
1. Click "Add New FAQ" button
2. Enter question, answer, and keywords
3. Click "Save FAQ"

**Example:**
- Question: "What payment methods do you accept?"
- Answer: "We accept all major credit cards and PayPal."
- Keywords: "payment, credit card, accept, method"

#### Edit FAQ
1. Click "Edit" button on any FAQ row
2. Modify the fields
3. Click "Save FAQ"

#### Delete FAQ
1. Click "Delete" button on any FAQ row
2. Confirm deletion

#### Search FAQs
Use the search box to filter FAQs by:
- Question text
- Answer text
- Keywords

#### Export FAQs
1. Click "Export FAQs" button
2. JSON file downloads locally
3. Use for backup or sharing

#### Import FAQs
1. Click "Import FAQs" button
2. Select a JSON file with format:
```json
{
  "faqs": [
    {
      "question": "...",
      "keywords": ["..."],
      "answer": "..."
    }
  ]
}
```

#### View Statistics
- Total FAQs count
- API connection status

---

## 🎨 Customization Guide

### 1. Change Widget Position

```javascript
ChatbotWidget.init({
  position: 'bottom-left'  // 'bottom-right' or 'bottom-left'
});
```

### 2. Change Theme

```javascript
ChatbotWidget.init({
  theme: 'dark'  // 'light' or 'dark'
});
```

### 3. Customize Messages

```javascript
ChatbotWidget.init({
  widgetTitle: 'Customer Support',
  placeholder: 'Type your question here...',
  defaultMessage: 'Welcome! I\'m here to help. What can I do for you?'
});
```

### 4. Change Default Contact Message

Edit `backend/server.js` in the `/api/chat` endpoint:

```javascript
app.post('/api/chat', (req, res) => {
  // ... existing code ...
  
  res.json({
    success: false,
    answer: 'I couldn\'t find an answer. Email: support@yoursite.com',
    question: null,
    confidence: 'low'
  });
});
```

### 5. Modify Matching Algorithm

The rule-based matching algorithm in `backend/server.js` uses:
- **Keyword matching** (highest weight)
- **Question text matching** (medium weight)
- **Partial matching** (lowest weight)

You can adjust the scoring in the `findBestMatch()` function:

```javascript
// Increase keyword match weight
keywords.forEach(keyword => {
  if (keyword.includes(word) || word.includes(keyword)) {
    score += 3;  // Changed from 2
  }
});
```

### 6. Styling the Admin Dashboard

The dashboard CSS is embedded in `admin/index.html`. You can modify:
- Colors in CSS variables
- Font sizes
- Spacing and layout
- Responsive breakpoints

---

## 📝 FAQ JSON Format

Your FAQs are stored as JSON. Here's the format:

```json
{
  "faqs": [
    {
      "id": "unique-id",
      "question": "What is your company?",
      "keywords": [
        "company",
        "about",
        "who are you",
        "what is"
      ],
      "answer": "We are a leading digital solutions provider."
    },
    {
      "id": "unique-id-2",
      "question": "How can I contact you?",
      "keywords": [
        "contact",
        "email",
        "phone",
        "support"
      ],
      "answer": "Contact us at support@example.com or call +1-800-123-4567"
    }
  ]
}
```

### Important Notes:
- `id`: Unique identifier (UUID)
- `question`: The user-facing question
- `keywords`: List of keywords for matching (lowercase recommended)
- `answer`: The response to show users

---

## 🌍 Production Deployment

### Before Going Live:

1. **Change API URL** in your website:
   ```javascript
   ChatbotWidget.init({
     apiUrl: 'https://your-api-domain.com'
   });
   ```

2. **Enable CORS** for your domain in `server.js`:
   ```javascript
   app.use(cors({
     origin: 'https://your-website.com'
   }));
   ```

3. **Use HTTPS** for security

4. **Database Alternative** (optional):
   Replace JSON file storage with a database like MongoDB or PostgreSQL for:
   - Better performance
   - Real-time updates
   - Multi-server deployments

5. **Add Rate Limiting** to prevent abuse:
   ```bash
   npm install express-rate-limit
   ```

6. **Set Environment Variables**:
   ```bash
   PORT=5000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-website.com
   ```

### Deployment Platforms:
- **Heroku** - Free tier available
- **Railway** - Modern alternative
- **Render** - Easy deployment
- **AWS** - Scalable option
- **DigitalOcean** - Affordable VPS

---

## 🐛 Troubleshooting

### Issue: "API is running on http://localhost:5000" but widget shows no responses

**Solution:**
1. Verify API is actually running: `curl http://localhost:5000/api/health`
2. Check browser console for errors (F12)
3. Ensure API URL in widget config matches: `http://localhost:5000`
4. Check CORS headers are correct

### Issue: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
The backend already has CORS enabled. If still having issues:
```javascript
// In backend/server.js
app.use(cors({
  origin: '*'  // Allow all origins (development only)
}));
```

### Issue: FAQs not appearing in dashboard

**Solution:**
1. Check that `backend/data/faqs.json` exists
2. Verify API response: `curl http://localhost:5000/api/faqs`
3. Check for file permission issues
4. Restart the API server

### Issue: Matching not finding answers

**Solution:**
1. Use **better keywords** for each FAQ
2. Make keywords **lowercase**
3. Add **synonym keywords** (e.g., "hours", "open", "timing", "when")
4. Test matching threshold in `backend/server.js` (currently set to 2)

### Issue: Widget not appearing on website

**Solution:**
1. Check script is loading: Look in DevTools Network tab
2. Verify API URL is correct
3. Check for JavaScript errors in console
4. Ensure script tag is placed before closing `</body>` tag

---

## 📞 Support & Contact

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation
3. Check browser console for errors
4. Verify faqs.json file format

---

## 📄 License

MIT License - Feel free to use and modify

---

## 🎉 Thank You!

Built with ❤️ for providing instant customer support
