# Corrigir o Preview Recorrente

## Diagnóstico confirmado

- A rota inicial responde com status **200** e entrega o HTML corretamente.
- Em um navegador limpo, a interface renderiza “Olá! / Começar” sem erros de JavaScript.
- O servidor está ativo e não registra falhas recentes.
- O painel Preview reconhece um visualizador conectado, porém ele não responde nem a uma leitura mínima do DOM. Isso confirma que a sessão interna do visualizador/iframe está travada.

## Por que isso acontece repetidamente

O Preview do editor mantém uma conexão própria para receber atualizações e recarregar a aplicação. Quando essa conexão ou o iframe entra em um estado inconsistente após várias atualizações, ele pode permanecer na tela cinza mesmo com o servidor e o site funcionando. Alterar componentes não resolve essa condição porque o defeito está na sessão do visualizador, fora do código da interface.

## Plano de recuperação

1. Reiniciar uma única vez o processo de desenvolvimento supervisionado para renovar a conexão do Preview.
2. Aguardar o servidor voltar a responder e confirmar novamente a rota inicial.
3. Testar o conteúdo e a navegação no próprio painel Preview.
4. Se o iframe continuar preso, preservar o código e renovar a sessão do editor abrindo o Preview em nova aba ou fazendo uma recarga completa do Lovable.
5. Confirmar ao final se o painel voltou a exibir a interface; não considerar resolvido apenas porque o servidor responde.

## Alterações no projeto

Nenhuma mudança visual ou funcional será feita, pois modificar o aplicativo para compensar uma sessão travada do Preview criaria risco de regressão sem tratar a causa real.