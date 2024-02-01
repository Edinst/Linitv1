const axios = require("axios");

module.exports = {
config: {
		name: "neon",
    version: "1.0",
		author: "RUBISH",
		countDown: 5,
		role: 0,
		shortDescription: "Write Neon Text ",
		longDescription: "Write neon Text ",
		category: "Text maker",
		guide: {
      en: "{p}{n} Text",
    }
	},

 onStart: async function ({ api, event, args, message }) {
 try { 
 const Rubish = args.join(' ');
 const response = await axios.get(`https://tanjiro-api.onrender.com/textpro?text=${Rubish}&&link=https://textpro.me/neon-text-effect-online-963.html&api_key=tanjiro`);

 const message = {attachment:await global.utils.getStreamFromURL(response.data.result)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching response");
 }
 }
};