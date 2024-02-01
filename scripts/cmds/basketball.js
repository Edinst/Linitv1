const fs = require('fs-extra');

const girlsFilePath = './jsonFile/basketballgirls.json';
const boysFilePath = './jsonFile/basketballboys.json';

module.exports = {
  config: {
    name: "bb",
    aliases: ["basketball", "basket"],
    version: "1.0",
    author: "ViLLAVER",
    countDown: 0,
    role: 0,
    shortDescription: "Approved, delete, and view approved threads",
    longDescription: "",
    category: "admin",
    guide: {
      en: "{p}{n} <listType> <action> <nameOrIndex>\n\n{p}{n} <listType> <view|clear>"
    }
  },

  onStart: async function ({ event, api, message, args }) {
    if (args.length < 2) {
      return message.reply("Please provide a valid command. Example: -bb girls add MyName1, MyName2");
    }

    const listType = args[0].toLowerCase();
    const input = args[1].toLowerCase();
    const nameOrIndex = args.slice(2).join(" ").trim();

    if (listType !== "girls" && listType !== "boys") {
      return message.reply("Invalid list type. Use 'girls' or 'boys'.");
    }

    const filePath = listType === "girls" ? girlsFilePath : boysFilePath;
    let fileData = fs.readJsonSync(filePath, { throws: false }) || [];

    fileData = fileData.sort((a, b) => a.localeCompare(b));

    if (input === "view") {
      if (fileData.length === 0) {
        return message.reply(`The ${listType} list is empty.`);
      }

      let response = `⛹️𝗕𝗮𝘀𝗸𝗲𝘁𝗯𝗮𝗹𝗹 ${listType === "girls" ? "𝗚𝗶𝗿𝗹𝘀" : "𝗕𝗼𝘆𝘀"} \n\n❏ 𝗡𝗮𝗺𝗲𝘀:\n\n`;
      fileData.forEach((item, index) => {
        response += `${index + 1}. ${item.toUpperCase()}\n`;
      });

      message.reply(response);
    } else if (input === "clear") {
      if (message.role < 1) {
        return message.reply("You don't have permission! Only Admin can clear the list.");
      }

      fs.writeFileSync(filePath, "[]");
      message.reply(`All names in the ${listType} list have been deleted.`);
    } else if (input === "add") {
      if (!nameOrIndex) {
        return message.reply("Please provide a valid name or a comma-separated list of names to add.");
      }

      const namesToAdd = nameOrIndex.split(",").map(name => name.trim());
      const addedNames = [];
      const existingNames = [];

      for (const nameToAdd of namesToAdd) {
        if (nameToAdd) {
          if (!fileData.includes(nameToAdd)) {
            fileData.push(nameToAdd);
            addedNames.push(nameToAdd);
          } else {
            existingNames.push(nameToAdd);
          }
        }
      }

      if (addedNames.length === 0) {
        return message.reply("No new names were added.");
      } else {
        fileData = fileData.sort((a, b) => a.localeCompare(b));
        fs.writeJsonSync(filePath, fileData, { spaces: 2 });

        let replyMessage = `✅Names: ${addedNames.join(", ")} have been added to the ${listType} list.`;

        if (existingNames.length > 0) {
          replyMessage += `\n❗Names: ${existingNames.join(", ")} already exist in the ${listType} list.`;
        }

        message.reply(replyMessage);
      }
    } else if (input === "delete") {
      if (isNaN(nameOrIndex)) {
        return message.reply("Please provide a valid index to delete.");
      }

      const indexToDelete = parseInt(nameOrIndex);

      if (indexToDelete <= 0 || indexToDelete > fileData.length) {
        return message.reply("Invalid index. Please provide a valid index from the list.");
      }

      const deletedName = fileData.splice(indexToDelete - 1, 1)[0];
      fs.writeJsonSync(filePath, fileData, { spaces: 2 });

      message.reply(`Name '${deletedName}' has been deleted from the ${listType} list.`);
    } else {
      return message.reply("Invalid action. Use 'add', 'view', 'delete', or 'clear'.");
    }
  }
};