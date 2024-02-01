const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "mystery",
        aliases: ["mysterious"],
        version: "1.0",
        author: "Samir",
        countDown: 5,
        role: 0,
        shortDescription: "we together",
        longDescription: "",
        category: "love",
        guide: {
			vi: "{pn} [@tag]",
			en: "{pn} [@tag]"
		}
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 1) {
            const id = mention[0]
            bal(id).then(ptth => { message.reply({ body: "Look At this mysterious person", attachment: fs.createReadStream(ptth) }) })
        } else {
            const men = event.senderID
            bal(men).then(ptth => { message.reply({ body: "Look At this mysterious person", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(id, men) {

    let avone = await jimp.read(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avone.circle()
    let avtwo = await jimp.read(`https://graph.facebook.com/${men}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "abcd.png"
    let img = await jimp.read("https://i.imgur.com/ES28alv.png")

    img.resize(500, 670).composite(avone.resize(111, 111), 48, 410)

    await img.writeAsync(pth)
    return pth
    }