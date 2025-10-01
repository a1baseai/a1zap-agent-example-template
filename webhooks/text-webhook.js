const geminiService = require('../services/gemini-service');
const a1zapClient = require('../services/a1zap-client');
const pokerCoach = require('../agents/poker-coach');

/**
 * Text webhook handler
 * Example: Ace Poker Coach
 */
async function textWebhookHandler(req, res) {
  try {
    console.log('\n=== Text Webhook Received ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Extract webhook data
    const { chat, message } = req.body;

    if (!chat?.id) {
      return res.status(400).json({
        success: false,
        error: 'Missing chat.id in webhook payload'
      });
    }

    if (!message?.content) {
      return res.status(400).json({
        success: false,
        error: 'Missing message.content in webhook payload'
      });
    }

    const chatId = chat.id;
    const userMessage = message.content;

    console.log(`Processing message from chat ${chatId}: "${userMessage}"`);

    // Fetch recent message history for current hand context
    let conversationHistory = [];
    try {
      const history = await a1zapClient.getMessageHistory(chatId, 5); // Last 5 messages only

      // Convert to Gemini format, filter out empty messages
      conversationHistory = history
        .filter(msg => msg.content && msg.content.trim())
        .map(msg => ({
          role: msg.isAgent ? 'assistant' : 'user',
          content: msg.content
        }));
    } catch (error) {
      console.warn('Could not fetch message history:', error.message);
    }

    // Generate response using Gemini with conversation context
    console.log('Generating response with Gemini...');
    const response = conversationHistory.length > 0
      ? await geminiService.chat(
          [...conversationHistory, { role: 'user', content: userMessage }],
          {
            ...pokerCoach.generationOptions,
            systemInstruction: { text: pokerCoach.systemPrompt }
          }
        )
      : await geminiService.generateText(
          `${pokerCoach.systemPrompt}\n\nCurrent Hand: ${userMessage}\n\nAdvice:`,
          pokerCoach.generationOptions
        );

    console.log('Generated response:', response);

    // Send response back to A1Zap
    await a1zapClient.sendMessage(chatId, response);

    // Return success
    res.json({
      success: true,
      agent: pokerCoach.name,
      response: response
    });

  } catch (error) {
    console.error('\n=== Text Webhook Error ===');
    console.error('Error:', error.message);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = textWebhookHandler;
