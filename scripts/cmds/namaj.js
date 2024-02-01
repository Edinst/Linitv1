const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "namaj",
    version: "1.1",
    author: "mahim",
    countDown: 5,
    role: 0,
    shortDescription: "Get prayer time information",
    longDescription: "This command retrieves the prayer time information for a given location.",
    category: "islam",
    guide: "To use this command, type `-Namaj <location>`.",
  },

  onStart: async function ({ api, args, message }) {
    const location = args.join(" ");

    if (!location) {
      message.reply("Please provide a location.");
      return;
    }

    try {
      const url = `https://www.google.com/search?q=prayer+time+in+${encodeURIComponent(location)}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const cityAndDateText = $('.BNeawe.tAd8D.AP7Wnd').text();
      const cityAndDateMatch = cityAndDateText.match(/^(.*?)\s\u2014\s(.*)$/);
      const cityName = cityAndDateMatch ? cityAndDateMatch[1].trim() : '';
      const date = cityAndDateMatch ? cityAndDateMatch[2].trim().replace(/View all/g, '') : '';

      const prayerTimesTable = $('.LnMnt tbody tr');

      const prayerTimes = {};
      prayerTimesTable.each((index, element) => {
        const prayerName = $(element).find('td:nth-child(1)').text().trim();
        const prayerTime = $(element).find('td:nth-child(2)').text().trim();
        prayerTimes[prayerName] = prayerTime;
      });

      let replyMessage = `🕋 --- PRAYER TIME ---🕋\n🌍 Location: ${cityName}\n🗓️ Date: ${date}\n`;

      const prayerNames = ["Sunrise", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const currentTime = moment().tz('Asia/Dhaka');
      let nextPrayer = '';
      let remainingTime = '';

      // Find the next prayer and calculate remaining time
      for (let i = 1; i < prayerNames.length; i++) {
        const prayerName = prayerNames[i];
        const prayerTime = moment(prayerTimes[prayerName], 'h:mm A').tz('Asia/Dhaka');

        if (currentTime.isBefore(prayerTime)) {
          nextPrayer = prayerName;
          remainingTime = moment.duration(prayerTime.diff(currentTime)).humanize();
          break;
        }
      }

      // Add prayer times to the reply message
      for (let i = 1; i < prayerNames.length; i++) {
        const prayerName = prayerNames[i];
        const prayerTime = prayerTimes[prayerName];
        replyMessage += `\n🤲${prayerName}: ${prayerTime}`;
      }

      // Add next prayer information
      replyMessage += `\n\n🕌 Next Prayer Start 🕌\nCurrent time: ${currentTime.format('h:mm A')}`;

      if (nextPrayer) {
        replyMessage += `\nNext prayer: ${nextPrayer}\nTime: ${prayerTimes[nextPrayer]}\nTime remaining: ${remainingTime}`;
      } else {
        replyMessage += "\nNo more prayers today.";
      }

      message.reply(replyMessage);
    } catch (error) {
      console.error("Error retrieving prayer time information:", error);
      message.reply("Sorry, there was an error retrieving the prayer time information.");
    }
  },
};