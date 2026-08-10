# Recuperar o Preview

## Diagnóstico confirmado

- A página inicial responde com status 200.
- O conteúdo “Olá! / Começar” renderiza normalmente em um navegador limpo.
- Não há erro no console nem falha recente no servidor.
- O painel Preview está conectado, mas não responde às inspeções; isso indica uma sessão travada do visualizador, não um defeito na aplicação.

## Plano

1. Reiniciar uma única vez o processo de desenvolvimento supervisionado para forçar uma nova conexão do Preview.
2. Aguardar o servidor voltar a responder e abrir novamente a rota inicial.
3. Validar no próprio painel Preview que o conteúdo aparece e que a navegação continua funcionando.
4. Se o painel permanecer travado apesar do servidor saudável, manter o código intacto e orientar a reabertura do Preview em nova aba ou o recarregamento completo do editor.

## Alterações no projeto

Nenhuma alteração visual ou funcional está prevista, pois o código atual já renderiza corretamente.