const axios = require("axios");

module.exports = {
  config: {
    name: "openai",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "ChatGPT",
    longDescription: "ChatGPT",
    category: "ai",
    guide: {
      en: "{p}{n}",
    },
  },

  onStart: async function ({ api, event, args }) {
    let txt = args.join(" ");
    try {
      if (!txt) {
        return api.sendMessage("❌ Missing input!", event.threadID, event.messageID);
      }
      const response = await axios.get(`https://sim.ainz-project.repl.co/others/gpt?prompt=${encodeURIComponent(txt)}`);
      const result = response.data.result;
      api.sendMessage(result, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Error", event.threadID, event.messageID);
    }
  },
};