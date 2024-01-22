import { EmbedBuilder, type ChatInputCommandInteraction, Attachment } from 'discord.js';
import type { Command } from '@structures/command.js';
import { geminiProVisionAPI } from '../../misc/util.js';

export default {
  data: {
    name: 'ask-ai-image',
    description: 'Ask the AI a question with an image',
    options: [
      {
        name: 'prompt',
        description: 'Your prompt to the AI',
        type: 3,
        required: true,
      },
      {
        name: 'image',
        description: 'The image to send to the AI',
        type: 11,
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
    const image: Attachment = interaction.options.getAttachment('image');
    await interaction.deferReply();

    try {
      // call API to get data from URL and send it back to user
      const res = await geminiProVisionAPI(prompt, image);

      const embed = new EmbedBuilder()
        .setTitle('AI Response')
        .setDescription(res)
        .setTimestamp()
        .setImage(image.url);

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
