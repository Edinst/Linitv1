const axios = require('axios');

module.exports = {
  config: {
    name: "prodia",
    version: "1.1",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: 'type {pn} models for models'
    } // too lazy to add them here
  },

  onStart: async function ({ message, args, api, event }) {
if (args[0] === "models") {
axios.get("https://prodia.jsus-sus.repl.co/models").then((res) => message.reply(res.data))
return;
}
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a prompt.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = "31";  
    }

    

    try {
      let Send = await api.sendMessage(`✅ | Generating... `, event.threadID);
      const API = await axios.get(`https://prodia.jsus-sus.repl.co/generate?txt=${prompt}&model=${model}&user=${event.senderID}`);
      const imageStream = await global.utils.getStreamFromURL(API.data.image_link);
      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("Failed.");
      await api.unsendMessage(Send);
    }
  }
};