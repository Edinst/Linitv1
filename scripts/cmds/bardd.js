const axios = require("axios");
const fs = require('fs');

module.exports.config = {
  'name': "bard",
  'version': '1',
  'countDown': 0,
  'role': 0,
  'author': "OtinXSandip",
  'description': {
    'en': "Use AI"
  },
  'category': 'AI'
};

module.exports.onStart = async function ({ api, event }) {
  const { threadID, messageID, type, messageReply, body } = event;
  let query = '';

  if (type === "message_reply" && messageReply.attachments[0]?.["type"] === "photo") {
    const photoAttachment = messageReply.attachments[0];
    const photoUrl = photoAttachment.url;
    query = await convertImageToText(photoUrl);

    if (!query) {
      api.sendMessage("❌ Failed to convert the photo to text. Please try again with a clearer photo.", threadID, messageID);
      return;
    }
  } else {
    query = body.slice(5).trim();

    if (!query) {
      api.sendMessage("Please provide a question or query", threadID, messageID);
      return;
    }
  }

  api.sendMessage("Searching for an answer, please wait...", threadID, messageID);

  try {
    const response = await axios.get("https://rishadapi.rishad100.repl.co/bard?query=send+images+Bangladesh+presidents" + encodeURIComponent(query));
    const answer = response.data.message;
    const imageUrls = response.data.imageUrls;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const imageStreams = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const imagePath = "cache/image" + (i + 1) + ".png";

        try {
          const imageResponse = await axios.get(imageUrl, {
            'responseType': "arraybuffer"
          });
          fs.writeFileSync(imagePath, imageResponse.data);
          imageStreams.push(fs.createReadStream(imagePath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the image:", error);
        }
      }

      api.sendMessage({
        'attachment': imageStreams,
        'body': answer
      }, threadID, messageID);
    } else {
      api.sendMessage(answer, threadID, messageID);
    }
  } catch (error) {
    console.error("Error occurred while fetching data from the Bard API:", error);
    api.sendMessage("An error occurred while fetching data. Please try again later.", threadID, messageID);
  }
};

async function convertImageToText(imageUrl) {
  const response = await axios.get("https://rishadapi.rishad100.repl.co/bard?query=send+images+Bangladesh+presidents" + encodeURIComponent(imageUrl));
  return response.data.extractedText;
}