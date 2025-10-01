/**
 * Local test script for webhook endpoints
 * Usage: node test-webhook.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test text webhook
async function testTextWebhook() {
  console.log('\n🧪 Testing Text Webhook (Poker Coach)...\n');

  const testPayload = {
    event: 'message.received',
    timestamp: Date.now(),
    agent: {
      id: 'test-agent-123',
      name: 'Ace the Poker Coach',
      handle: 'acepoker_coach'
    },
    chat: {
      id: 'test-chat-123',
      type: 'group'
    },
    message: {
      id: 'test-msg-123',
      content: 'My cards are AsAc, I\'m in UTG position',
      senderId: 'test-user-123',
      senderName: 'Test User',
      timestamp: Date.now(),
      messageType: 'text',
      metadata: {
        isAgent: false
      }
    }
  };

  try {
    const response = await axios.post(`${BASE_URL}/webhook/text`, testPayload);
    console.log('✅ Success!');
    console.log('Response:', response.data);
    console.log('\nAgent said:', response.data.response);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Test image webhook
async function testImageWebhook() {
  console.log('\n🧪 Testing Image Webhook (Logo Designer)...\n');

  const testPayload = {
    event: 'message.received',
    timestamp: Date.now(),
    agent: {
      id: 'test-agent-456',
      name: 'Logo Designer',
      handle: 'logo_designer'
    },
    chat: {
      id: 'test-chat-456',
      type: 'individual'
    },
    message: {
      id: 'test-msg-456',
      content: 'Can you suggest a logo design based on this image?',
      senderId: 'test-user-456',
      senderName: 'Test User',
      timestamp: Date.now(),
      messageType: 'image',
      media: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png'
      },
      metadata: {
        isAgent: false
      }
    }
  };

  try {
    const response = await axios.post(`${BASE_URL}/webhook/image`, testPayload);
    console.log('✅ Success!');
    console.log('Response:', response.data);
    console.log('\nAgent said:', response.data.response);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Test health check
async function testHealth() {
  console.log('\n🧪 Testing Health Check...\n');

  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is healthy!');
    console.log('Config:', response.data.config);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting local webhook tests...');
  console.log('Make sure server is running on', BASE_URL);

  await testHealth();
  await testTextWebhook();
  // await testImageWebhook(); // Uncomment to test image webhook

  console.log('\n✨ Tests complete!\n');
}

runTests();
