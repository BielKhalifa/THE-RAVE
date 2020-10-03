/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();

/**
 * Client Events
 */
// client.on("ready", () => {
//   console.log(`${client.user.username} ATIVO COM SUCESSO`);
//   client.user.setActivity(`${PREFIX}help`);
// });
// client.on("warn", (info) => console.log(info));
// client.on("error", console.error);


// client.on("ready", () => {
//   let activities = [~
//    `UTILIZE **${PREFIX}help** PARA OBTER AJUDA`,
//    `SERVIDORES`,
//    `CANAIS`,
//    `USUÁRIOS`
//   ],
//   i = 0;
//   setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
//   type: "WATCHING"
//   }), 5000);
//   client.user
//   .setStatus("online")
//   .catch(console.log);
//   console.log("ESTOU ONLINE!")
//   });


/** Então carregamos o evento quase do mesmo modo que o processo dos comandos. */
const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})

client.on('error', (err) => {
  console.log('error', err)
})


Assistir();
function Assistir() {
  {
    "install";
    {
      "include";
      [
        "^package\\.json$",
        "^\\.env$"
      ];
    }
    "restart";
    {
      "exclude";
      [
        "^public/",
        "^dist/"
      ],
        "include";
      [
        "\\.js$",
        "\\.json"
      ];
    }
    "throttle";
    900000;
  }
}


/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX)) {
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `por favor, espere ${timeLeft.toFixed(1)} segundo (s) antes de reutilizar o \`${command.name}\` comando.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("Ocorreu um erro ao executar esse comando.").catch(console.error);
    }
  }
});
