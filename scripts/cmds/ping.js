const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "ping",
    version: "1.0",
    author: "©EDINST II",
    role: 0,
    shortDescription: "Check bot and API latency",
    category: "Utility",
    guide: "{p}ping",
  },
  onStart: async function ({ api, event }) {
    const startTime = Date.now();
    const message = await api.sendMessage("Pinging...", event.threadID);
    
    const botLatency = Date.now() - startTime;
    const apiLatency = message.timestamp - startTime;
    const currentDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    
    api.sendMessage({
      body: `📅 | Date: ${currentDate}
🌝 | Ping:
🤖 | Bot Latency: ${botLatency}ms
🔥 | Api Latency: ${apiLatency}.`,
      attachment: null,
      mentions: [{
        tag: event.senderID,
        id: event.senderID,
        fromIndex: 10,
      }]
    }, event.threadID, message.messageID);
    
    api.deleteMessage(message.messageID);
  },
};