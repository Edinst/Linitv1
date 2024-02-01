const axios = require ('axios');
module.exports = {
 config: {
 name: "gpt2",
 version: "1.0",
 author: "Jun",
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
 category: "AI"
 },
onStart: async function({ message, event, args, commandName }) {
  const id = event.senderID;
  const prompt = args.join(" ");

  if (args[0] === "reset") {
    try {
      await axios.get(`https://api-test.juns-team.repl.co/api/others/gpt/reset?id=${id}`);
      message.reply("Conversation reset successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  } else {
    try {
      const response = await axios.get(`https://api-test.juns-team.repl.co/api/others/gpt?prompt=${prompt}&id=${id}`);

      message.reply(
        {
          body: `${response.data.content}`
        },
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
},
onReply: async function({ message, event, Reply, args }) {
 let { author, commandName, messageID } = Reply;
 if (event.senderID != author) return;
 const id = author;
 const prompt = args.join(" ");

 try {
 const response = await axios.get(`https://api-test.juns-team.repl.co/api/others/gpt?prompt=${prompt}&id=${id}`);

 message.reply(
 {
 body: `${response.data.content}`
 },
 (err, info) => {
 global.GoatBot.onReply.set(info.messageID, {
 commandName,
 messageID: info.messageID,
 author: event.senderID
 });
 }
 );
 } catch (error) {
 console.error("Error:", error.message);
 }
 }
};