//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//              HELP MENU V7
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

const { getPrefix } = global.utils;
const { commands } = global.GoatBot;

module.exports = {
	config: {
		name: "help",
		version: "7.0",
		author: "SAMI GÉNIE",
		countDown: 3,
		role: 0,
		description: {
			en: "Beautiful Help Menu"
		},
		category: "info",
		guide: {
			en:
`╭───────────❍
│ *help
│ *help ai
│ *help 2
╰──────────────❍`
		}
	},

	onStart: async function ({
		message,
		event,
		args
	}) {

		//━━━━━━━━━━[ PREFIX ]━━━━━━━━━━//

		const prefix =
			getPrefix(event.threadID);

		//━━━━━━━━━━[ CMD INFO ]━━━━━━━━━━//

		if (args[0] && isNaN(args[0])) {

			const cmd =
				commands.get(
					args[0].toLowerCase()
				);

			if (!cmd) {

				return message.reply(
`❌ | 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝`
				);
			}

			const cfg = cmd.config;

			let guide =
				cfg.guide?.en ||
				"𝐍𝐨 𝐠𝐮𝐢𝐝𝐞";

			if (typeof guide == "object")
				guide = guide.body;

			guide = guide
				.replace(/\{prefix\}|\{p\}/g, prefix)
				.replace(/\{name\}|\{n\}/g, cfg.name)
				.replace(/\{pn\}/g, prefix + cfg.name);

			return message.reply(
`╔════════════════╗
      𝐂𝐌𝐃 𝐈𝐍𝐅𝐎
╚════════════════╝

╭───────────❍
│ 🧩 𝐍𝐀𝐌𝐄
│ ${style(cfg.name)}
╰──────────────❍

╭───────────❍
│ 📝 𝐃𝐄𝐒𝐂
│ ${cfg.description?.en || "No description"}
╰──────────────❍

╭───────────❍
│ ⚡ 𝐕𝐄𝐑𝐒𝐈𝐎𝐍: ${cfg.version}
│ 👑 𝐑𝐎𝐋𝐄: ${cfg.role}
│ ⏰ 𝐂𝐎𝐎𝐋𝐃𝐎𝐖𝐍: ${cfg.countDown}s
│ 👨‍💻 𝐀𝐔𝐓𝐇𝐎𝐑: ${cfg.author}
╰──────────────❍

╭───────────❍
│ 📖 𝐆𝐔𝐈𝐃𝐄
│ ${guide}
╰──────────────❍`
			);
		}

		//━━━━━━━━━━[ CATEGORY SYSTEM ]━━━━━━━━━━//

		let categories = {};

		for (const [, cmd] of commands) {

			const category =
				(cmd.config.category || "OTHER")
				.toUpperCase();

			if (!categories[category])
				categories[category] = [];

			categories[category].push(
				cmd.config.name
			);
		}

		//━━━━━━━━━━[ SORT CATEGORY ]━━━━━━━━━━//

		const sortedCategories =
			Object.keys(categories).sort();

		let msg =
`╔════════════════╗
      𝐒𝐇𝐀𝐃𝐎𝐖 𝐇𝐄𝐋𝐏
╚════════════════╝

`;

		//━━━━━━━━━━[ SHOW CATEGORY ]━━━━━━━━━━//

		for (const category of sortedCategories) {

			msg +=
`╭───────────❍
│〘 ${style(category)} 〙
`;

			const cmdList =
				categories[category].sort();

			for (const cmd of cmdList) {

				msg +=
`│🎮| ${style(cmd)}
`;
			}

			msg +=
`╰──────────────❍

`;
		}

		//━━━━━━━━━━[ FOOTER ]━━━━━━━━━━//

		msg +=
`╭───❍【 🎮 | 𝐄𝐍𝐉𝐎𝐘 】
│» 𝐂𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐭𝐡𝐢𝐬 𝐛𝐨𝐭 𝐡𝐚𝐬
│『 ${commands.size} 』𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬
│» 𝐓𝐲𝐩𝐞 (${prefix}𝐡𝐞𝐥𝐩 𝐜𝐦𝐝)
│𝐓𝐨 𝐯𝐢𝐞𝐰 𝐝𝐞𝐭𝐚𝐢𝐥𝐬
│» 𝐇𝐞𝐥𝐥𝐨👋 𝐮𝐬𝐞 🪄${prefix}𝐒𝐡𝐚𝐝𝐨𝐰𝐠𝐜 🎉
│» 𝐭𝐨 𝐣𝐨𝐢𝐧 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐠𝐫𝐨𝐮𝐩 🎀
╰─────────────❍

╭────────────❍
│ ♛ 𝐒𝐇𝐀𝐃𝐎𝐖 𝐁𝐎𝐓 ♛
╰─────❍`;

		return message.reply(msg);
	}
};

//━━━━━━━━━━[ FONT STYLE ]━━━━━━━━━━//

function style(text) {

	const font = {
		a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝",
		e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡",
		i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥",
		m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩",
		q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭",
		u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱",
		y: "𝐲", z: "𝐳",

		A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃",
		E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇",
		I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋",
		M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏",
		Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓",
		U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗",
		Y: "𝐘", Z: "𝐙",

		0: "𝟎", 1: "𝟏", 2: "𝟐", 3: "𝟑",
		4: "𝟒", 5: "𝟓", 6: "𝟔", 7: "𝟕",
		8: "𝟖", 9: "𝟗"
	};

	return text
		.split("")
		.map(c => font[c] || c)
		.join("");
			}
