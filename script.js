// ==========================================
// ESTADO DO JOGO (Variáveis de Controle)
// ==========================================
let pontuacao = 0;
let tempoRestante = 30;
let portaAtivaId = null;
let jogoRodando = false;
let loopJogo = null;
let loopCronometro = null;
let tempoSpawn = 1000; // Começa com 1 segundo

// Elementos do DOM recuperados
const elementoPontuacao = document.getElementById('pontuacao');
const elementoCronometro = document.getElementById('cronometro');
const elementoNomeExibido = document.getElementById('nome-exibido');
const gridTabuleiro = document.getElementById('grid-tabuleiro');
const telaInicial = document.getElementById('tela-inicial');
const telaFim = document.getElementById('tela-fim');

// ==========================================
// FUNÇÕES DE RESPONSABILIDADE ÚNICA
// ==========================================

// Função que cria o tabuleiro dinamicamente usando métodos do DOM
function gerarGrid() {
    gridTabuleiro.textContent = ''; // Limpa o grid de forma segura
    
    // Crio um grid 3x3 (9 portas/janelas)
    for (let i = 0; i < 9; i++) {
        const janela = document.createElement('div');
        janela.classList.add('janela-predio');
        
        // Uso o dataset para mapear o ID de cada janela sem poluir o HTML
        janela.dataset.id = i;
        
        // Ouvinte de clique para interceptar a ação do jogador
        janela.addEventListener('click', processarClique);
        
        gridTabuleiro.appendChild(janela);
    }
}

// Inicializa os estados e dispara os cronômetros
function iniciarJogo() {
    const nomeInput = document.getElementById('nome-jogador').value.trim();
    if (!nomeInput) {
        alert("Por favor, digite seu codinome de herói!");
        return;
    }

    // Configuração inicial do estado
    pontuacao = 0;
    tempoRestante = 30;
    tempoSpawn = 1000;
    jogoRodando = true;
    elementoNomeExibido.textContent = nomeInput;
    elementoPontuacao.textContent = pontuacao;
    elementoCronometro.textContent = tempoRestante;

    // Transição de telas alterando classes CSS
    telaInicial.classList.add('escondido');
    telaFim.classList.add('escondido');
    gridTabuleiro.classList.remove('escondido');

    gerarGrid();
    
    // Inicia os loops do jogo
    loopCronometro = setInterval(atualizarTempo, 1000);
    agendarProximoVilao();
}

// Controla o surgimento aleatório dos alvos
function spawnAlvo() {
    if (!jogoRodando) return;

    // Remove classes antigas de todas as janelas
    const janelas = document.querySelectorAll('.janela-predio');
    janelas.forEach(j => {
        j.classList.remove('vilao', 'refem');
    });

    // Escolhe uma janela aleatória
    const indiceAleatorio = Math.floor(Math.random() * janelas.length);
    const janelaSelecionada = janelas[indiceAleatorio];
    portaAtivaId = indiceAleatorio;

    // Decisão Hardcore: 25% de chance de gerar um refém (armadilha)
    const sorteioTipo = Math.random();
    if (sorteioTipo > 0.75) {
        janelaSelecionada.classList.add('refem');
        janelaSelecionada.dataset.tipo = 'refem';
    } else {
        janelaSelecionada.classList.add('vilao');
        janelaSelecionada.dataset.tipo = 'vilao';
    }

    // Curva de dificuldade: acelera o spawn ligeiramente a cada ciclo
    if (tempoSpawn > 400) {
        tempoSpawn -= 15; 
    }

    agendarProximoVilao();
}

// Agenda o próximo spawn usando timeouts dinâmicos para aplicar a curva de dificuldade
function agendarProximoVilao() {
    if (loopJogo) clearTimeout(loopJogo);
    loopJogo = setTimeout(spawnAlvo, tempoSpawn);
}

// Trata a pontuação e penalidades baseadas no clique do usuário
function processarClique(evento) {
    if (!jogoRodando) return;

    const janelaClicada = evento.currentTarget;
    const tipoAlvo = janelaClicada.dataset.tipo;

    // Verifica se a janela clicada continha algum elemento ativo
    if (janelaClicada.classList.contains('vilao')) {
        pontuacao += 10;
        janelaClicada.classList.remove('vilao');
        delete janelaClicada.dataset.tipo;
    } else if (janelaClicada.classList.contains('refem')) {
        // Penalidade Hardcore: Clicou no refém perde pontos e 3 segundos de tempo!
        pontuacao = Math.max(0, pontuacao - 15);
        tempoRestante = Math.max(0, tempoRestante - 3);
        elementoCronometro.textContent = tempoRestante;
        janelaClicada.classList.remove('refem');
        delete janelaClicada.dataset.tipo;
    } else {
        // Clicou na janela vazia (erro de mira)
        pontuacao = Math.max(0, pontuacao - 2);
    }

    elementoPontuacao.getElementById ? null : elementoPontuacao.textContent = pontuacao;
}

// Deduz o tempo e verifica a condição de término
function atualizarTempo() {
    tempoRestante--;
    elementoCronometro.textContent = tempoRestante;

    if (tempoRestante <= 0) {
        finalizarJogo();
    }
}

// Encerra a partida e exibe os resultados
function finalizarJogo() {
    jogoRodando = false;
    clearInterval(loopCronometro);
    clearTimeout(loopJogo);

    document.getElementById('pontuacao-final').textContent = pontuacao;
    gridTabuleiro.classList.add('escondido');
    telaFim.classList.remove('escondido');
}

// ==========================================
// EVENT LISTENERS DE INTERFACE
// ==========================================
document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJogo);

