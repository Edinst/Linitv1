const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "art",
    aliases: ["2"],
    version: "1.1",
    author: "JARiF",
    countDown: 5,
    role: 0,
    category: "ai",
  },

  onStart: async function ({ event, api, args }) { 
    try {
      if (args.length >= 2 || (event.type === "message_reply" && event.messageReply.attachments.length > 0 && event.messageReply.attachments[0].type === "photo")) {
        const message = event.body;
        api.sendMessage({ body: "Please wait....", mentions: [{ tag: message.senderID, id: message.senderID }] }, event.threadID); 

        const imageUrl = event.type === "message_reply" ? event.messageReply.attachments[0].url : args[0];
        const prompt = event.type === "message_reply" ? "same pose, same person, same environment, all same just add anime effect,anime look,boy will be a boy,girl will be a girl" : args.slice(1).join(" ");

        const formData = new FormData();
        formData.append("key", "6ac6780f27041c31be2da98f4f55704e");
        formData.append("image", imageUrl);

        const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", formData, {
          headers: formData.getHeaders(),
        });
        const imgbbImageUrl = imgbbResponse.data.data.url;

        const response = await axios.get(`https://jarif-art.blackxlegend1.repl.co/transform?imgurl=${imgbbImageUrl}&prompt=${prompt}&apikey=emma_heesters_quiin`, {
          responseType: "arraybuffer",
        });

        const imageBuffer = Buffer.from(response.data);
        const pathSave = path.join(__dirname, "art.png");

        await saveArrayBufferToFile(imageBuffer, pathSave);

        api.sendMessage({ body: "Here is your generated image:", attachment: fs.createReadStream(pathSave) }, event.threadID, () => {
          fs.unlinkSync(pathSave);
        });
      } else if (event.type === "message_reply") {
        api.sendMessage({ body: "Reply with an image." }, event.threadID);
      } else {
        api.sendMessage({ body: "Please provide an image link and a prompt, or reply with an image." }, event.threadID);
      }
    } catch (e) {
      console.error(e);
      api.sendMessage({ body: "❌ | Something went wrong." }, event.threadID);
    }
  },
};

async function saveArrayBufferToFile(arrayBuffer, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
