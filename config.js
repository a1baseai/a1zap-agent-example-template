// Load environment variables
require('dotenv').config();

module.exports = {
  // Gemini AI Configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || 'your_gemini_api_key_here',
    defaultModel: 'gemini-2.5-flash',
    temperature: 0.7,
    maxOutputTokens: 65565
  },

  // A1Zap API Configuration
  a1zap: {
    apiKey: process.env.A1ZAP_API_KEY || 'your_a1zap_api_key_here',
    agentId: process.env.A1ZAP_AGENT_ID || 'your_agent_id_here',
    apiUrl: 'https://api.a1zap.com/v1/messages/individual'
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  }
};
