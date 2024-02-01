const axios = require('axios');


const badWords = ["gay", "pussy", "dick","nude"," without","clothes","sugar","fuck","fucked","step","🤭","🍼","shit","bitch","hentai","🥵","clothes","sugar","fuck","fucked","step","?","?","shit","bitch","hentai","?","sex","fuck","boobs","cute girl undressed","undressed", "nude","without clothes", "without cloth"];
//Bad Words And CMD BY Ohio03//

module.exports = {
  config: {
    name: 'imagine6',
    aliases: ["imgg6"],
    version: '1.0',
    author: 'JARiF',
    countDown: 0,
    role: 0,
    longDescription: {
      vi: 'create image based on a prompt using an AI model',
      en: 'create image based on a prompt using an AI model'
    },
    category: 'image',
   guide: {
        en: ' {pn} Your Prompt | Model 1-10'
      }
  },

  onStart: async function ({ message, args }) {
    try {
      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());
      const text = args.join ("");
          if (!text) {
      return message.reply("❌ | Please Provide a Prompt");
    }

     
      if (containsBadWords(prompt)) {
        return message.reply('❌ | NSFW Prompt Detected');
      }

      const apiKey = ''; //API KEY BY JARiF//

     
      const modelParam = model || '3';//Default Model Is 3//

      const apiUrl = `https://fuck-sadman.jarif00.repl.co/generate?model=23&prompt=${prompt}`;//API BY SADMAN//

      await message.reply('Please Wait...⏳');

      const form = {
        body: "Here's Your imagination 🖼️",
      };

      form.attachment = [];
      form.attachment[0] = await global.utils.getStreamFromURL(apiUrl);

      message.reply(form);
    } catch (error) {
      console.error(error);
      await message.reply('Sorry, API Have Skill Issue');
    }
  }
};

function containsBadWords(prompt) {
  const promptLower = prompt.toLowerCase();
  return badWords.some(badWord => promptLower.includes(badWord));
}