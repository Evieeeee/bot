const { Client, Partials, Collection, Events, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const path = require('node:path');
const fs = require('fs-extra');
const wait = require('node:timers/promises').setTimeout;
const { emojiCountryCode } = require('country-code-emoji');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://..evielator.db');

keyv.on('error', err => console.log('Connection Error', err));

const guildObj = JSON.parse(process.env.guilds);
const langs = JSON.parse(process.env.languages);

client = new Client({ intents: [GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.DirectMessages,
GatewayIntentBits.GuildMessageReactions
],
partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.login(process.env.evielator);
