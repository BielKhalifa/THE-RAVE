const { canModifyQueue } = require("../util/EvobotUtil");

const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Não há nada tocando.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Você precisa ingressar em um canal de voz primeiro!").catch(console.error);

    if (!args[0]) return message.reply(`O volume atual é: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Por favor, use um número para definir o volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Por favor, use um número entre 0 e 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    let VolEmbed = new MessageEmbed()
     .setColor("#a97f4d");
     VolEmbed.setTitle(`Volume definido como: **${args[0]}%**`, true)
     .setFooter(` | Comando requisitado por: ${message.author.username}`, message.author.displayAvatarURL())

     return message.channel.send(VolEmbed).catch(console.error);
  }
};
