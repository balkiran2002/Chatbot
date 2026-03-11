const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (widget and admin)
app.use(express.static(path.join(__dirname, '../widget')));
app.use(express.static(path.join(__dirname, '../admin')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../widget/index.html'));
});

// Path to FAQ file
const faqFilePath = path.join(__dirname, 'data', 'faqs.json');

// Load FAQs from file
function loadFAQs() {
  try {
    if (fs.existsSync(faqFilePath)) {
      const data = fs.readFileSync(faqFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading FAQs:', error);
  }
  return { faqs: [] };
}

// Save FAQs to file
function saveFAQs(data) {
  try {
    fs.writeFileSync(faqFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving FAQs:', error);
    return false;
  }
}

// Rule-based matching function
function findBestMatch(userQuestion) {
  const faqData = loadFAQs();
  const faqs = faqData.faqs || [];
  
  const userWords = userQuestion.toLowerCase().split(/\W+/).filter(w => w.length > 0);
  let bestMatch = null;
  let highestScore = 0;

  faqs.forEach(faq => {
    let score = 0;
    const faqQuestion = faq.question.toLowerCase();
    const keywords = faq.keywords || [];

    // Check keyword matches
    userWords.forEach(word => {
      keywords.forEach(keyword => {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 2;
        }
      });

      // Check if word is in question
      if (faqQuestion.includes(word)) {
        score += 1;
      }
    });

    // Bonus for partial question matching
    const questionWords = faqQuestion.split(/\W+/).filter(w => w.length > 0);
    userWords.forEach(word => {
      questionWords.forEach(qWord => {
        if (qWord === word) {
          score += 1.5;
        }
      });
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  });

  // Return match if score is above threshold
  return highestScore >= 2 ? bestMatch : null;
}

// Routes

// Get all FAQs
app.get('/api/faqs', (req, res) => {
  const faqData = loadFAQs();
  res.json(faqData);
});

// Get single FAQ by ID
app.get('/api/faqs/:id', (req, res) => {
  const faqData = loadFAQs();
  const faq = (faqData.faqs || []).find(f => f.id === req.params.id);
  
  if (faq) {
    res.json(faq);
  } else {
    res.status(404).json({ error: 'FAQ not found' });
  }
});

// Chat endpoint - Rule-based matching
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const match = findBestMatch(message);

  if (match) {
    res.json({
      success: true,
      answer: match.answer,
      question: match.question,
      confidence: 'high',
      faqId: match.id
    });
  } else {
    res.json({
      success: false,
      answer: 'I couldn\'t find a matching answer. Please contact support at support@example.com or call +1-800-123-4567.',
      question: null,
      confidence: 'low'
    });
  }
});

// Add new FAQ
app.post('/api/faqs', (req, res) => {
  const { question, keywords, answer } = req.body;

  if (!question || !keywords || !answer) {
    return res.status(400).json({ error: 'Question, keywords, and answer are required' });
  }

  const faqData = loadFAQs();
  const newFAQ = {
    id: uuidv4(),
    question,
    keywords: Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim()),
    answer
  };

  if (!faqData.faqs) {
    faqData.faqs = [];
  }

  faqData.faqs.push(newFAQ);

  if (saveFAQs(faqData)) {
    res.status(201).json(newFAQ);
  } else {
    res.status(500).json({ error: 'Failed to save FAQ' });
  }
});

// Update FAQ
app.put('/api/faqs/:id', (req, res) => {
  const { question, keywords, answer } = req.body;
  const faqData = loadFAQs();
  const faqIndex = (faqData.faqs || []).findIndex(f => f.id === req.params.id);

  if (faqIndex === -1) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  if (question) faqData.faqs[faqIndex].question = question;
  if (keywords) faqData.faqs[faqIndex].keywords = Array.isArray(keywords) ? keywords : keywords.split(',').map(k => k.trim());
  if (answer) faqData.faqs[faqIndex].answer = answer;

  if (saveFAQs(faqData)) {
    res.json(faqData.faqs[faqIndex]);
  } else {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

// Delete FAQ
app.delete('/api/faqs/:id', (req, res) => {
  const faqData = loadFAQs();
  const faqIndex = (faqData.faqs || []).findIndex(f => f.id === req.params.id);

  if (faqIndex === -1) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  const deletedFAQ = faqData.faqs.splice(faqIndex, 1);

  if (saveFAQs(faqData)) {
    res.json({ message: 'FAQ deleted', deletedFAQ: deletedFAQ[0] });
  } else {
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/index.html'));
});

// Serve example website
app.get('/example', (req, res) => {
  res.sendFile(path.join(__dirname, '../widget/example-website.html'));
});

// Serve chatbot widget
app.get('/chatbot-widget.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../widget/chatbot-widget.js'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Chatbot API running on http://localhost:${PORT}`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`FAQs endpoint: http://localhost:${PORT}/api/faqs`);
});
