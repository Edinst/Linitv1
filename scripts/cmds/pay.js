module.exports = {
  config: {
    name: "pay",
    version: "1.0",
    author: "Riley",
    role: 0,
    shortDescription: "give coins to another user",
    category: "Economy",
    guide: "{p}pay <user_id> <amount>",
  },
  onStart: async function ({ api, event, args, usersData }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const recipientID = args[0]; // ID penerima
    const amount = parseInt(args[1]); // Jumlah uang yang ingin diberikan

    if (isNaN(amount) || amount <= 0) {
      return api.sendMessage("Please enter a valid amount.", event.threadID);
    }

    if (userData.money < amount) {
      return api.sendMessage("Not enough money to give.", event.threadID);
    }

    const recipientData = await usersData.get(recipientID);

    userData.money -= amount; // Kurangi uang dari pengirim
    recipientData.money += amount; // Tambahkan uang ke penerima

    await usersData.set(senderID, userData);
    await usersData.set(recipientID, recipientData);

    api.sendMessage(`You have given ${amount} money to the recipient.`, event.threadID);
  },
};