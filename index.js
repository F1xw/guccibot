const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const botToken = process.env.DISCORD_BOT_TOKEN;

const client = new Commando.Client({
    owner: '446727597834108938'
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.on('error', console.error);

client.login(botToken);

client.setProvider(
    sqlite.open({ filename: 'database.db', driver: sqlite3.Database }).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerGroups([
        ['managment', 'Commands for managment'],
        ['gucci', 'Gucci related commands'],
        ['other', 'Other stuff']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));