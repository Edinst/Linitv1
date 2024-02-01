const fs = require("fs");

module.exports = {
  config: {
    name: "bank",
    description: "Deposit or withdraw money from the bank and earn interest",
    guide:{
      vi: "",
      en: "Bank:\nInterest - Balance\n - Withdraw \n- Deposit \n- Transfer \n- Richest"
    },
    category: "economy",
    countDown: 5,
    role: 0,
    author: "Loufi | SiAM | Samuel"
  },
  onStart: async function ({ args, message, event,api, usersData }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);
  
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const info = await api.getUserInfo(user);
			const username = info[user].name;
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));

    if (!bankData[user]) {
      bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFileSync("bank.json", JSON.stringify(bankData));
    }

    const command = args[0]?.toLowerCase();
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);

    switch (command) {
      case "deposit":
        if (isNaN(amount) || amount <= 0) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please enter a valid amount 🔁•\n\n╚════ஜ۩۞۩ஜ═══╝");
        }
        if (userMoney < amount) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You don't have the required amount✖️•\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        bankData[user].bank += amount;
        await usersData.set(event.senderID, {
          money: userMoney - amount
        });
        fs.writeFileSync("bank.json", JSON.stringify(bankData));

        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Successfully deposited ${amount} $ into your bank account✅•\n\n╚════ஜ۩۞۩ஜ═══╝`);

      case "withdraw":
        const balance = bankData[user].bank || 0;

        if (isNaN(amount) || amount <= 0) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please enter the correct amount 😪\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        if (amount > balance) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏The requested amount is greater than the available balance in your bank account...🗿\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        bankData[user].bank = balance - amount;
        await usersData.set(event.senderID, {
          money: userMoney + amount
        });
        fs.writeFileSync("bank.json", JSON.stringify(bankData));

        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Successfully withdrew ${amount}$ from your bank account•\n\n╚════ஜ۩۞۩ஜ═══╝`);

      case "balance":
        const bankBalance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank : 0;
        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Your bank balance is: ${bankBalance}$ •\n❏To withdraw money.\n type:\n${p}Bank Withdraw 'your withdrawal amount'•\n❏To earn interest\ntype:\n${p}Bank Interest•\n\n╚════ஜ۩۞۩ஜ═══╝`);

      case "interest":
        const interestRate = 0.001; // 0.1% daily interest rate
        const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();
        const currentTime = Date.now();
        const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
        const interestEarned = bankData[user].bank * (interestRate / 970) * timeDiffInSeconds;
        if (bankData[user].bank <= 0) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You don't have any money in your bank account to earn interest.💸🥱\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        bankData[user].lastInterestClaimed = currentTime;
        bankData[user].bank += interestEarned;

        fs.writeFileSync("bank.json", JSON.stringify(bankData));

        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You have earned interest of ${interestEarned.toFixed(2)} $ . It has been successfully added to your account balance..✅\n\n╚════ஜ۩۞۩ஜ═══╝`);

      case "transfer":
        const senderBalance = bankData[user].bank || 0;

        if (isNaN(amount) || amount <= 0) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please enter the amount you want to transfer...🗿😪\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        if (senderBalance < amount) {
          return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏The amount is not available in your bank account•\n\n╚════ஜ۩۞۩ஜ═══╝");
        }

        if (isNaN(recipientUID)) {
          return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please write:\n⭔ ${p}Bank Transfer followed by the amount and the recipient's ID {uid}•\nExample:\n${p}Bank Transfer 5000 289272210979\n\n╚════ஜ۩۞۩ஜ═══╝`);
        }

        if (!bankData[recipientUID]) {
          bankData[recipientUID] = { bank: 0, lastInterestClaimed: Date.now() };
          fs.writeFileSync("bank.json", JSON.stringify(bankData));
        }

        bankData[user].bank -= amount;
        bankData[recipientUID].bank += amount;

        fs.writeFileSync("bank.json", JSON.stringify(bankData));

        const Ruser = await api.getUserInfo(recipientUID);
			const Rname = Ruser[recipientUID].name;
        const recipientMessage = `╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You have received ${amount}$\nFrom:\n❏Name: ${username}\n❏BankID: ${user}.\n❏ Your current Bank balance:\n${bankData[recipientUID].bank}$\n\n-Sammy Bank✅\n\n╚════ஜ۩۞۩ஜ═══╝`;
  await api.sendMessage(recipientMessage, recipientUID);
        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Successfully deducted ${amount}$ from your account and transferred to Recipient Account\n\n-Recipient Info-\n❏Name: ${Rname}\n❏BankID: ${recipientUID}\n\n-Sammy Bank✅\n\n╚════ஜ۩۞۩ஜ═══╝`);
        

      case "richest":
        const bankDataCp = JSON.parse(fs.readFileSync('bank.json', 'utf8'));

        const topUsers = Object.entries(bankDataCp)
          .sort(([, a], [, b]) => b.bank - a.bank)
          .slice(0, 25);

        const output = (await Promise.all(topUsers.map(async ([userID, userData], index) => {
          const userName = await usersData.getName(userID);
          return `[${index + 1}. ${userName}]`;
        }))).join('\n');

        return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\nRichest people in the Bank Bot system👑🤴:\n" + output);

case "loan":
  const maxLoanAmount = 4000;
  const userLoan = bankData[user].loan || 0;
  const loanPayed = bankData[user].loanPayed !== undefined ? bankData[user].loanPayed : true;

  if (!amount) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please enter a valid loan amount..❗\n\n╚════ஜ۩۞۩ஜ═══╝");
  }

  if (amount > maxLoanAmount) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏The maximum loan amount is 4000 ‼️\n\n╚════ஜ۩۞۩ஜ═══╝");
  }

  if (!loanPayed && userLoan > 0) {
    return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You cannot take a new loan until you pay off your current loan..😑\nYour current loan to pay: ${userLoan}$\n\n╚════ஜ۩۞۩ஜ═══╝`);
  }

  bankData[user].loan = userLoan + amount;
  bankData[user].loanPayed = false;
  bankData[user].bank += amount;

  fs.writeFileSync("bank.json", JSON.stringify(bankData));

  return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You have successfully taken a loan of ${amount}$. Please note that loans must be repaid within a certain period.😉\n\n╚════ஜ۩۞۩ஜ═══╝`);
	

case "payloan":
  const loanBalance = bankData[user].loan || 0;

  if (isNaN(amount) || amount <= 0) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Please enter a valid amount to repay your loan..❗\n\n╚════ஜ۩۞۩ஜ═══╝");
  }

  if (loanBalance <= 0) {
    return message.reply("╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You don't have any pending loan payments.😄\n\n╚════ஜ۩۞۩ஜ═══╝");
  }

  if (amount > loanBalance) {
    return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏The amount required to pay off the loan is greater than your due amount. Please pay the exact amount.😊\nYour total loan: ${loanBalance}$\n\n╚════ஜ۩۞۩ஜ═══╝`);
  }

  if (amount > userMoney) {
    return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏You do not have ${amount}$ in your balance to repay the loan.❌\nType ${p}bal\nto view your current main balance..🫵\n\n╚════ஜ۩۞۩ஜ═══╝`);
  }

  bankData[user].loan = loanBalance - amount;

  if (loanBalance - amount === 0) {
    bankData[user].loanPayed = true;
  }

  await usersData.set(event.senderID, {
    money: userMoney - amount
  });

  fs.writeFileSync("bank.json", JSON.stringify(bankData));

  return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n[🏦 Bank Bot 🏦]\n\n❏Successfully repaid ${amount}$ towards your loan.✅\n\nto check type:\n${p}bank balance\n\nAnd your current loan to pay: ${bankData[user].loan}$\n\n╚════ஜ۩۞۩ஜ═══╝`);
			
        
default:
        return message.reply(`╔════ஜ۩۞۩ஜ═══╗\n\n===[🏦 Bank Bot 🏦]===\n\n❏Please use one of the following commands:\n❍  ${p}Bank Deposit\n❍  ${p}Bank Withdraw\n❍  ${p}Bank Balance\n❍  ${p}Bank Interest\n❍  ${p}Bank Transfer\n❍  ${p}Bank Richest\n❍  ${p}Bank Loan\n❍  ${p}Bank PayLoan\n\n╚════ஜ۩۞۩ஜ═══╝`);
    }
  }
};


