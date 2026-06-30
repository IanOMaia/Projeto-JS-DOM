// ==========================================
// JS COMPLETO - GOTHAM CRISIS (VERSÃO ATUALIZADA)
// ==========================================

// Variáveis de Controle do Estado do Jogo
let tempoRestante = 30; 
let pontuacao = 0;
let loopJogo;
let loopCronometro;
let jogoRodando = false;

// Referências diretas dos elementos do HTML (DOM)
const elementoCronometro = document.getElementById('cronometro');
const elementoPontuacao = document.getElementById('pontuacao');
const elementoNomeExibido = document.getElementById('nome-exibido');
const gridTabuleiro = document.getElementById('grid-tabuleiro');
const inputNomeJogador = document.getElementById('nome-jogador');
const telaInicial = document.getElementById('tela-inicial');
const telaFim = document.getElementById('tela-fim');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

// FUNÇÃO CRITICAL: Injeta os 9 blocos (janelas) dentro da div do tabuleiro
function criarGrid() {
    if (!gridTabuleiro) return; // Proteção caso o elemento não exista
    
    gridTabuleiro.innerHTML = ''; // Limpa qualquer resíduo anterior
    
    for (let i = 0; i < 9; i++) {
        const bloco = document.createElement('div');
        bloco.classList.add('bloco');
        bloco.dataset.id = i; 
        bloco.addEventListener('click', clicouNoBloco);
        gridTabuleiro.appendChild(bloco);
    }
}

// Inicia a partida e gerencia o fluxo de telas
function iniciarJogo() {
    const nome = inputNomeJogador.value.trim();
    
    // Validação obrigatória do nome do jogador
    if (nome === '') {
        alert("Por favor, herói, digite seu codinome antes de iniciar a missão!");
        return;
    }

    // Reseta dados e atualiza interface
    elementoNomeExibido.textContent = nome;
    tempoRestante = 30;
    pontuacao = 0;
    elementoPontuacao.textContent = pontuacao;
    elementoCronometro.textContent = tempoRestante;
    jogoRodando = true;

    // Transição de Telas (Esconde inicial, mostra tabuleiro)
    telaInicial.classList.add('escondido');
    gridTabuleiro.classList.remove('escondido');

    // Executa a criação das janelas e os cronômetros
    criarGrid();
    iniciarCronometro();
    jogoContinua();
}

// Controla o surgimento aleatório dos alvos nas janelas
function jogoContinua() {
    if (!jogoRodando) return;

    // Remove os estados ativos das janelas do turno anterior
    const blocoAtivo = document.querySelector('.bloco.ativo');
    if (blocoAtivo) {
        blocoAtivo.classList.remove('ativo', 'vilao', 'refem');
    }

    const readinessBlocos = document.querySelectorAll('.bloco');
    if (readinessBlocos.length === 0) return; // Segurança

    // Sorteia uma das 9 janelas (0 a 8)
    const indiceAleatorio = Math.floor(Math.random() * readinessBlocos.length);
    const blocoSorteado = readinessBlocos[indiceAleatorio];

    blocoSorteado.classList.add('ativo');

    // Sorteio: 70% de chance de ser Vilão, 30% de ser Refém
    if (Math.random() < 0.7) {
        blocoSorteado.classList.add('vilao');
    } else {
        blocoSorteado.classList.add('refem');
    }

    // Loop de tempo (900 milissegundos para cada alteração de janela)
    loopJogo = setTimeout(jogoContinua, 900);
}

// Processa o clique do jogador nas janelas acesas
function clicouNoBloco(event) {
    if (!jogoRodando) return;

    const blocoClicado = event.currentTarget;

    if (blocoClicado.classList.contains('vilao')) {
        pontuacao += 10;
        // Limpa o bloco imediatamente após o acerto (feedback rápido)
        blocoClicado.classList.remove('ativo', 'vilao');
    } else if (blocoClicado.classList.contains('refem')) {
        pontuacao -= 5;
        alert("💥 Cuidado! Você atingiu um refém inocente!");
        blocoClicado.classList.remove('ativo', 'refem');
    }

    elementoPontuacao.textContent = pontuacao;
}

// Gerencia o tempo regressivo de 30 segundos
function iniciarCronometro() {
    loopCronometro = setInterval(() => {
        tempoRestante--;
        elementoCronometro.textContent = tempoRestante;
        
        if (tempoRestante <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

// Encerra os loops e exibe a tela de Game Over
function finalizarJogo() {
    jogoRodando = false;
    clearInterval(loopCronometro);
    clearTimeout(loopJogo);

    document.getElementById('pontuacao-final').textContent = pontuacao;
    gridTabuleiro.classList.add('escondido');
    telaFim.classList.remove('escondido');
}

// Event Listeners dos Botões principais
if (btnIniciar) btnIniciar.addEventListener('click', iniciarJogo);

if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
        telaFim.classList.add('escondido');
        telaInicial.classList.remove('escondido');
        inputNomeJogador.value = '';
    });
}
