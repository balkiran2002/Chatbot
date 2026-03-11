# 🔗 Chatbot Integration Guide

Complete guide for integrating the rule-based chatbot into your website.

## Installation Options

### Option 1: Local Development (Easiest)

Perfect for testing and development.

**Step 1: Start the backend server**
```bash
cd backend
npm install
npm start
```

Server runs at: `http://localhost:5000`

**Step 2: Access the services**
- Admin Dashboard: `http://localhost:5000/admin`
- Example Website: `http://localhost:5000/example`
- API: `http://localhost:5000/api/faqs`
- Widget Script: `http://localhost:5000/chatbot-widget.js`

**Step 3: Add to your HTML**
```html
<!-- Add this before closing </body> tag -->
<script src="http://localhost:5000/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'http://localhost:5000',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

---

### Option 2: CDN/External Server (Recommended for Production)

For deploying to a production server.

**Step 1: Deploy backend to your server**

Choose a hosting platform:
- **Heroku** (beginner-friendly)
  ```bash
  heroku create chatbot-api
  git push heroku main
  ```

- **Railway** (modern alternative)
  ```
  1. Connect GitHub repo
  2. Deploy from railway.app
  ```

- **DigitalOcean** (VPS)
  ```bash
  ssh into droplet
  Clone repo, run npm install, npm start
  ```

**Step 2: Update your website**
```html
<script src="https://chatbot-api.yourcompany.com/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'https://chatbot-api.yourcompany.com',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

---

### Option 3: Same-Origin Deployment (Advanced)

Deploy everything together on one server.

**Step 1: Set up proper static file serving**

In your web server config (nginx/Apache):
```nginx
# Nginx example
location /api/ {
  proxy_pass http://localhost:5000;
}

location /admin {
  proxy_pass http://localhost:5000;
}

location /chatbot-widget.js {
  proxy_pass http://localhost:5000;
}
```

**Step 2: Simplify your integration**
```html
<!-- API and widget are same origin, so use relative URLs -->
<script src="/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: '/api',  // Relative URL
    position: 'bottom-right'
  });
</script>
```

---

## Basic Integration

### Minimal Setup (3 lines)

```html
<!DOCTYPE html>
<html>
<body>
  <!-- Your existing content -->
  
  <!-- Add this at the bottom -->
  <script src="http://YOUR-API-URL/chatbot-widget.js"></script>
  <script>ChatbotWidget.init({apiUrl: 'http://YOUR-API-URL'});</script>
</body>
</html>
```

Replace `http://YOUR-API-URL` with:
- Local: `http://localhost:5000`
- Production: `https://your-server.com`

---

## Advanced Configuration

### Full Configuration Example

```html
<script src="http://localhost:5000/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    // API endpoint (required)
    apiUrl: 'http://localhost:5000',
    
    // Position: 'bottom-right' or 'bottom-left'
    position: 'bottom-right',
    
    // Theme: 'light' or 'dark'
    theme: 'light',
    
    // Custom text
    widgetTitle: 'Help & Support',
    placeholder: 'Type your question...',
    defaultMessage: 'Hi! 👋 How can I help?'
  });
</script>
```

---

## Integration Examples

### WordPress

Add to your WordPress theme's `footer.php`:

```php
<?php
// Before closing body tag
?>
<script src="https://your-api.com/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'https://your-api.com',
    position: 'bottom-right'
  });
</script>
<?php get_footer(); ?>
```

Or use a WordPress plugin that adds custom scripts.

---

### React

```jsx
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Load chatbot widget
    const script = document.createElement('script');
    script.src = 'http://localhost:5000/chatbot-widget.js';
    document.body.appendChild(script);
    
    // Initialize after script loads
    script.onload = () => {
      window.ChatbotWidget.init({
        apiUrl: 'http://localhost:5000',
        position: 'bottom-right'
      });
    };
  }, []);

  return (
    <div>
      {/* Your React components */}
    </div>
  );
}
```

---

### Vue.js

```vue
<template>
  <div id="app">
    <!-- Your Vue content -->
  </div>
</template>

<script>
export default {
  mounted() {
    // Load chatbot widget
    const script = document.createElement('script');
    script.src = 'http://localhost:5000/chatbot-widget.js';
    document.body.appendChild(script);
    
    // Initialize after script loads
    script.onload = () => {
      window.ChatbotWidget.init({
        apiUrl: 'http://localhost:5000'
      });
    };
  }
}
</script>
```

---

### Next.js

```jsx
// pages/_app.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:5000/chatbot-widget.js';
    document.body.appendChild(script);
    
    script.onload = () => {
      window.ChatbotWidget.init({
        apiUrl: 'http://localhost:5000'
      });
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

---

### Shopify

Add to Shopify theme's `theme.liquid`:

```liquid
<script src="https://your-api.com/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'https://your-api.com',
    position: 'bottom-right',
    widgetTitle: 'Shop Support'
  });
</script>
```

Add this code in:
1. **Shopify Admin** → **Online Store** → **Themes**
2. Click **Edit code**
3. Edit **theme.liquid**
4. Paste near the closing `</body>` tag

---

### Static HTML Website

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>Welcome</h1>
    </header>
    
    <main>
        <!-- Your content here -->
    </main>
    
    <footer>
        <p>&copy; 2024 My Company</p>
    </footer>

    <!-- Chatbot Widget -->
    <script src="http://localhost:5000/chatbot-widget.js"></script>
    <script>
      ChatbotWidget.init({
        apiUrl: 'http://localhost:5000',
        position: 'bottom-right',
        theme: 'light'
      });
    </script>
</body>
</html>
```

---

## Troubleshooting Integration

### Widget doesn't appear

1. **Check console errors** (F12 → Console)
2. **Verify API URL is correct**
   - Local: `http://localhost:5000`
   - Production: Include full domain
3. **Check CORS headers** (F12 → Network → chatbot request)
4. **Verify JavaScript enabled**

### Widget appears but doesn't respond

1. **Check API is running** → Open `http://YOUR-API-URL/api/health`
2. **Check API URL in config** matches running server
3. **Check Network tab** for failed requests
4. **Check FAQs exist** → `http://YOUR-API-URL/api/faqs`

### CORS errors

The backend already has CORS enabled. If still getting errors:

1. Check your API URL includes `http://` or `https://`
2. For local: Use `http://localhost:5000` not just `localhost:5000`
3. For production: Use full domain with protocol

---

## Browser Support

The widget works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- JavaScript enabled
- Modern browser (ES6 support)
- Fetch API support

---

## Testing Integration

### Simple Test

```html
<html>
<body>
  <h1>Chatbot Test</h1>
  
  <script src="http://localhost:5000/chatbot-widget.js"></script>
  <script>
    ChatbotWidget.init({
      apiUrl: 'http://localhost:5000'
    });
  </script>
</body>
</html>
```

### Verify via Console

Open browser console (F12) and run:

```javascript
// Check if ChatbotWidget is loaded
console.log(window.ChatbotWidget);

// Check API connection
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('API Status:', d));

// Check FAQs exist
fetch('http://localhost:5000/api/faqs')
  .then(r => r.json())
  .then(d => console.log('FAQs:', d));
```

---

## Performance Notes

- Widget script: **~15KB** (minified)
- Initial load: **1-2 requests** (widget + first chat)
- Chat request time: **<100ms** (local)
- Floating icon: **Negligible impact**

---

## Security Considerations

1. **HTTPS in Production** - Always use HTTPS for production
2. **Rate Limiting** - Consider adding rate limiting to API
3. **CORS Origin** - Restrict to your domain only
4. **Sanitization** - User messages are sanitized automatically

---

## Advanced: Custom Styling

Override widget styles with CSS:

```html
<style>
  /* Change primary color */
  #chatbot-widget-container {
    --primary-color: #ff6b6b !important;
  }
  
  /* Custom chat window size */
  .chatbot-window {
    width: 400px !important;
    height: 600px !important;
  }
  
  /* Custom font */
  #chatbot-widget-container {
    font-family: 'Comic Sans MS', cursive !important;
  }
</style>

<script src="http://localhost:5000/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'http://localhost:5000'
  });
</script>
```

---

## Multi-Language Support

### Using JavaScript to Customize Messages

```html
<script>
  const lang = navigator.language.startsWith('es') ? 'es' : 'en';
  
  const messages = {
    en: {
      widgetTitle: 'Chat with us',
      placeholder: 'Ask me anything...',
      defaultMessage: 'Hello! How can I help?'
    },
    es: {
      widgetTitle: 'Chatea con nosotros',
      placeholder: '¿Pregúntame algo...',
      defaultMessage: '¡Hola! ¿Cómo puedo ayudarte?'
    }
  };

  ChatbotWidget.init({
    apiUrl: 'http://localhost:5000',
    ...messages[lang]
  });
</script>
```

---

## Next Steps

1. ✅ Choose integration option
2. ✅ Get backend running
3. ✅ Add to your website
4. ✅ Test the chatbot
5. ✅ Customize appearance
6. ✅ Deploy to production

**Happy integrating!** 🚀
