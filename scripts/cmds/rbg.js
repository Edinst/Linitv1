let axios = require('axios');
let FormData = require('form-data');
let fs = require('fs-extra');
let path = require('path');
let imageDownloader = require('image-downloader');

module.exports = {
    config: {
        name: "rmvbg",
        aliases: ["removebg","rmvbg"],
        version: "1.0",
        author: "JARiF",
        role: 0,
        category: "fun",
        guide: {
            vi: "",
            en: ""
        }
    },

    onStart: async function ({ api, event, userData, args }) {
        try {
            if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
                return api.sendMessage("Reply to an image", event.threadID, event.messageID);
            }

            let attachment = event.messageReply.attachments[0];

            if (attachment.type !== "photo") {
                return api.sendMessage("This is my land!", event.threadID, event.messageID);
            }

            let kamla = ["pwhetX3LJ3L9M9Nfsq4M6JVP","BoUrqeiinFKHVCMDb3Kz7S9w"];
            let inputPath = path.resolve(__dirname, 'cache', 'photo.png');

            await imageDownloader.image({
                url: attachment.url,
                dest: inputPath
            });

            let formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

            let randomApiKey = kamla[Math.floor(Math.random() * kamla.length)];

            let response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                responseType: 'arraybuffer',
                headers: {
                    ...formData.getHeaders(),
                    'X-Api-Key': randomApiKey,
                },
                encoding: null
            });

            if (response.status === 200) {
                fs.writeFileSync(inputPath, response.data);
                api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => {
                    fs.unlinkSync(inputPath);
                });
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            api.sendMessage('An error occurred while processing the image.', event.threadID, event.messageID);
        }
    }
};
