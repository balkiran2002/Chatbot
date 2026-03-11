# 🚀 Quick Start Guide - Rule-Based Chatbot

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
cd backend
npm install
```

### Step 2: Start the Server (1 minute)

```bash
npm start
```

Expected output:
```
Chatbot API running on http://localhost:5000
Chat endpoint: http://localhost:5000/api/chat
FAQs endpoint: http://localhost:5000/api/faqs
```

✅ **API is now running!**

---

## 📋 Add Custom FAQs

### Option A: Using Admin Dashboard

1. Open browser: `http://localhost:5000/admin/` 
   or directly open `admin/index.html`

2. Click **"+ Add New FAQ"**

3. Fill in:
   - **Question:** "What's your return policy?"
   - **Answer:** "We offer 30-day returns on all products"
   - **Keywords:** "return, policy, refund, money back"

4. Click **"Save FAQ"**

### Option B: Using JSON Import

1. Create `faqs.json`:
```json
{
  "faqs": [
    {
      "question": "Do you have a mobile app?",
      "keywords": ["app", "mobile", "download", "ios", "android"],
      "answer": "Yes! Download our app on iOS and Android."
    }
  ]
}
```

2. In Admin Dashboard → Click **"📤 Import FAQs"**
3. Select your JSON file
4. Done! ✅

---

## 💻 Integrate Chatbot Into Your Website

### Simple Integration (Copy & Paste)

Add this code to your HTML before closing `</body>` tag:

```html
<!-- Chatbot Widget -->
<script src="http://localhost:5000/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'http://localhost:5000',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

That's it! Your site now has a chatbot! 🎉

---

## 🧪 Test It Out

1. Click the floating chat icon (bottom right)
2. Try asking:
   - "What are your business hours?"
   - "How do I contact you?"
   - "What's your pricing?"
3. Get instant answers!

---

## 🎨 Customize the Widget

### Change Position
```javascript
ChatbotWidget.init({
  position: 'bottom-left'  // or 'bottom-right'
});
```

### Dark Theme
```javascript
ChatbotWidget.init({
  theme: 'dark'  // or 'light'
});
```

### Custom Messages
```javascript
ChatbotWidget.init({
  widgetTitle: 'Need Help?',
  placeholder: 'Ask me...',
  defaultMessage: 'Hi there! 👋'
});
```

---

## 🛠️ How the Matching Works

The chatbot uses **rule-based keyword matching**:

```
User asks: "When do you open?"
         ↓
System analyzes keywords: ["when", "open"]
         ↓
Searches FAQ keywords for matches
         ↓
Finds FAQ: "What are your business hours?"
Keywords: ["hours", "open", "timing", "when"]
         ↓
Returns answer: "We are open Monday to Friday..."
```

**Better keywords = Better matches** ✨

---

## 📁 File Structure Overview

```
chatbot/
├── backend/
│   ├── server.js          ← API logic
│   ├── package.json       ← Dependencies
│   └── data/faqs.json     ← Your FAQ database
│
├── widget/
│   ├── chatbot-widget.js  ← Embed this on your site
│   └── example-website.html ← Demo page
│
├── admin/
│   └── index.html         ← Manage FAQs here
│
└── README.md              ← Full documentation
```

---

## 🚦 Common Tasks

### View All FAQs
Open: `http://localhost:5000/api/faqs`

### Chat with Bot
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your business hours?"}'
```

### Export FAQs
In Admin Dashboard → Click **"📥 Export FAQs"**

### Clear All FAQs
1. Delete each FAQ in Admin Dashboard, OR
2. Reset `backend/data/faqs.json` to default

---

## ✅ Success Checklist

- [ ] Backend is running on http://localhost:5000
- [ ] Admin dashboard loads at http://localhost:5000/admin/
- [ ] Can add new FAQs
- [ ] Chatbot responds to test questions
- [ ] Widget appears on example website
- [ ] Widget appears on your website

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 already in use | Change PORT in backend/server.js |
| npm install fails | Run `npm install` again or delete node_modules |
| No FAQs showing | Check backend/data/faqs.json exists |
| Chatbot not responding | Verify apiUrl in widget config |
| CORS Error | Already fixed in backend, try refreshing |

---

## 🌐 Production Deployment

Before deploying:

1. **Update API URL** in widget:
```javascript
apiUrl: 'https://your-api.com'  // Instead of localhost
```

2. **Enable CORS** for your domain in server.js

3. **Use HTTPS** for security

4. **Deploy to:** Heroku, Railway, Render, AWS, DigitalOcean, etc.

---

## 📚 Resources

- **Full Docs:** See `README.md`
- **API Docs:** See API section in `README.md`
- **Example Site:** Open `widget/example-website.html`

---

## 💡 Tips for Better Results

1. **Use descriptive questions:** "What are your business hours?" instead of "Hours?"
2. **Add multiple keywords:** Include synonyms and related terms
3. **Keep answers concise:** Shorter is better for chat
4. **Test your FAQs:** Ask various ways to verify matching
5. **Update regularly:** Keep FAQs fresh and relevant

---

## 🎯 What's Next?

1. ✅ Get server running
2. ✅ Add your FAQs
3. ✅ Embed on your website
4. ✅ Customize appearance
5. ✅ Deploy to production

**Enjoy your new chatbot!** 🚀
