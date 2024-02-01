const axios = require('axios');

module.exports = {
 config: {
 name: "imagine5",
 aliases: ["imgg"],
 version: "1.1",
 author: "cmd jarif api samir | combine © EDINSTII",
 countDown: 30,
 role: 0,
 shortDescription: {
 en: 'Text to Image'
 },
 longDescription: {
 en: "Text to image"
 },
 category: "ai image",
 guide: {
 en: ' {pn} Your Prompt | Model coming soon'

 
 }
 },

 onStart: async function({ message, args }) {
 const text = args.join(" ");
 if (!text) {
 return message.reply("❌ | Please Provide a Prompt");
 }

 let prompt, model;
 if (text.includes("|")) {
 const [promptText, modelText] = text.split("|").map((str) => str.trim());
 prompt = promptText;
 model = modelText;
 } else {
 prompt = text;
 model = 20; // Set the default model number to 1
 }

 message.reply("Generating image, please wait...⏳").then((info) => { id = info.messageID });
 try {
 const API = `https://img.restfulapi.repl.co/generate-image?model=20&prompt=${prompt}`;
 const imageStream = await global.utils.getStreamFromURL(API);

 return message.reply({
 attachment: imageStream
 });
 } catch (error) {
 console.log(error);
 message.reply("Failed to generate your imagination !!").then(() => {
 message.delete(id);
 });
 }
 }
};