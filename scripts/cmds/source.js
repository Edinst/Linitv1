module.exports = {
  config: {
    name: "source",
    aliases: ["source"],
    version: "1.0",
    author: "villaver.",
    countDown: 5,
    role: 2,
    shortDescription: "Paste file in boc chat",
    longDescription: " .",
    category: "owner",
    guide: "{pn} cmdName.js"
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
    const fs = require('fs');
    const cmdName = args[0];
    try{
    	function output(msg) {
			if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
				msg = msg.toString();
			else if (msg instanceof Map) {
				let text = `Map(${msg.size}) `;
				text += JSON.stringify(mapToObj(msg), null, 2);
				msg = text;
			}
			else if (typeof msg == "object")
				msg = JSON.stringify(msg, null, 2);
			else if (typeof msg == "undefined")
				msg = "undefined";

			message.reply(msg);
		}
		function out(msg) {
			output(msg);
		}
out(fs.readFileSync(__dirname +`/${cmdName}`, 'utf8'))
  }catch (error) {
      console.error('[ERROR]', error);
      message.reply(`An error occurred while processing the command: ${error.message}`);
    }
  }
};