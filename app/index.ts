import { Http } from "@nativescript/core";
import { EventData } from "@nativescript/core/data/observable";
import { TextField } from "@nativescript/core/ui/text-field";
import { Button } from "@nativescript/core/ui/button";
import { fromObject } from "@nativescript/core/data/observable";

export function pageLoaded(args) {
  // Obtenha o token de autenticação da variável de ambiente
  const authToken = process.env.AUTH_TOKEN;

  // Defina a URL da API OpenAPI
  const apiUrl = "https://api.openai.com/v1/";

  // Encontre as caixas de texto e botão em sua interface do usuário
  const textField = <TextField>args.object.getViewById("myTextField");
  const sendButton = <Button>args.object.getViewById("sendButton");
  const responseLabel = <TextField>args.object.getViewById("responseLabel");

  // Defina o modelo de dados para a página
  const viewModel = fromObject({
    response: ""
  });
  args.object.bindingContext = viewModel;

  // Defina a função que será executada quando o usuário enviar a pergunta
  function onSendButtonTap(args: EventData) {
    // Captura o valor digitado pelo usuário
    const question = textField.text;

    // Defina os parâmetros da pergunta que você deseja fazer
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
      // Exiba a resposta da API OpenAI na página
      viewModel.set("response", response.content.toJSON().choices[0].text);
    }).catch((error) => {
      // Exiba qualquer erro que ocorra durante a solicitação
      console.error(error);
    });
  }

  // Adicione o ouvinte de evento para o botão "Enviar"
  sendButton.on("tap", onSendButtonTap);
}
