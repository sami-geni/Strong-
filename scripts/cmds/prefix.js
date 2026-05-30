const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "2.0",
		author: "NTKhang + Edit",
		countDown: 5,
		role: 0,
		description: "Changer le préfixe du bot",
		category: "config",
		guide: {
			fr:
				" {pn} <nouveau préfixe>\n" +
				"Exemple: {pn} .\n\n" +
				"{pn} reset → remettre le préfixe par défaut"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData }) {

		if (!args[0])
			return  message.reply(
`╭─⌾🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│🌀|𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧 : .𝐩𝐫𝐞𝐟𝐢𝐱 .
╰──────────⌾`
			);

		// RESET PREFIX
		if (args[0] == "reset") {
			await threadsData.set(event.threadID, null, "data.prefix");

			return message.reply(
`╭─⌾🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│✅|𝐏𝐫𝐞𝐟𝐢𝐱 𝐫𝐞́𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐢𝐬𝐞́ : ${global.GoatBot.config.prefix}
╰──────────⌾`
			);
		}

		const newPrefix = args[0];

		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "-g") {
			if (role < 2) {
				return message.reply(
`╭─⌾🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│❌|𝐒𝐞𝐮𝐥 𝐥'𝐚𝐝𝐦𝐢𝐧 𝐩𝐞𝐮𝐭
│𝐜𝐡𝐚𝐧𝐠𝐞𝐫 𝐥𝐞 𝐩𝐫𝐞𝐟𝐢𝐱 𝐠𝐥𝐨𝐛𝐚𝐥
╰──────────⌾`
				);
			}
			formSet.setGlobal = true;
		}
		else {
			formSet.setGlobal = false;
		}

		return message.reply(
`╭─⌾🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│⚠️| 𝐑𝐞́𝐚𝐠𝐢𝐬 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞
│𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐟𝐢𝐫𝐦𝐞𝐫 𝐥𝐞 𝐧𝐨𝐮𝐯𝐞𝐚𝐮
│préfixe : ${newPrefix}
╰──────────⌾`,
			(err, info) => {
				formSet.messageID = info.messageID;
				global.GoatBot.onReaction.set(info.messageID, formSet);
			}
		);
	},

	onReaction: async function ({ message, threadsData, event, Reaction }) {

		const { author, newPrefix, setGlobal } = Reaction;

		if (event.userID != author)
			return;

		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;

			fs.writeFileSync(
				global.client.dirConfig,
				JSON.stringify(global.GoatBot.config, null, 2)
			);

			return message.reply(
`╭─⌾ 🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│🌐|𝐍𝐨𝐮𝐯𝐞𝐚𝐮 𝐩𝐫𝐞𝐟𝐢𝐱
│✅ ${newPrefix}
╰──────────⌾`
			);
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");

			return message.reply(
`╭─⌾🌿 𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│🪄 |𝐏𝐫𝐞𝐟𝐢𝐱 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞
│✅ ${newPrefix}
╰──────────⌾`
			);
		}
	},

	onChat: async function ({ event, message }) {

		if (event.body && event.body.toLowerCase() === "prefix") {

			return message.reply(
`╭─⌾🌿𝙷𝙴𝙳𝙶𝙴𝙷𝙾𝙶 🌿
│🎀 𝐒𝐲𝐬𝐭𝐞𝐦 𝐩𝐫𝐞𝐟𝐢𝐱: ${global.GoatBot.config.prefix}
│🎀 𝐁𝐨𝐱 𝐜𝐡𝐚𝐭 𝐩𝐫𝐞𝐟𝐢𝐱 : ${utils.getPrefix(event.threadID)}
╰──────────⌾`
			);
		}
	}
};
