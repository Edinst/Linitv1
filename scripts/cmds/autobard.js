const axios = require("axios");
 
module.exports = {
  config: {
    name: "bard",
    version: "1.0",
    author: "VɪLLAVER",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "Bard"
  },
  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
    const input = event.body;
    const userID = event.senderID;
    const data = await usersData.get(userID);
    const status = data.banned.status;
    const reason = data.banned.reason;
    const name = data.name
    const author = this.config.author;
    if(input && input.trim().toLowerCase().startsWith('bard') || input && input.trim().toLowerCase().startsWith('google')){
      if(status == true){
       return message.reply(`⚠️ | You have been banned from using the bot\n❍Reason: ${reason}\n❏Please contact the admin in this group to request for compliment.`);
      }
     const data = input.split(" ");
     data.shift();
     const prompt = data.join(" ");
     
    if(!prompt) {
        return message.reply(`❗| Kindly provide a question or query! Please try again...`);
    }
 
    try {
      await message.reply(`Hello ${name}👋, \n🔍Bard Searching For your Answer! Kindly Please Wait...`);
      const response = await axios.get(
      `https://api--mangroveprotvillaver.repl.co/bard?author=${author}&prompt=${encodeURIComponent(
        prompt
      )}`
    );
 
      message.reply({ body: `${response.data.result}`}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID
			});
     });
 
    } catch (error) {
      console.error("Error:", error.message);
    }
    }
  },
  onReply: async function({message, event, Reply, args, api}) {
    let {author, commandName} = Reply;
    if (event.senderID != author) return;
    const prompt = args.join(' ');
    try {
        api.setMessageReaction("🤖", event.messageID, event.threadID, api);
      const response = await axios.get(
      `https://api--mangroveprotvillaver.repl.co/bard?author=VɪLLAVER&prompt=${encodeURIComponent(
        prompt
      )}`
    );
            message.reply({ body: `${response.data.result}`}, (err, info) => {
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				author: event.senderID
			});
     });
 
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};