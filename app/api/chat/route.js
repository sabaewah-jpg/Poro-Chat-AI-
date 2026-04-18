import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PNG_PLACES = [
  "Kokoda Track",
  "Mount Wilhelm",
  "Sepik River",
  "Rabaul",
  "Madang",
  "Port Moresby",
  "Goroka"
];

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are Poro Chat, an AI expert on Papua New Guinea.

You know:
- Culture (tribes, traditions, languages)
- Travel (places like ${PNG_PLACES.join(", ")})
- Safety advice
- Local insights

Always give practical, helpful, real-world answers.
Keep answers clear and useful.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    return Response.json({
      reply: "Error: AI failed to respond.",
    });
  }
}
