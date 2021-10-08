// ********************************* DECLARAÇÃO DE VARIÁVEIS ****************************** //

const container__players = document.querySelector("#container__players")
const container__tableGame = document.querySelector("#container__tableGame")
const container__vitoria = document.querySelector("#container__vitoria")
const buttonStart = document.querySelector("#startButton")
const buttonJogarNovamente = document.querySelector(".jogarNovamente")
const buttonEscolherJogadores = document.querySelector(".escolherJogadores")
const buttonEscolherJogadoresVitoria = document.querySelector(".escolherJogadoresVitoria")
const buttonReset = document.querySelector(".tableGame__reset")
const tabuleiro = document.querySelector(".tableGame")
const nomeJogador = document.querySelector(".nomeJogador")
const vencedorText = document.querySelector(".vencedorText")
const times = document.querySelector("#times")
const jogadorDiv = document.querySelector("#jogadorDiv")
const vencedorDiv = document.querySelector(".vencendorDiv")
let containerTargets = document.querySelectorAll(".targetColuna")

let tableGameJogador = document.querySelector(".tableGame__jogador")

document.addEventListener("drag", function(event) {//ativando Drag

}, false);

let player = {
    nome: "",
    time: "",
    Numero: '1'
};

// ******************* PEGAR JOGADORES ********************//
let countClick = 0
let player1Id= ""
let player2Id= ""
let player1Nome= ""
let player2Nome= ""
let stylePlayer1Selecionado = ""
let stylePlayer2Selecionado = ""
times.addEventListener("click", function(e){
    if(e.target.id !== "times"){
        if (countClick === 0){
            stylePlayer1Selecionado = e.target
            stylePlayer1Selecionado.style.boxShadow = "0px 0px 10px 11px #FFFFFF";
            player.nome = e.target.textContent
            player1Nome = e.target.textContent
            player.time = e.target.id
            player1Id = e.target.id
            countClick++

            jogadorDiv.textContent = "Escolha a segunda seleção:"

        } else if (countClick === 1 && e.target.textContent  !== player.nome){
            stylePlayer2Selecionado = e.target
            stylePlayer2Selecionado.style.boxShadow = "0px 0px 10px 11px rgba(24,138,31,0.75)";
            player2Id = e.target.id
            player2Nome = e.target.textContent
            countClick++
            jogadorDiv.textContent = "Que comece a partida!"
        }
    }
})



// **************************** CRIAR TABLE **************************** //

let tableGame = [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
]

function criartableGame() {
    
  criarBolinhasCaixas()

    for(let i = 0; i < tableGame[0].length; i++){
        // let bolinhaAcima = document.createElement("div")
        let coluna = document.createElement("div")

        coluna.classList.add(`coluna${i}`)
        // bolinhaAcima.classList.add(`bolinha`)
        coluna.addEventListener("click", moverDiscos) // Ouvindo todas as colunas para o evento de mover disco

        for(let a = 0 ; a < tableGame.length ; a++){

            let bloco = document.createElement("div")
            bloco.classList.add("blocoFilho")
            bloco.id = `${a}0${i}`

            coluna.appendChild(bloco)
            
        }
        tabuleiro.appendChild(coluna)
        // coluna.prepend(bolinhaAcima)
    }
  
      tableGameJogador.textContent = `Posse de bola: ${player.nome}`

}

function criarBolinhasCaixas(){

    let caixaEsquerda = document.getElementById("cxLeft")
    let caixaDireita = document.getElementById("cxRight")
  
        for(let i = 0 ; i < 21 ; i++){
            let bolinhaVermelha = document.createElement("div")
            bolinhaVermelha.classList.add("movendo", "bolinha")
            bolinhaVermelha.setAttribute("id", `${player1Id}`)
            bolinhaVermelha.style.cursor = 'pointer'
            bolinhaVermelha.draggable = true
            caixaEsquerda.prepend(bolinhaVermelha)
     
            let bolinhaBlack = document.createElement("div")
            bolinhaBlack.classList.add("movendo", "bolinha")
            bolinhaBlack.setAttribute("id", `${player2Id}`)
            bolinhaBlack.cursor = 'pointer'
            bolinhaBlack.draggable = true
            caixaDireita.prepend(bolinhaBlack)

            // bolinhaVermelha.addEventListener("dragstart", dragStart)
            // bolinhaVermelha.addEventListener("dragstart", dragStart)
            // bolinhaBlack.addEventListener("dragend", dragEnd) 
            // bolinhaBlack.addEventListener("dragend", dragEnd) 
        }


}

// MOVIMENTO DAS criarBolinhasCaixas

containerTargets.forEach
    containerTargets.addEventListener("dragenter", dragenter);
    containerTargets.addEventListener("dragover", dragover);
    containerTargets.addEventListener("dragleave", dragleave);
    containerTargets.addEventListener("drop", drop);


  
  //=> dragStart(Iniciando o movimento do disco)
  function dragStart(e){
    e.target.classList.add('moving');
    e.cursor = 'pointer'
    // console.log(e.target)
    // console.log("PEGOU A BOLINHA!!!")
  }

  function dragEnd(e){
    // console.log(e.target)
  }

 // => dragenter(Quando ENTRAR na containerTargets)
function dragenter(e){
    // console.log(e.target)

    // console.log("ENTROU NA DIV targetColuna!!!")
  }
  
  //=> dragover(Quando ESTIVER dentro da divPega)
  function dragover(e){
      //ENQUANTO ESTIVER NA DIV CurrentTarget pinta de ROSA
      e.currentTarget.style.background = "pink";
    //   console.log(e.target)
    }
  
 // => dragleave(Quando SAIR da divPega)
  function dragleave(e){
      console.log("SAIR DA DIV targetColuna!!!")
      e.currentTarget.style.background = "none";
    //   console.log(e.target)
  }
  
  //=> drop(Quando SOLTA NA divPega)
  function drop(e){
    // e.preventDefault();
    if (e.target.className == "targetColuna1") {
    
    console.log("dropou")
    }
  }




// **************************** VERIFICAR VITÓRIA ***************************//


let jogadas = 0
let maximoJogadas = (tableGame.length * tableGame[0].length)

const verificaVitoria = (player) =>{

    jogadas++
    let condicao = "" //codiçao e o codigo necessario para validar a vitoria
    let palavraCruzada = "" //verificaçao na diagonal esquerda
    let palavraCruzadaD = ""//verificaçao na diagonal direita
    let palavraVertical = ""//verificar vertical
    let horizontal = ""//verifica horizontal
    
        if (player.Numero === '1') {
            condicao = "1111"
        } else {
            condicao = "2222"
        }
    
    if(jogadas < maximoJogadas){
        /*Verifica Horizontais e diagonais*/
        for(let i = 0 ; i < tableGame.length; i++){
            for(let a = 0 ; a < tableGame[0].length ; a++){
                
                if(a <= 3){
                    horizontal = tableGame[i][a] + tableGame[i][a+1] + tableGame[i][a+2] + tableGame[i][a+3]
                    if(i <= 2){
                        palavraCruzada = tableGame[i][a] + tableGame[i+1][a+1] + tableGame[i+2][a+2] + tableGame[i+3][a+3] 
                        palavraCruzadaD = tableGame[i][a+3] + tableGame[i+1][a+2] + tableGame[i+2][a+1] + tableGame[i+3][a]
                    }
                    if(horizontal === condicao || palavraCruzada === condicao || palavraCruzadaD === condicao){
                        mostrarVitoria()
                        nomeJogador.textContent = player.time
                    }       
                }

               
            }
        }
        //Verificaçao Vertical
        for(let i = 0 ; i < 3 ; i++){
            for(let a = 0 ; a < tableGame[0].length ; a++){
                palavraVertical = tableGame[i][a] + tableGame[i+1][a] + tableGame[i+2][a] + tableGame[i+3][a]
                if(palavraVertical === condicao){
                    mostrarVitoria()
                    nomeJogador.textContent = player.time
                } 
            }
        }
    }
 else {
    
    mostrarVitoria()
    nomeJogador.textContent = "O jogo terminou empatado!"
    vencedorDiv.style.visibility = "hidden"

}
}


function mostrarVitoria(){
    container__tableGame.style.display = "none"
    container__vitoria.style.display = "flex"
}




// *************************** MOVER DISCOS **********************************//

let arrJogadas = []

function moverDiscos(event){

    disableClick()

    const cxLeft = document.querySelector("#cxLeft")
    const leftBall = cxLeft.querySelectorAll(".movendo")
    const cxRight = document.querySelector("#cxRight")
    const rightBall = cxRight.querySelectorAll(".movendo")


    
    let disco = document.createElement("div")
    disco.setAttribute("id", `${player.time}`)
   
    let colunaClicada = event.currentTarget
    let classeColunaClicada = colunaClicada.className
    let tamanhoColunaClicada = colunaClicada.querySelectorAll("div")

    console.log(tamanhoColunaClicada.length)

    if (tamanhoColunaClicada.length < 12 ){
        if (player.Numero === "1") {
            cxLeft.removeChild(leftBall[0])
        } else {
            cxRight.removeChild(rightBall[0])
        } 
}

    arrJogadas.push(classeColunaClicada)

    let posicaoArr = Number(classeColunaClicada[classeColunaClicada.length-1])

    String.prototype.replaceAt=function(index, replacement) {

        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);

    }

    //VARIAVEL PARA ANIMAÇÃO
        let valAnimate = 240;
        for(let i = tableGame.length-1 ; i >= 0 ;i--){
            let blocoPai = document.getElementById(`${i}0${posicaoArr}`)
            if(tableGame[i][posicaoArr] === "0"){
                tableGame[i] = tableGame[i].replaceAt(posicaoArr, player.Numero) // ficar alternando timees
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
                // verificaVitoria(player)
                TrocarPlayer()
                i=0
            }
            //VARIAVEL PARA ANIMAÇÃO
            valAnimate -= 40
        }
}

// ****************************** DESABILITAR CLICK ***********************************//
function disableClick(){

    let coluna = document.querySelector(".coluna0")
    
    for(let a = 0 ; a <= tableGame.length ; a++){
        coluna = document.querySelector(`.coluna${a}`)
        coluna.removeEventListener("click", moverDiscos)
    }

    setTimeout(() => {
        for(let a = 0 ; a <= tableGame.length ; a++){
            coluna = document.querySelector(`.coluna${a}`)
            coluna.addEventListener("click", moverDiscos)
        }
        verificaVitoria(player)
    }, 1000);


}

// ***************************** ALTERNANDO O PLAYER **************************** //

function TrocarPlayer() {

    setTimeout(function(){

    if (player.Numero === '1') {      

        player.nome = player2Nome;
        player.time = player2Id;
        player.Numero = '2';
        tableGameJogador.textContent = `Posse de bola: ${player.nome}`

    } else {

        player.nome = player1Nome;
        player.time = player1Id;
        player.Numero = '1';
        tableGameJogador.textContent = `Posse de bola: ${player.nome}`
        
    }

}, 1000)

}



// ***************************** LISTENER: BOTÃO RESET **************************** //


function reset(){
    
    jogadorDiv.textContent = "O primeiro jogador escolhe:"
    tableGameJogador.textContent = `Posse de bola do jogador ${player.nome}`
    player.time = player1Id;
    player.Numero = '1';
    player.nome = player1Nome
    countClick = 0

    cxLeft.innerHTML= ""
    cxRight.innerHTML= ""

    tabuleiro.innerHTML = ""

    stylePlayer1Selecionado.style.boxShadow = "none"
    stylePlayer2Selecionado.style.boxShadow = "none"

    jogadas = 0

    tableGame = [
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0000000"
    ]
   
}

buttonReset.addEventListener("click", function(){
    reset()
    criartableGame()
})


// ***************************** LISTENER: BOTÃO START **************************** //


buttonStart.addEventListener("click", function(e){

    if (countClick === 2) {
    container__players.style.display = "none"
    container__tableGame.style.display = "flex"
    
    criartableGame()
    
    } else {
        jogadorDiv.textContent = "Por favor! Escolha um seleção:"
    }
})
// ***************************** LISTENER: BOTÃO JOGAR DE NOVO **************************** //


buttonJogarNovamente.addEventListener("click", function(e){
    // stylePlayer1Selecionado.style.border = "none"
    // stylePlayer2Selecionado.style.border = "none"
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "flex"

    reset()
    criartableGame()
})

// ***************************** LISTENER: ESCOLHER NOVOS JOGADORES **************************** //



buttonEscolherJogadores.addEventListener("click", function(){
    stylePlayer1Selecionado.style.border = "none"//resetar estilo
    stylePlayer2Selecionado.style.border = "none"
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__players.style.display = "flex"
    
    reset()
})

buttonEscolherJogadoresVitoria.addEventListener("click", function(){
    stylePlayer1Selecionado.style.border = "none"//resetar estilo
    stylePlayer2Selecionado.style.border = "none"
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__players.style.display = "flex"
    
    reset()
})




