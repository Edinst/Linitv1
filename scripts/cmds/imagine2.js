module.exports = {
  config: {
    name: "imagine",
    aliases: ["dr"],
    version: "1.1",
    author: " jsus ",
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
      en: '{pn} your prompt ~~ models`
    }
  },

  onStart: async function({ message, args }) {
    const text = args.join(" ");
    if (!text) return message.reply("Add something");
    let prompt, model, id;
    if (text.includes("~~")) {
      const [promptText, modelText] = text.split("~~").map((str) => str.trim());
      prompt = promptText;
      model = modelText;
    } else {
      prompt = text;
      model = 100;
    }
    message.reply("✅| Creating your Imagination...", (err, info) => { id = info.messageID })
    try {
      message.reply({
        attachment: await global.utils.getStreamFromURL(`https://vyro-tanvir.jsus-sus.repl.co/gen?prompt=${prompt}&model=${model}&ratio=${aspectRatio}`)
      }, () => {
        message.unsend(id)
      })
    } catch (error) {
      console.log(error)
      message.reply("Failed", () => {
        message.unsend(id)
      })
    }
  }
}