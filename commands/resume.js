const { canModifyQueue } = require("../util/EvobotUtil");

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Não há nada tocando.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();

      let ReEmbed = new MessageEmbed()
      .setColor("#a97f4d");
      ReEmbed.setTitle(`retomou a música!`, true)
      .setFooter(` | Comando requisitado por: ${message.author.username}`, message.author.displayAvatarURL())
 
      return message.channel.send(ReEmbed).catch(console.error);
    }

    let Re2Embed = new MessageEmbed()
    .setColor("#a97f4d");
    Re2Embed.setTitle("A fila não está em pausa.", true)
    .setFooter(` | Comando requisitado por: ${message.author.username}`, message.author.displayAvatarURL())

    return message.channel.send(Re2Embed).catch(console.error);
  }
};
