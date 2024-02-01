const axios = require('axios');
 
module.exports = {
  config: {
    name: "hadith",
    aliases: ["bukhari","hadis","হাদিস","হাদীস"],
    version: "1.0",
    author: "mahim",
    countDown: 5,
    role: 0,
    shortDescription: "hadith from Sahih Bukhari",
    longDescription: "hadith from Sahih Bukhari",
    category: "Islamic",
    guide: "{pn}"
  },
 
  async onStart({ message, args }) {
    try {
      const response = await axios.get('https://api.simsimipro.xyz/v1/hadith/bukhari');
      const { author, hadithNo, edition, arabicHadith, banglaHadith, englishHadith } = response.data;
      const messageText = `Hadith No: ${hadithNo}\nEdition: ${edition}\n${arabicHadith.replace(/\n/g, "")}\n${banglaHadith.replace(/\n/g, "")}\n${englishHadith.replace(/\n/g, "")}\n\nAuthor: ${author}`;
      message.reply(messageText);
    } catch (error) {
      message.reply('Sorry, an error occurred');
      console.error(error);
    }
  }
};