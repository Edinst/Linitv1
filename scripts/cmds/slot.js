module.exports = {
  config: {
    name: "slot",
    version: "1.0",
    author: "Riley",
    countDown: 10,
    shortDescription: {
      en: "Slot game",
    },
    longDescription: {
      en: "Slot game.",
    },
    category: "Game",
  },
  langs: {
    en: {
      invalid_amount: "Masukkan jumlah yang valid dan positif untuk memiliki peluang menang ganda 🤦🏻‍♂️",
      not_enough_money: "Liat jumlah balance mu dulu 👌",
      spin_message: "Spinning...",
      win_message: "you win!💝 $%1 ",
      lose_message: "sorry you lose💔 $%1 ",
      jackpot_message: "Jackpot!😲 You won $%1 with three %2 symbols",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["🍒", "🍇", "🍊", "🍉", "🍎", "🍓", "🍏", "🍌"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
    return betAmount * 10;
  } else if (slot1 === "🍇" && slot2 === "🍇" && slot3 === "🍇") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "🍒" && slot2 === "🍒" && slot3 === "🍒") {
      return getLang("jackpot_message", winnings, "🍒");
    } else {
      return getLang("win_message", winnings) + 
        ` 
      [ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) +
      ` 
    [ ${slot1} | ${slot2} | ${slot3} ]`;
  }
      }