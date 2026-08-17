# Bullying - Realidade não Editada

PROMPT PROFISSIONAL

Você é um Desenvolvedor Full Stack Sênior, UI/UX Designer especialista em Human Interface Guidelines da Apple, Motion Designer e Especialista em Acessibilidade.

Sua missão é desenvolver um site totalmente responsivo, moderno e extremamente elegante chamado:

Imersão Bullying – Realidade não Editada

O objetivo do projeto é conscientizar estudantes sobre bullying através de uma experiência interativa e imersiva.

IMPORTANTE

NÃO implemente:

Cadastro de usuários
Registro de contas
Banco de Dados
Firebase
Supabase
MongoDB
PostgreSQL
Prisma
APIs externas
Backend

O login será apenas visual (Front-end Fake Login), apenas para dar continuidade ao fluxo da aplicação.

Não desperdice tokens criando autenticação.

ESTILO VISUAL

O design deve seguir fielmente o Design System da Apple.

Inspirar-se em:

apple.com

visionOS

iOS

macOS Sonoma

Características:

Dark Theme

Preto (#000000) como cor principal

Tons de cinza escuros

Glassmorphism

Backdrop Blur

Transparências suaves

Bordas arredondadas (20~28px)

Muito espaço em branco (negative space)

Layout minimalista

Elegância máxima

Fontes:

Inter

SF Pro Display

SF Pro Text

Caso SF Pro não esteja disponível utilizar apenas Inter.

ANIMAÇÕES

Todas as transições devem ser extremamente suaves.

Utilizar:

Framer Motion

ou

CSS Animations

com easing semelhante ao iOS.

Exemplos:

fade

slide

scale

blur in

blur out

opacity

stagger

parallax leve

cards aparecendo em cascata

hover elegante

botões com efeito de profundidade

transições de páginas

scroll reveal

microinterações

Nada exagerado.

Tudo deve parecer um produto oficial da Apple.

ESTRUTURA

Criar páginas utilizando uma navegação em formato de etapas (wizard), onde cada tela ocupa praticamente toda a viewport.

Fluxo:

Tela 1

Mensagem centralizada:

"Olá!
Seja bem-vindo à Imersão Bullying – Realidade não Editada"

Abaixo:

Botão

Começar

Ao clicar:

Texto desaparece com fade

Próxima seção entra suavemente

Tela 2

Título:

Aqui vamos aprender:

Lista animada:

• O que é Bullying

• Tipos de Bullying

• Como identificar

• Como prevenir

• Como agir

• Como denunciar

• Como apoiar uma vítima

• Como reverter uma situação de bullying

Botão:

Continuar

Tela 3

Questionário Interativo

Pergunta no topo:

Questão Teste

"Se algum colega de classe zomba de você por questões relacionadas à raça, etnia ou religião, você:"

Alternativas em Cards:

○ Reportaria à coordenação da escola

○ Conversaria com um professor

○ Ignoraria

○ Retrucaria com ofensas

○ Incentivaria outros colegas

Ao selecionar:

mostrar feedback animado

explicando por que aquela escolha é adequada ou inadequada.

Depois:

Botão Continuar

Tela 4

Login

IMPORTANTE

Não criar autenticação.

Apenas interface.

Layout dividido em duas colunas.

Lado esquerdo

Card Glassmorphism

Título

Entrar

Campos:

Nome

Turma (opcional)

Botão

Entrar

Ao clicar

redirecionar diretamente para Home.

Sem validações complexas.

Sem backend.

Lado direito

Exibir cards informativos animados.

Exemplos:

Card

Tipos de Bullying

Card

Como Identificar

Card

Como Denunciar

Card

Empatia

Card

Respeito

Card

Convivência Escolar

Esses cards devem possuir:

ícones minimalistas

efeito blur

hover elegante

leve escala

HOME

Após clicar em Entrar.

Criar Landing Page moderna.

Menu superior fixo.

Logo

Imersão Bullying

Links:

Início

Sobre

Aprender

Minigames

IA Educacional

Contato

Botão:

Começar Agora

Hero Section

Título grande.

"Bullying não é brincadeira."

Texto motivacional.

Botão:

Conversar com IA

Imagem abstrata com blur

efeitos luminosos discretos

formas orgânicas

glassmorphism

Sessão

Sobre o Projeto

Explicar objetivos.

Cards modernos.

Sessão

Tipos de Bullying

Criar cards:

Físico

Verbal

Psicológico

Virtual

Social

Racial

Religioso

Cada card:

ícone

descrição

hover

blur

Sessão

Como Identificar

Checklist.

Sessão

Como Prevenir

Cards.

Sessão

Como Agir

Timeline moderna.

Sessão

Dados Importantes

Criar gráficos fictícios apenas como exemplo visual.

Não utilizar APIs.

Sessão

Perguntas Frequentes

Accordion.

Footer

Links

Redes sociais fictícias

Direitos reservados

BOTÃO

Conversar com IA

Ao clicar

abrir uma página dedicada.

Essa página deve conter apenas:

chat moderno

caixa de texto

mensagens

layout semelhante ao ChatGPT

Não implementar IA.

Criar apenas a interface preparada para futura integração.

Não consumir tokens criando lógica.

MINIGAMES

Criar uma página chamada

Minigames

Com cartões.

Exemplos:

Quiz

Verdadeiro ou Falso

Escolha a Melhor Atitude

Complete a Situação

Cada jogo deve possuir animações.

Pontuação apenas local utilizando React State.

Sem banco de dados.

COMPONENTES

Criar componentes reutilizáveis.

Button

Card

GlassCard

Navbar

Footer

Accordion

QuestionCard

QuizOption

Hero

SectionTitle

Input

Modal

Toast

AnimatedBackground

BlurCircle

FloatingShapes

PageTransition

TECNOLOGIAS

Utilizar:

React

Next.js

TypeScript

Tailwind CSS

Framer Motion

Lucide Icons

Shadcn/ui

ORGANIZAÇÃO

Estrutura limpa.

components/

app/

pages/

hooks/

utils/

styles/

assets/

RESPONSIVIDADE

Desktop

Tablet

Celular

100% responsivo.

ACESSIBILIDADE

Contraste adequado

ARIA Labels

Navegação por teclado

Focus States

Alt em imagens

PERFORMANCE

Lazy Loading

Componentes reutilizáveis

Código organizado

Sem bibliotecas desnecessárias

RESULTADO ESPERADO

O resultado final deve transmitir a sensação de estar navegando em um produto premium da Apple, com animações refinadas, visual minimalista, experiência altamente fluida, foco em acessibilidade e uma abordagem educativa sobre o bullying. O projeto deve ser totalmente front-end, sem autenticação real e sem banco de dados, deixando pontos de integração preparados para futuras implementações.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b86fe01a-6c1a-4c1c-8f74-cbe83541bfc8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
