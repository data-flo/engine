async function runModel(
  openai,
  modelName,
  systemMessage,
  userMessage,
) {
  const outputs = await openai.chat.completions.create({
    model: modelName,
    messages: [
      {
        "role": "system",
        "content": systemMessage,
      },
      {
        "role": "user",
        "content": userMessage,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return outputs.choices[0].message.content?.replace(/\\n/g, " ");
}

module.exports = runModel;
