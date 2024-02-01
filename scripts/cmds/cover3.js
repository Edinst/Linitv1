const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "cover3",
    aliases: ["cover3"],
    version: "1.0",
    author: "AceGun×Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Create anime cover for your cover photo",
    longDescription: "",
    category: "cover",
    guide: {
      en: "{pn} id | name | surname | color",
    }
  },

  
  onStart: async function ({ args, api, event }) {
    try {
      const [id, name, slogan, colorBg] = args.join(" ").split("|").map(arg => arg.trim());

      const apiUrl = `https://api.dev-tantrik.repl.co/cover?idCharacter=${id}&name=${encodeURIComponent(name)}&slogan=${encodeURIComponent(slogan)}&colorBg=${encodeURIComponent(colorBg)}&apikey=80jsa5hFaGRryHj`;

      const coverResponse = await axios.get(apiUrl, { responseType: "stream" });

      const outputStream = fs.createWriteStream("cover.png");

      coverResponse.data.pipe(outputStream);

      await new Promise((resolve, reject) => {
        outputStream.on("finish", resolve);
        outputStream.on("error", reject);
      });

      api.sendMessage(
        {
          attachment: fs.createReadStream("cover.png"),
        },
        event.threadID
      );

      console.log("Cover sent successfully");
    } catch (error) {
      console.error("Error while fetching cover ", error);
    }
  },
};