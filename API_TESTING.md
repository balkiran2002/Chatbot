# 🔌 API Testing & Examples

Complete guide to test the Rule-Based Chatbot API

## 🚀 Quick Start - Test the APIs

### Using cURL (Command Line)

#### 1. Check API Health
```bash
curl http://localhost:5000/api/health
```
Expected response:
```json
{"status": "API is running"}
```

#### 2. Get All FAQs
```bash
curl http://localhost:5000/api/faqs
```

#### 3. Chat with Chatbot
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your business hours?"}'
```

---

## 📋 API Endpoints Reference

### 1️⃣ Health Check
**Purpose:** Verify API is running

```http
GET /api/health
```

**cURL:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "API is running"
}
```

---

### 2️⃣ Chat Endpoint (Most Important!)
**Purpose:** Send message and get answer

```http
POST /api/chat
Content-Type: application/json

{
  "message": "your question here"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your business hours?"}'
```

**Response - Match Found:**
```json
{
  "success": true,
  "answer": "We are open Monday to Friday, 9:00 AM to 6:00 PM. We're closed on weekends and public holidays.",
  "question": "What are your business hours?",
  "confidence": "high",
  "faqId": "2"
}
```

**Response - No Match:**
```json
{
  "success": false,
  "answer": "I couldn't find a matching answer. Please contact support at support@example.com or call +1-800-123-4567.",
  "question": null,
  "confidence": "low"
}
```

---

### 3️⃣ Get All FAQs
**Purpose:** Retrieve all Q&A pairs

```http
GET /api/faqs
```

**cURL:**
```bash
curl http://localhost:5000/api/faqs
```

**Response:**
```json
{
  "faqs": [
    {
      "id": "1",
      "question": "What is your company?",
      "keywords": ["company", "about", "who are you", "what is"],
      "answer": "We are a leading digital solutions provider..."
    },
    {
      "id": "2",
      "question": "What are your business hours?",
      "keywords": ["hours", "open", "timing", "when", "available"],
      "answer": "We are open Monday to Friday, 9:00 AM to 6:00 PM..."
    }
  ]
}
```

---

### 4️⃣ Get Single FAQ
**Purpose:** Retrieve specific Q&A by ID

```http
GET /api/faqs/:id
```

**cURL:**
```bash
curl http://localhost:5000/api/faqs/1
```

**Response:**
```json
{
  "id": "1",
  "question": "What is your company?",
  "keywords": ["company", "about", "who are you", "what is"],
  "answer": "We are a leading digital solutions provider..."
}
```

**Error Response (Not Found):**
```json
{
  "error": "FAQ not found"
}
```

---

### 5️⃣ Create New FAQ
**Purpose:** Add new question and answer

```http
POST /api/faqs
Content-Type: application/json

{
  "question": "Do you offer support?",
  "keywords": ["support", "help", "assistance", "team"],
  "answer": "Yes, we offer 24/7 customer support via email and phone."
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Do you offer support?",
    "keywords": ["support", "help", "assistance"],
    "answer": "Yes, we offer 24/7 support"
  }'
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "question": "Do you offer support?",
  "keywords": ["support", "help", "assistance"],
  "answer": "Yes, we offer 24/7 customer support via email and phone."
}
```

---

### 6️⃣ Update FAQ
**Purpose:** Modify existing Q&A

```http
PUT /api/faqs/:id
Content-Type: application/json

{
  "question": "Updated question?",
  "keywords": ["updated", "keywords"],
  "answer": "Updated answer text..."
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/faqs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What does your company do?",
    "keywords": ["company", "services", "do", "offer"],
    "answer": "We provide digital solutions and consulting"
  }'
```

**Response:**
```json
{
  "id": "1",
  "question": "What does your company do?",
  "keywords": ["company", "services", "do", "offer"],
  "answer": "We provide digital solutions and consulting"
}
```

---

### 7️⃣ Delete FAQ
**Purpose:** Remove Q&A

```http
DELETE /api/faqs/:id
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/faqs/1
```

**Response:**
```json
{
  "message": "FAQ deleted",
  "deletedFAQ": {
    "id": "1",
    "question": "What is your company?",
    "keywords": ["company", "about"],
    "answer": "..."
  }
}
```

---

## 🧪 Testing Scenarios

### Scenario 1: Add FAQ & Test Matching

```bash
# Step 1: Add new FAQ
curl -X POST http://localhost:5000/api/faqs \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Do you offer a free trial?",
    "keywords": ["free", "trial", "test", "no charge"],
    "answer": "Yes! We offer a 14-day free trial. No credit card needed."
  }'

# Step 2: Ask similar question to test matching
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Is there a free trial?"}'

# You should get the answer you added!
```

### Scenario 2: Full FAQ Management

```bash
# Get all FAQs
curl http://localhost:5000/api/faqs

# Store ID from response (let's say "123")

# Update that FAQ
curl -X PUT http://localhost:5000/api/faqs/123 \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Do you have a trial period?",
    "keywords": ["trial", "period", "test", "free"],
    "answer": "Yes, 7-day trial available"
  }'

# Delete the FAQ
curl -X DELETE http://localhost:5000/api/faqs/123
```

---

## 🧠 Understanding Matching

### How Keywords Help

**FAQ Setup:**
```json
{
  "question": "What are your business hours?",
  "keywords": ["hours", "open", "timing", "when", "available"],
  "answer": "Monday-Friday, 9AM-6PM"
}
```

**Test Different Questions:**

✅ **Exact keyword match:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your hours?"}'
# MATCH: Contains keyword "hours"
```

✅ **Multiple keyword match:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "When are you open?"}'
# MATCH: Contains keywords "when" and "open"
```

✅ **Related question:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "When can I visit?"}'
# MATCH: Contains keyword "when"
```

❌ **No match:**
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is your address?"}'
# NO MATCH: No matching keywords
```

---

## 💻 JavaScript Testing

### Using Fetch API

```javascript
// Test health check
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('Status:', d));

// Get all FAQs
fetch('http://localhost:5000/api/faqs')
  .then(r => r.json())
  .then(d => console.log('FAQs:', d));

// Send chat message
fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'What are your hours?' })
})
  .then(r => r.json())
  .then(d => console.log('Answer:', d.answer));

// Add new FAQ
fetch('http://localhost:5000/api/faqs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: 'Do you have shipping?',
    keywords: ['shipping', 'delivery', 'cost'],
    answer: 'Yes, free shipping on orders over $50'
  })
})
  .then(r => r.json())
  .then(d => console.log('Created:', d));
```

---

## 📊 Postman Collection

Import this into Postman:

```json
{
  "info": {
    "name": "Chatbot API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    },
    {
      "name": "Chat",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/chat",
        "body": {
          "raw": "{\"message\": \"What are your hours?\"}"
        }
      }
    },
    {
      "name": "Get All FAQs",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/faqs"
      }
    },
    {
      "name": "Create FAQ",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/faqs",
        "body": {
          "raw": "{\"question\": \"Test?\", \"keywords\": [\"test\"], \"answer\": \"Testing\"}"
        }
      }
    }
  ]
}
```

---

## 🔍 Error Handling

### Common Errors

**Missing required field:**
```json
{
  "error": "Question, keywords, and answer are required"
}
```

**FAQ not found:**
```json
{
  "error": "FAQ not found"
}
```

**Invalid message:**
```json
{
  "error": "Message cannot be empty"
}
```

**API down:**
```
Connection refused - API not running
```

---

## ⚡ Performance Testing

### Simple Load Test

```bash
# Simulate 10 rapidfireRequests
for i in {1..10}; do
  curl -X POST http://localhost:5000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message": "What are your hours?"}' &
done
wait
echo "10 requests completed"
```

### Response Time

Expected times:
- Health check: <10ms
- Get FAQs: <50ms
- Chat (match found): <50ms
- Create FAQ: <50ms

---

## 🧩 Integration Examples

### Example 1: Node.js App

```javascript
const fetch = require('node-fetch');

async function chatbot(message) {
  const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return response.json();
}

// Usage
chatbot('What are your business hours?')
  .then(result => console.log(result.answer));
```

### Example 2: Python

```python
import requests
import json

def chat(message):
    response = requests.post(
        'http://localhost:5000/api/chat',
        json={'message': message}
    )
    return response.json()

# Usage
result = chat('What are your business hours?')
print(result['answer'])
```

### Example 3: React

```jsx
import { useState } from 'react';

function ChatWidget() {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');

  const sendMessage = async () => {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <div>{answer}</div>
    </div>
  );
}
```

---

## ✅ Checklist for Testing

- [ ] Health check works
- [ ] Can retrieve all FAQs
- [ ] Can create new FAQ
- [ ] Can update FAQ
- [ ] Can delete FAQ
- [ ] Chat endpoint returns answers
- [ ] No match returns default message
- [ ] Keywords work for matching
- [ ] Admin dashboard loads
- [ ] Example website works
- [ ] Widget appears on page
- [ ] Widget responds to messages

---

## 📝 Notes

- All responses are JSON
- POST requests require `Content-Type: application/json` header
- IDs are UUIDs (unique for each FAQ)
- Keywords are case-insensitive
- Matching threshold is 2 points minimum
- No authentication required (development mode)

---

**Happy testing!** 🧪✨
