const fs = require('fs');

module.exports = {
  config: {
    name: "nya",
    version: "1.0",
    author: "Riley",
    countDown: 5,
    role: 0,
    shortDescription: "🤒",
    longDescription: "auto bot reply to your message",
    category: "no prefix",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case ".nya":
          const replies = [
            "Nya.",
          ];
          api.setMessageReaction("👍", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
          });
          break;
        default:
          return; 
      }
    }
  },
};