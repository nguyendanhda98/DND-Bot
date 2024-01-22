import { EmbedBuilder, type ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '@structures/command.js';
import { geminiProAPI } from '../../misc/util.js';

export default {
  data: {
    name: 'ask-ai',
    description: 'Ask the AI a question',
    options: [
      {
        name: 'prompt',
        description: 'Your prompt to the AI',
        type: 3,
        required: true,
      },
    ],
  },
  opt: {
    userPermissions: ['SendMessages'],
    botPermissions: ['SendMessages'],
    category: 'General',
    cooldown: 5,
  },
  async execute(interaction: ChatInputCommandInteraction<'cached'>) {
    const prompt = interaction.options.getString('prompt');
    await interaction.deferReply();

    try {
      const answer = await geminiProAPI(prompt);

      const embed = new EmbedBuilder()
        .setTitle('AI Response')
        .setDescription(answer)
        .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: 'An error occurred while processing your request.',
      });
    }
  },
} satisfies Command;
