const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

let products = JSON.parse(fs.readFileSync('productList.json'));

module.exports = class RandomProductCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            aliases: ['rd', 'random-product'],
            group: 'gucci',
            memberName: 'random',
            description: 'Replies with a random Gucci product to suit your needs.'
        });
    }

    run(msg) {

        var rp = randomProperty(randomProperty(products));

        const embed = new MessageEmbed()
            .setTitle(rp.name)
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/1280px-1960s_Gucci_Logo.svg.png")
            .setDescription("Zufälliges Produkt aus meinem Gucci-Katalog!")
            .setImage(rp.image)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Preis', value: rp.price, inline: true },
                { name: 'Beschreibung', value: rp.description, inline: true },
            )
            .setFooter(msg.author.username, msg.author.avatarURL)
            .setColor(0x00AE86)
            .setTimestamp();
        return msg.embed(embed);
    }
}