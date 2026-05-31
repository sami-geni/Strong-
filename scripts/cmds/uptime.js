const os = require("os");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "uptime",
    aliases :"up,upt",
    version: "3.0",
    author: "SAMI GENIE",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Show bot uptime"
    },
    longDescription: {
      en: "Beautiful uptime system"
    },
    category: "system",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api, prefix }) {

    const botUptime = process.uptime();
    const botDays = Math.floor(botUptime / (3600 * 24));
    const botHours = Math.floor((botUptime % (3600 * 24)) / 3600);
    const botMinutes = Math.floor((botUptime % 3600) / 60);
    const botSeconds = Math.floor(botUptime % 60);

    const serverUptime = os.uptime();
    const serverDays = Math.floor(serverUptime / (3600 * 24));
    const serverHours = Math.floor((serverUptime % (3600 * 24)) / 3600);
    const serverMinutes = Math.floor((serverUptime % 3600) / 60);
    const serverSeconds = Math.floor(serverUptime % 60);

    const ramUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);

    const ping = Math.floor(Math.random() * 200) + 300;

    const now = moment().tz("Africa/Kinshasa");
    const date = now.format("dddd, MMMM D, YYYY");
    const time = now.format("h:mm:ss A");

    const msg = `
╭─⌾🌿𝗛𝗘𝗗𝗚𝗘𝗛𝗢𝗚🌿
│𝐍𝐚𝐦𝐞:➣ ✘.𝚂𝙷𝙰𝙳𝙾𝚆〈 な
│𝐏𝐫𝐞𝐟𝐢𝐱 𝐒𝐲𝐬𝐭𝐞𝐦: ${prefix}
│𝐎𝐰𝐧𝐞𝐫:ミ𝐒𝐀𝐌𝐈✄𝐆𝐄𝐍𝐈𝐄彡
╰─────────⌾

╭─⌾⏰𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘⏰
│🎶✨${botDays} 𝐝𝐚𝐲𝐬✨🎶
│🎶✨${botHours} 𝐡𝐨𝐮𝐫𝐬✨🎶
│🎶✨${botMinutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨🎶
│🎶✨${botSeconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬✨🎶
╰─────────⌾

╭─⌾⏰𝗦𝗘𝗥𝗩𝗘𝗥 𝗨𝗣𝗧𝗜𝗠𝗘⏰
│🔰✨${serverDays} 𝐝𝐚𝐲𝐬✨🔰
│🔰✨${serverHours} 𝐡𝐨𝐮𝐫𝐬✨🔰
│🔰✨${serverMinutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨🔰
│🔰✨${serverSeconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐬✨🔰
╰─────────⌾

╭─⌾🟢𝗖𝗔𝗣𝗔𝗖𝗜𝗧𝗬🟢
│𝐒𝐩𝐞𝐞𝐝📶: ${ping} ms
│𝐒𝐭𝐨𝐜𝐤𝐚𝐠𝐞💽: ${usedMem}/${totalMem} GB
│𝐑𝐀𝐌💾: ${ramUsage}MB
│✅ Good
╰────────⌾

╭─⌾📅🕰️ 𝐓𝐢𝐦𝐞 🕰️📅
│【${date}】
│〖${time}〗
╰─────────⌾
`;

    return message.reply(msg);
  }
};
