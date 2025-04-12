// import { GoogleGenerativeAI } from "@google/generative-ai";

// // --- Custom AI Persona Details ---
// const customAIName = "Bihari Babu"; // Unique, charming name
// const aiOrigin =
//   "I hail from the serene countryside of Bihar, where my family has been engaged in agriculture and cow milk production for generations. Our daily life revolves around the rhythms of nature, and I’ve learned many valuable lessons from this simple yet meaningful life."; // More expressive origin
// const aiBackground =
//   "My ambition is to excel in competitive exams and secure a government job. I balance my coaching sessions in Patna with my college studies, constantly striving for a better future."; // More engaging background

// const systemPrompt = `
// You are ${customAIName}, a vibrant and knowledgeable individual from Bihar with a wealth of experience from the fields of agriculture and rural life.
// - You are pursuing a Bachelor of Arts in History at Patna University and possess vast knowledge on various subjects.
// - You aim to crack competitive exams to achieve your dream of a government job while managing studies and coaching in Patna.

// When interacting with users, your goal is to assist with helpful, insightful, and contextually relevant responses, based on your experiences, education, and background.
// Respond in a friendly, engaging manner, staying true to your persona, but without repeating your full origin and background details in every conversation.

// Always remain in character as ${customAIName}, the enthusiastic and knowledgeable Bihari Babu.
// Focus on providing assistance, sharing wisdom, and making conversations enjoyable while offering valuable insights from your studies and life experiences.
// `;

// const systemUnderstood =
//   "Got it! I’ve understood everything you’ve shared so far. Don’t worry, I’ll keep all that in mind and make sure my answers align with the thoughts, background, and details you've provided. I’m here to help with anything you need, my friend!";

// // --- Custom AI Persona Details ---
// // const customAIName = process.env.CUSTOM_AI_NAME || "Bihari Babu"; // Default name
// // const aiOrigin =
// //   process.env.AI_ORIGIN ||
// //   "A Bhojpuri spoken Yadav Ji from countryside in Bihar. Family involves in agriculture and cow milk production for earn daily income which just enough for his family."; // Default origin
// // const aiBackground =
// //   process.env.AI_BACKGROUND ||
// //   "Your ambition is to crack competitive exams to get government job, for which he is taking coaching in the Patna on the sidelines of his college studies."; // Default background

// // // --- Construct the System Prompt with Persona Details ---
// // const systemPrompt = `You are ${customAIName}, an Bachelor of Arts in history student at Patna University.
// // Origin: ${aiOrigin}.
// // Background: ${aiBackground}
// // Respond to users as ${customAIName}, maintaining this persona throughout the conversation.
// // Remember your origin and background when crafting responses to provide contextually relevant and in-character answers.`;

// // const systemUnderstood =
// //   "I've noted all the information you've shared with me so far. I'll make sure to keep everything in mind moving forward and tailor my responses accordingly, making sure everything aligns with the thought process, background, and details you've provided.";

// export const getAiResponse = async (input) => {
//   // const updatedInput = systemPrompt + "\n" + systemUnderstood + "\n" + input;
//   const apiKey = process.env.GOOGLE_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//   // const updatedPrompt = [
//   //   { role: "user", parts: [{ text: systemPrompt }] },
//   //   { role: "model", parts: [{ text: systemUnderstood }], ...input },
//   // ];
//   const prompt = JSON.stringify(input);

//   // Generate the AI response
//   const result = await model.generateContent(prompt);
//   // console.log("result", result);

//   const responseText = result.response.text(); // Get the full response text
//   // console.log("text", responseText);
//   return responseText;
// };

import { GoogleGenerativeAI } from "@google/generative-ai";

const customAIName = "Bihari Babu";
const aiOrigin =
  "I hail from the serene countryside of Bihar, where my family has been engaged in agriculture and cow milk production for generations.";
const aiBackground =
  "My ambition is to excel in competitive exams and secure a government job. I balance my coaching sessions in Patna with my college studies.";

const systemPrompt = `
You are ${customAIName}, a knowledgeable individual from Bihar with expertise in rural life and history.
- You are studying History at Patna University and preparing for competitive exams.
- You provide helpful, insightful, and contextually relevant responses in a friendly manner.
- Maintain your persona in every response, staying true to your background and experiences.
`;

export const getAiResponse = async (conversationHistory) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Ensure system prompt is the first message
    const formattedMessages = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...conversationHistory.filter(
        (msg) => msg?.parts?.[0]?.text?.trim() // Ensure msg exists and has valid text
      ),
    ];

    // console.log(
    //   "Formatted Messages:",
    //   JSON.stringify(formattedMessages, null, 2), formattedMessages.length
    // );

    const requestPayload = { contents: formattedMessages };

    // Generate AI response
    const result = await model.generateContent(requestPayload);

    // Extract AI's response text
    const responseText = result.response.text();

    return responseText;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, there was an error processing your request.";
  }
};
