# 🦇 Gotham Crisis

Bem-vindo ao **Gotham Crisis**, um jogo web interativo e responsivo desenvolvido como projeto prático para a disciplina de **Sistemas Operacionais / Desenvolvimento Web**, focado em conceitos avançados de manipulação do **DOM (Document Object Model)**.

## 📜 Sobre o Jogo
O projeto consiste em um jogo de reação onde o objetivo é proteger a cidade de Gotham. As janelas do prédio acendem de forma assíncrona e aleatória, exigindo agilidade do jogador para neutralizar ameaças enquanto poupa os cidadãos.

## 🛠️ Requisitos Técnicos Implementados (Critérios de Avaliação)
O projeto foi estruturado seguindo as boas práticas de desenvolvimento front-end e os requisitos solicitados:
*   **Manipulação Dinâmica do DOM**: O tabuleiro de jogo (grid de 9 blocos) não é estático; ele é gerado e limpo dinamicamente via JavaScript através de métodos como `document.createElement()` e `appendChild()`.
*   **Gerenciamento de Eventos (Event Listeners)**: Captura e tratamento de cliques do usuário tanto nos botões de navegação de telas quanto nas janelas ativas.
*   **Funções Assíncronas e Temporizadores**: Implementação de controle de tempo real utilizando as APIs nativas `setInterval()` (para a regressão do cronômetro) e `setTimeout()` (para a alternância aleatória e fluida dos estados do jogo).
*   **Validação de Dados**: Tratamento e validação de strings de entrada dos inputs de texto com `.trim()`.
*   **Estrutura de Controle de Estado**: Mecânica de jogo baseada em estados dinâmicos (rodando, finalizado, resetado) alterando classes CSS em tempo de execução (`classList.add` e `classList.remove`).

## 🎮 Mecânica e Como Jogar
1. **Identificação**: Insira o seu codinome de herói na tela inicial.
2. **Customização de Dificuldade**: Escolha o tempo de duração da sua missão (15s, 30s ou 60s).
3. **Regras de Pontuação**:
    *   **Janela Vermelha 🔴 (Vilão)**: Clique rápido para derrotá-lo e somar **+10 pontos**.
    *   **Janela Azul 🔵 (Refém)**: Inocente no local! **NÃO CLIQUE**, ou você será penalizado com **-5 pontos**.
4. **Objetivo**: Consiga o recorde de pontuação antes que o cronômetro chegue a zero.

## 🚀 Tecnologias Utilizadas
*   **HTML5**: Estruturação semântica da aplicação e organização das camadas de interface (overlays).
*   **CSS3**: Estilização baseada na paleta clássica de Gotham (estilo *Batman: The Animated Series*), layout responsivo para dispositivos móveis e efeitos de iluminação (`box-shadow`).
*   **JavaScript (ES6+)**: Lógica de negócios, manipulação de estados e controle do DOM.

## 🔗 Link para o Projeto
O jogo está publicado e pronto para execução através do GitHub Pages:
[https://ianomaia.github.io/Projeto-JS-DOM/](https://ianomaia.github.io/Projeto-JS-DOM/)

---
*Desenvolvido por Ian O. Maia como atividade prática do curso de Sistemas de informação (Disciplina Web do professor Arthur Faria Porto).*
