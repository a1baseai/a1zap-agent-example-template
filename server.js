// Load configuration
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const textWebhookHandler = require('./webhooks/text-webhook');
const imageWebhookHandler = require('./webhooks/image-webhook');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    config: {
      hasGeminiApiKey: !!config.gemini.apiKey && !config.gemini.apiKey.includes('your_'),
      hasA1ZapApiKey: !!config.a1zap.apiKey && !config.a1zap.apiKey.includes('your_')
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Gemini Webhook Agent',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      textWebhook: 'POST /webhook/text',
      imageWebhook: 'POST /webhook/image'
    }
  });
});

// Text webhook endpoint (e.g., Ace Poker Bot)
app.post('/webhook/text', textWebhookHandler);

// Image webhook endpoint (e.g., Team Logo Generator)
app.post('/webhook/image', imageWebhookHandler);

// Start server
const PORT = config.server.port;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`\n🚀 Gemini Webhook Agent running on http://${HOST}:${PORT}`);
  console.log(`\nWebhook Endpoints:`);
  console.log(`  POST /webhook/text  - Text-based AI responses`);
  console.log(`  POST /webhook/image - Image-based AI responses`);
  console.log(`  GET  /health        - Health check\n`);
  console.log(`Configuration:`);
  console.log(`  Gemini API: ${config.gemini.apiKey.includes('your_') ? '❌ Not configured' : '✅ Configured'}`);
  console.log(`  A1Zap API: ${config.a1zap.apiKey.includes('your_') ? '❌ Not configured' : '✅ Configured'}\n`);
});

// Error handling
server.on('error', (error) => {
  console.error(`❌ Server error:`, error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n📴 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📴 Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
