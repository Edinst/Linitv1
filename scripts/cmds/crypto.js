const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
  config: {
    name: "crypto",
    aliases: ['cryptocurrency'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "crypto",
    longDescription: "crypto",
    category: "economy",
  }, 
  onStart: async function({api, event, args}) {
    var type;
  switch(args[0]) {
    case "bitcoin":
    case "Bitcoin":
    case "BTC":
    case "btc":
    type = "btc-bitcoin";
    break;
    case "ethereum":
    case "thereum":
    case "ETH":
    case "eth":
    type = "eth-ethereum";
    break;
    case "tether": 
    case "Tether":
    type = "usdt-tether";
    break;
    case "binance":
    case "Binance":
    case "Bnb":
    case "BNB":
    type = "bnb-binance-coin";
    break;
    case "USD Coin":
    case "usd coin":
    case "USD":
    type = "usdc-usd-coin";
    break;
    case "hex":
    case "HEX":
    type = "hex-hex";
    break;
    case "solana":
    case "Solana":
    case "SOL":
    case "sol":
    type = "sol-solana";
    break;
    case "Xrp":
    case "xrp":
    case "XRP":
    type = "xrp-xrp";
    break;
    case "terra":
    case "Terra":
    case "Luna":
    case "luna":
    type = "luna-terra";
    break;
    case "ada":
    case "ADA":
    case "cardano":
    case "Cardano":
    type = "ada-cardano";
    break;
    case "ust":
    case "UST":
    case "terrausd":
    case "Terrausd":
    type = "ust-terrausd";
    break;
    case "doge":
    case "DOGE":
    case "dogecoin":
    case "Dogecoin":
    type = "doge-dogecoin";
    break;
    default:
    return api.sendMessage(`⚠️Please put type of crypto coin.\\Lists of Coin Available:\Bitcoin\Ethereum\Tether\Binance\USD Coin\HEX\Solana\XRP\Terra\ADA\UST\DOGE`, event.threadID, event.messageID);
    break;
  }
    axios.get(`https://api.coinpaprika.com/v1/ticker/${type}`).then(res => {

var name = res.data.name;
var symbol = res.data.symbol;
var rank = res.data.rank;
var price_usd = res.data.price_usd;
var price_btc = res.data.price_btc;
var percent_24h = res.data.percent_change_24h;

var callback = function () {
 api.sendMessage({ body:`Name: ${name}\Symbol: ${symbol}\Rank: ${rank}\USD Price: ${price_usd}\BTC Price: ${price_btc}\Percent: ${percent_24h}`, attachment: fs.createReadStream(__dirname + '/cache/c.jpg')
					}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/c.jpg'), event.messageID);
				};
				request(`https://static.coinpaprika.com/coin/${type}/logo.png?rev=10557311`).pipe(fs.createWriteStream(__dirname + `/cache/c.jpg`)).on("close", callback);
                 })
  }
};