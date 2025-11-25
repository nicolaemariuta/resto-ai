// For now this just echoes the user text.
// Later you can replace this with a real API call.
export async function getAiReply(userText) {
  // Pretend there's a delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return `AI (placeholder): ${userText}`;
}