import { Http } from "@nativescript/core";

// Obtenha o token de autenticação da variável de ambiente
const authToken = process.env.AUTH_TOKEN;

// Defina a URL da API OpenAPI
const apiUrl = "https://api.openai.com/v1/";

// Defina os parâmetros da pergunta que você deseja fazer
const question = "Qual é a capital do Brasil?";
const model = "davinci";
const prompt = `Answer the following question:\n\n${question}\n\nAnswer:`;

// Envie a pergunta para a API OpenAI
Http.request({
  url: `${apiUrl}completions`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authToken}`,
  },
  content: JSON.stringify({
    prompt,
    model,
    max_tokens: 5,
  }),
}).then((response) => {
  // Exiba a resposta da API OpenAI
  console.log(response.content.toJSON().choices[0].text);
}).catch((error) => {
  // Exiba qualquer erro que ocorra durante a solicitação
  console.error(error);
});
