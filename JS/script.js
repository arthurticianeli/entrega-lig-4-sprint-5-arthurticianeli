// ********************************* DECLARAÇÃO DE VARIÁVEIS ****************************** //

const container__players = document.querySelector(".container__players")
const container__tableGame = document.querySelector(".container__tableGame")
const container__vitoria = document.querySelector(".container__vitoria")
const buttonStart = document.querySelector(".startButton")
const buttonJogarNovamente = document.querySelector(".jogarNovamente")
const buttonEscolherJogadores = document.querySelector(".escolherJogadores")
const buttonReset = document.querySelector(".tableGame__reset")
const tabuleiro = document.querySelector(".tableGame")
let jogadorRed = document.querySelector(".jogadorRed").value
let jogadorBlack = document.querySelector(".jogadorBlack").value
let tableGameJogador = document.querySelector(".tableGame__jogador")


let player = {
    nome: "red",
    Cor : 'red',
    Numero : '1'
};


let tableGame = [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
]


// **************************** CRIAR TABLE **************************** //

function criartableGame() {
    for(let i = 0 ; i < tableGame[0].length; i++){

        let coluna = document.createElement("div")

        coluna.classList.add(`coluna${i}`)

        coluna.addEventListener("click", moverDiscos) // Ouvindo todas as colunas para o evento de mover disco

        for(let a = 0 ; a < tableGame.length ; a++){

            let bloco = document.createElement("div")
            if(tableGame[a][i] === "0"){
                bloco.classList.add("blocoFilho")
            }else if(tableGame[a][i] === "1"){
                bloco.classList.add("red")
            }else if(tableGame[a][i] === "2"){
                bloco.classList.add("black")
            }
            bloco.id = `${a}0${i}`
            coluna.appendChild(bloco)
            
        }
        tabuleiro.appendChild(coluna)
    }
    verificarNomes()
    tableGameJogador.textContent = `Turno do jogador ${jogadorRed}`
    criarBolinhasCaixas ()
}
function criarBolinhasCaixas (){
    let caixas = document.querySelectorAll(".cxDiscos")
    let caixaEsquerda = document.querySelector(".cxLeft")
    // caixaEsquerda.style.dragGable = true
    let caixaDireita = document.querySelector(".cxRigth")
    caixaEsquerda.id = "left"
    caixas.forEach(function a(e){
        if(e.id === "left"){
            for(let i = 0 ; i < 21 ; i++){
                let bolinhaVermelha = document.createElement("div")
                bolinhaVermelha.classList.add("red")
                bolinhaVermelha.style.draggable = true
                caixaEsquerda.prepend(bolinhaVermelha)
            }
        }else{
            for(let i = 0 ; i < 21 ; i++){
                let bolinhaBlack = document.createElement("div")
                bolinhaBlack.classList.add("black")
                bolinhaBlack.style.draggable = true
                caixaDireita.prepend(bolinhaBlack)
            }
        }
    })
}




// **************************** VERIFICAR VITÓRIA ***************************//


let jogadas = 0
let maximoJogadas = (tableGame.length * tableGame[0].length)

const verificaVitoria = (player) =>{
    jogadas++
    let condicao = ""
    if(player.Numero === '1'){
        condicao = "1111"
    }else{
        condicao = "2222"
    }
    let palavraCruzada = ""
    let palavraCruzadaD = ""
    let palavraVertical = ""
    if(jogadas < maximoJogadas){
        for(let i = 0 ; i < tableGame.length; i++){
            for(let a = 0 ; a < tableGame[i].length ; a++){
                if(i <= 2){
                    palavraVertical = tableGame[i][a] + tableGame[i+1][a] + tableGame[i+2][a] + tableGame[i+3][a]
                }
                if(a <= 3){
                    if(i <= 2){
                        palavraCruzada = tableGame[i][a] + tableGame[i+1][a+1] + tableGame[i+2][a+2] + tableGame[i+3][a+3] 
                        palavraCruzadaD = tableGame[i][a+3] + tableGame[i+1][a+2] + tableGame[i+2][a+1] + tableGame[i+3][a]
                    }
                    if(tableGame[i].substr(a, a+4) === condicao || palavraCruzada === condicao || palavraCruzadaD === condicao){
                        return console.log(`${player.nome} Ganhou`)
                    }
                }
                if(palavraVertical === condicao){
                    return console.log(`${player.nome} Ganhou`)
                }

            }
        }
    }else{
        console.log("empatou!")
    }

}



// *************************** MOVER DISCOS **********************************//

let arrJogadas = []

function moverDiscos(event){

    let disco = document.createElement("div")
    disco.classList.add(player.Cor);

    let colunaClicada = event.currentTarget
    let classeColunaClicada = colunaClicada.className

    arrJogadas.push(classeColunaClicada)

    let posicaoArr = Number(classeColunaClicada[classeColunaClicada.length-1])

    String.prototype.replaceAt=function(index, replacement) {

        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);

    }

        //VARIAVEL PARA ANIMAÇÃO
        let valAnimate = 260;
        for(let i = tableGame.length-1 ; i >= 0 ;i--){
            let blocoPai = document.getElementById(`${i}0${posicaoArr}`)
            if(tableGame[i][posicaoArr] === "0"){
                tableGame[i] = tableGame[i].replaceAt(posicaoArr, player.Numero) // ficar alternando cores
                //ANIMAÇÃO NO DISCO =========
                disco.animate([
                    // movimento
                    { transform: 'translateY(-'+valAnimate+'px)' },
                    { transform: 'translateY(0px)' }
                ], {
                    // tempo
                    duration: 1000,
                });
                // ==========================

                blocoPai.appendChild(disco)
                verificaVitoria(player)
                TrocarPlayer();
                i=0
            }
            //VARIAVEL PARA ANIMAÇÃO
            valAnimate -= 40
        }

}


// ***************************** ALTERNANDO AS CORES DO PLAYER **************************** //

function TrocarPlayer() {
    if (player.Numero === '1') {
        tableGameJogador.textContent = `Turno do jogador ${jogadorBlack}`
        player.nome = jogadorBlack
        player.Cor = 'black';
        player.Numero = '2';
        tableGameJogador.style.background = "var(--black)"
    } else {

        tableGameJogador.textContent = `Turno do jogador ${jogadorRed}`
        player.nome = jogadorRed
        player.Cor = 'red';
        player.Numero = '1';
        tableGameJogador.style.background = "var(--red)"
        
    }
}


// ***************************** VERIFICA O CAMPO COM OS NOMES **************************** //

function verificarNomes(){

    if (jogadorBlack === "") {
        jogadorBlack = "Preto"
    }
    if (jogadorRed === "") {
        jogadorRed = "Vermelho"
    } 
}




// ***************************** LISTENER: BOTÃO RESET **************************** //


function reset(){
    
    player.Numero = '1'
    player.Cor = 'red'
    tableGameJogador.style.background = "var(--red)"
    tabuleiro.innerHTML = ""
    jogadas = 0
    tableGame = [
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0000000"
    ]
    criartableGame()
    
}

buttonReset.addEventListener("click", reset)


// ***************************** LISTENER: BOTÃO START **************************** //


buttonStart.addEventListener("click", function(e){

    jogadorRed = document.querySelector(".jogadorRed").value
    jogadorBlack = document.querySelector(".jogadorBlack").value

    container__players.style.display = "none"
    container__tableGame.style.display = "flex"

    e.preventDefault()

    player.Numero = '1'
    player.Cor = 'red'
    tabuleiro.innerHTML = ""
    
    criartableGame()
    
})
// ***************************** LISTENER: BOTÃO JOGAR DE NOVO **************************** //


buttonJogarNovamente.addEventListener("click", function(e){
    
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "flex"

    reset()

})

// ***************************** LISTENER: ESCOLHER NOVOS JOGADORES **************************** //


buttonEscolherJogadores.addEventListener("click", function(e){
    
    // RESETAR O NOME DOS JOGADORES

    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__players.style.display = "flex"
    

    reset()

})
