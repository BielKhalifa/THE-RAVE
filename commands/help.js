const { MessageEmbed } = require("discord.js");

const { PREFIX } = require("../config.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {


    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'playbutton');
    const pause = message.guild.emojis.cache.find(emoji => emoji.name === 'pause');
    const volume = message.guild.emojis.cache.find(emoji => emoji.name === 'volume');
    const letra = message.guild.emojis.cache.find(emoji => emoji.name === 'ABC');
    const skip = message.guild.emojis.cache.find(emoji => emoji.name === 'skip');
    const loop = message.guild.emojis.cache.find(emoji => emoji.name === 'loop');
    const list = message.guild.emojis.cache.find(emoji => emoji.name === 'list');
    let botAvatar = ("https://c4n3l4.github.io/image/ef70e809678c7ca0a96de6448aa456fc.jpg")
    let Banner = ("https://c4n3l4.github.io/image/RAVE%20BACKGROUND%20(%20TEMPORARIO%20).png")
    let helpEmbed = new MessageEmbed()
      .setTitle(`• Olá, eu sou **THE RAVE**`)
      .setDescription(`Lista de todos os comandos`)
      .setColor("#a97f4d");
      helpEmbed.addField(`**MENU INICIAL**\n\n`, `${emoji} | **Play:**\n ${pause} | **Pause:**\n ${emoji} | **Resume:**\n ${skip} | **Skip:**\n ${volume} | **Volume:**\n ${letra} | **Letra:**\n ${loop} | **Loop:**\n  ${list} | **Lista de Reprodução:**\n`, true)
      helpEmbed.addField(`**COMANDOS**\n\n`, `${PREFIX}p\n ${PREFIX}pause\n  ${PREFIX}resume\n  ${PREFIX}s \n ${PREFIX}v\n ${PREFIX}ly\n ${PREFIX}loop \n ${PREFIX}queue \n`, true)
      .setImage(Banner)
      .setThumbnail(botAvatar)
      .setFooter(` | Comando requisitado por: ${message.author.username}`, message.author.displayAvatarURL())


    return message.channel.send(helpEmbed).catch(console.error);
  }
};
