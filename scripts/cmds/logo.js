const axios = require('axios');

module.exports = {
  config: {
    name: "logo",
    aliases: ["genlogo"],
    version: "1.1",
    author: "Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Text to logo'
    },
    longDescription: {
      en: "Text to logo"
    },
    category: "image",
    guide: {
      en: "there is 181 different logo type {pn} text | model number "
    }
  },

  onStart: async function({ message, args }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Please provide a text.");
    }

    let prompt, model;
    if (text.includes("|")) {
      const [promptText, modelText] = text.split("|").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = 25; // Set the default model number to 1
    }

    message.reply("🐍⚡Creating your logo ⚡🐍...").then((info) => { id = info.messageID });
    try {
      const API = `https://logox.webjs.repl.co/textpro?text=${encodeURIComponent(prompt)}&model=${model}`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        attachment: imageStream
      });
    } catch (error) {
      console.log(error);
      message.reply("🎃🥴Failed to generate your logo.🎃").then(() => {
        message.delete(id);
      });
    }
  }
};