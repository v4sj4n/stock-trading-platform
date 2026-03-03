"use server";

import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createStreamableValue } from '@ai-sdk/rsc';
import platformsData from '@/data/platforms.json';

export async function comparePlatformsAction(prompt: string) {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is missing');
    }

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const platformNames = prompt.split(',').map((name: string) => name.trim());
    const selectedPlatformsData = platformsData.platforms.filter((p) =>
        platformNames.includes(p.name),
    );

    const result = streamText({
        model: google('gemini-2.5-flash'),
        temperature: 0.2,
        prompt: `Provide a detailed, professional AI analysis cleanly formatting a comparison between the following stock trading platforms: ${prompt}. 
        
        Here is the JSON data containing details about these platforms to base your analysis on:
        ${JSON.stringify(selectedPlatformsData, null, 2)}

        Focus on fees, ideal user profile, and major differences. Keep it highly structured using markdown headers and bullet points. Do not wrap the response in markdown blocks like \`\`\`markdown.`,
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}
