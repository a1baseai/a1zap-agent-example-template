# A1Zap Agent API Example Template 🤖

Simple A1Zap webhook agent powered by **Google Gemini AI** - ready for Replit deployment.

Create custom AI agents that run on A1Zap webhooks.

## 🚀 Quick Start

### 1. Get Your API Keys

**Gemini API Key:**
- Visit [Google AI Studio](https://aistudio.google.com/apikey)
- Create and copy your API key

**A1Zap Credentials:**
- Go to A1Zap app → Make → Agent API
- Create your agent → Copy your API Key and Agent ID

### 2. Deploy to Replit

1. Import this project to Replit
2. Add to Secrets (🔒 in sidebar):
```
GEMINI_API_KEY=your_gemini_key
A1ZAP_API_KEY=your_a1zap_key
A1ZAP_AGENT_ID=your_agent_id
BASE_URL=https://your-repl.repl.co
```
3. Click **Run**

### 3. Configure A1Zap Webhook

In A1Zap app → Select your agent:
- Add webhook URL: `https://your-repl.repl.co/webhook/text`

### 4. Test It

Start chatting with your agent - your agent responds!

---

## 🛠️ Create Your Own Agent

### Text Agent Example

Edit `agents/poker-coach.js`:

```javascript
module.exports = {
  name: 'Your Agent Name',
  role: 'Your Agent Role',

  systemPrompt: `You are [name], [role].

Your Purpose:
- What your agent does
- How it helps users

Communication Style:
- How it talks
- Personality traits`,

  generationOptions: {
    temperature: 0.7,        // 0.3 = focused, 0.9 = creative
    maxOutputTokens: 65565   // Response length
  }
};
```

### Image Agent Example

Edit `agents/logo-designer.js`:

```javascript
module.exports = {
  name: 'Image Analyst',

  systemPrompt: `You analyze images and provide insights...`,

  imageAnalysisPrompt: (userMessage) =>
    `${module.exports.systemPrompt}\n\nUser: ${userMessage}\n\nAnalyze this image and provide...`,

  generationOptions: {
    temperature: 0.8,
    maxOutputTokens: 65565
  }
};
```

That's it! Your agent configuration controls how it behaves.

---

## 📁 Project Structure

```
agents/          # Agent personalities (edit these!)
  ├── poker-coach.js
  └── logo-designer.js

webhooks/        # Webhook handlers (usually no changes needed)
  ├── text-webhook.js
  └── image-webhook.js

services/        # Core functionality (don't edit)
  ├── gemini-service.js
  └── a1zap-client.js

config.js        # Environment configuration
server.js        # Main server (don't edit)
```

**To customize:** Edit files in `agents/` folder only.

---

## 🎯 Agent Ideas

- **Fitness Coach**: Workout plans and motivation
- **Language Tutor**: Practice conversations
- **Recipe Chef**: Cooking instructions
- **Study Buddy**: Homework help
- **Code Reviewer**: Review code snippets
- **Fashion Stylist**: Outfit recommendations (image)
- **Plant Doctor**: Plant care advice (image)

---

## 🐛 Quick Fixes

**Agent not responding?**
- Check Replit logs for errors
- Verify all Secrets are set
- Test: `https://your-repl.repl.co/health`

**Gemini errors?**
- Verify API key at [Google AI Studio](https://aistudio.google.com/apikey)

**A1Zap webhook not working?**
- Check webhook URL in A1Zap dashboard
- Ensure BASE_URL matches your Replit URL

---

## 📚 Learn More

- [Gemini API Docs](https://ai.google.dev/docs)

---

**Ready to build? Just edit the agent files and deploy!** 🚀
