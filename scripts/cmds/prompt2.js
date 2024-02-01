const axios = require("axios");
module.exports = {
  config: {
    name: "prompt2",
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: { 
      en:"Provides prompts for generating images from text"
      },
    longDescription: {
      en: "Provides prompts for you to generate images from text"
    },
    category: "info",
    guide: {
      en: "{pn} anime girl"
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const prompt = args.join(" ");
      if (!prompt)
        return api.sendMessage(
          "Enter something, baka!!",
          event.threadID,
          event.messageID
        );
      const response = await axios.get(
        `https://milanbhandari.imageapi.repl.co/generateprompt?about=${prompt}`
      );
      const messageObj = {
        body: `\${response.data.prompt}`
      };
      await api.sendMessage(messageObj, event.threadID);
    } catch (error) {
      console.error(error);
      await api.sendMessage("Something went wrong.", event.threadID);
    }
  }
};