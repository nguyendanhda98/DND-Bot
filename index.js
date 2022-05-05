import { Client, Intents } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
  console.log('The Bot is online');
});
client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        console.log(message)
    }
});

client.login(token);
