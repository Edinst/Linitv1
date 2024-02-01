const axios = require('axios');

module.exports = {
  config: {
    name: "mokka",
    aliases: ["moqqa"],
    version: "1.0",
    author: "JARiF",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên",
      en: "Get random images"
    },
    longDescription: {
      vi: "Lấy hình ảnh ngẫu nhiên từ danh sách đã định nghĩa",
      en: "Get random images from the predefined list"
    },
    category: "image",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  getRandomImage: function () {
    const images = [
      "https://i.imgur.com/cbDc9Vk.png",
      "https://i.imgur.com/kzvGfx3.png",
      "https://i.imgur.com/YjklXrx.png",
      "https://i.imgur.com/BacP91h.png",
      "https://i.imgur.com/nguI7kP.png",
      "https://i.imgur.com/4CODj4B.png"
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  },

  onStart: async function ({ message }) {
    try {
      const imageUrl = this.getRandomImage();

      return message.reply({
        attachment: await global.utils.getStreamFromURL(imageUrl)
      });
    } catch (error) {
      console.error("Error while retrieving waifu image:", error);
      return message.reply("An error occurred while processing your request.");
    }
  }
};