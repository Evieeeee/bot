
const { Client, ActivityType, GatewayIntentBits } = require("discord.js");

client = new Client({ intents: [GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers,
] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity("💙💙All Issues Fixed💙💙 Coming Soon - Slash Commands (Eta 2 months) New Wasteland App (Eta 2 weeks)", {
    type: ActivityType.Watching,
  });
});

client.login(`xx`);