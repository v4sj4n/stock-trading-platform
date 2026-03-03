import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import platformsData from "@/data/platforms.json";

export const maxDuration = 30;

export async function POST(req: Request) {
	try {
		const { prompt } = await req.json();

		if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
			return new Response(
				JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY is missing" }),
				{ status: 500 },
			);
		}

		const google = createGoogleGenerativeAI({
			apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		});

		const platformNames = prompt.split(",").map((name: string) => name.trim());
		const selectedPlatformsData = platformsData.platforms.filter((p) =>
			platformNames.includes(p.name),
		);

		const result = streamText({
			model: google("gemini-2.5-flash"),
			temperature: 0.2,

			prompt: `Provide a detailed, professional AI analysis cleanly formatting a comparison between the following stock trading platforms: ${prompt}. 
            
            Here is the JSON data containing details about these platforms to base your analysis on:
            ${JSON.stringify(selectedPlatformsData, null, 2)}

            Focus on fees, ideal user profile, and major differences. Keep it highly structured using markdown headers and bullet points. Do not wrap the response in markdown blocks like \`\`\`markdown.`,
		});

		return result.toTextStreamResponse();
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
