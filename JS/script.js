// ********************************* DECLARAÇÃO DE VARIÁVEIS DO DOM ****************************** //

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

let limiteEmpate = 0

let jogador = {
    nome: "",
    numero: '1'
};

// ******************* ESCOLHER JOGADORES ********************//
let countClick = 0
let jogador1Id= ""
let jogador2Id= ""
let stylejogador1Selecionado = ""
let stylejogador2Selecionado = ""

times.addEventListener("click", function(e){

    let containerTimes = [...times.childNodes]


    if (countClick === 0 && containerTimes.includes(e.target)){

        stylejogador1Selecionado = e.target
        
        jogador.nome = e.target.textContent
        jogador1Id = e.target.classList[0]
        countClick++   
        
        let jogadorEscolhido1 = e.target.cloneNode(true)
        jogadorEscolhido1.classList.add("jogadorEscolhido1")
        jogadorEscolhido1.classList.add("pulse")

        let jogadorEscolhido1Container = document.createElement("div")
        jogadorEscolhido1Container.classList.add("jogadorEscolhido1Container")
        jogadorEscolhido1Container.classList.add("fadeIn")

        let jogadorEscolhido1Text = document.createElement("span")
        jogadorEscolhido1Text.innerText = "Jogador 1"

        let jogadorEscolhido1Time = document.createElement("span")
        jogadorEscolhido1Time.innerText = `${jogador1Id}`

        jogadorEscolhido1Container.appendChild(jogadorEscolhido1Text)
        jogadorEscolhido1Container.appendChild(jogadorEscolhido1)
        jogadorEscolhido1Container.appendChild(jogadorEscolhido1Time)

        document.body.appendChild(jogadorEscolhido1Container)
        
        jogadorDiv.textContent = "Escolha a segunda seleção:"

    } else if (countClick === 1 && e.target.textContent !== jogador.nome && containerTimes.includes(e.target)){

        stylejogador2Selecionado = e.target
  
        jogador2Id = e.target.classList[0]

        countClick++


        let jogadorEscolhido2 = e.target.cloneNode(true)
        jogadorEscolhido2.classList.add("jogadorEscolhido2")
        jogadorEscolhido2.classList.add("pulse")

        let jogadorEscolhido2Container = document.createElement("div")
        jogadorEscolhido2Container.classList.add("jogadorEscolhido2Container")
        jogadorEscolhido2Container.classList.add("fadeIn")

        let jogadorEscolhido2Text = document.createElement("span")
        jogadorEscolhido2Text.innerText = "Jogador 2"

        let jogadorEscolhido2Time = document.createElement("span")
        jogadorEscolhido2Time.innerText = `${jogador2Id}`

        jogadorEscolhido2Container.appendChild(jogadorEscolhido2Text)
        jogadorEscolhido2Container.appendChild(jogadorEscolhido2)
        jogadorEscolhido2Container.appendChild(jogadorEscolhido2Time)

        document.body.appendChild(jogadorEscolhido2Container)
        
        jogadorDiv.textContent = "Escolha a segunda seleção:"

        jogadorDiv.textContent = "Aperte start para começar!"
    }
})




// **************************** CRIAR TABLE **************************** //

function criarTabuleiro() {
    
    for(let i = 1; i <= 7; i++){

        let coluna = document.createElement("div")
        coluna.classList.add(`coluna${i}`)      
        tabuleiro.appendChild(coluna)

    }
  
    tableGameJogador.textContent = `Posse de bola: ${jogador.nome}`
    
    caixasLaterais()
    arrastar()

}

function caixasLaterais(){

    let caixaEsquerda = document.getElementById("cxLeft")
    let caixaDireita = document.getElementById("cxRight")
  
        for(let i = 0 ; i < 21 ; i++){

            let jogador1 = document.createElement("div")
           
                jogador1.classList.add(`${jogador1Id}`)
                jogador1.style.cursor = 'pointer'
                jogador1.draggable = true
                
                let jogador2 = document.createElement("div")
                
                jogador2.classList.add(`${jogador2Id}`)
                jogador2.cursor = 'pointer'

            
            caixaEsquerda.appendChild(jogador1)
            caixaDireita.appendChild(jogador2)

        }

}


// ********************************* DND *********************************** //

function arrastar() {
    
    let jogadorAtual

    document.addEventListener("drag", function(event) {
    }, false);

    document.addEventListener("dragstart", function(event) {
       
        jogadorAtual = event.target.className
        event.target.style.opacity = .5;
        
    }, false);

    document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "";    
        event.target.style.boxShadow = "";
    }, false);

    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function(event) {

        if (event.target.className == "targetColuna") {
            event.target.style.background = "white";
        }

    }, false);

    document.addEventListener("dragleave", function(event) {

        if (event.target.className == "targetColuna") {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("drop", function(event) {

        event.preventDefault();

        if (event.target.className == "targetColuna" && jogadorAtual === jogador.nome) {
            event.target.style.background = "";
            let colunaAlvo = document.querySelector(`.coluna${event.target.id}`)
            jogada(colunaAlvo)
        }

    }, false);
}

function arrastavel() {

    if(jogador.nome === jogador1Id) {

        cxLeft.childNodes.forEach(function(e) {
        e.draggable = true
        e.style.cursor = 'pointer'
        })

        cxRight.childNodes.forEach(function(e) {
        e.draggable = false
        e.style.cursor = ""
        })
            

    } else {

        cxLeft.childNodes.forEach(function(e) {
        e.draggable = false
        e.style.cursor = ""
        })

        cxRight.childNodes.forEach(function(e) {
        e.draggable = true
        e.style.cursor = 'pointer'
        })

    }


}


// **************************** VERIFICAR VITÓRIA ***************************//

let board = [[], [] ,[], [], [], [], []]
const imprimeTabuleiro = () => {

    tabuleiro.childNodes.forEach(function(e, i){

        let filhos = e.childNodes
        
        filhos.forEach(function(e,j){
            
            if (filhos[j] !== undefined){

            board[i].push(filhos[j].className)
            }

        })
                
    })

}

const verificaVitoriaVertical = () =>{

    board.forEach(function(e,i) { // passa nas colunas
         
        e.forEach(function(e,j) { // passa nos filhos
        
            if(board[i] !== [] && j < 4){ 
            
            if(board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]){ 
                nomeJogador.textContent = board[i][j]
                mostrarVitoria()
            }
           }   
        })     
    })
}

const verificarVitoriaHorizontal = () => {
         
    board.forEach(function(e,i) {
               
        if(board[i] !== [] && i < 4){

        e.forEach(function(e,j) {

                if (board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j]){
                    nomeJogador.textContent = board[i][j]
                    mostrarVitoria()
                }   
                
            })        
        }
            
    })

}

const verificaVitoriaDiagonal = () =>{ 
    
    board.forEach(function(e,i) {
        
        e.forEach(function(e,j) {
            
            // diagonal para a direita 

            if(board[i] !== [] && i < 5 && j < 4){ 

            if(board[i][j] === board[i+1][j + 1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3]){ 

                nomeJogador.textContent = board[i][j]
                mostrarVitoria()
                
            }
           }   

        // diagonal para para esquerda

            if(i < 4 && j > 2){ 
            
            if(board[i][j] === board[i+1][j-1] && board[i][j] === board[i+2][j-2] && board[i][j] === board[i+3][j-3]){ 

                nomeJogador.textContent = board[i][j]
                mostrarVitoria()

            }
            }
           
        })
            
    })


}

function mostrarVitoria(){
    container__tableGame.style.display = "none"
    container__vitoria.style.display = "flex"
}

function verificaEmpate() {

    limiteEmpate++

    if (limiteEmpate === 42){ 
        nomeJogador.textContent = "O jogo terminou empatado!"
        vencedorDiv.style.visibility = "hidden"
        mostrarVitoria()
    }
    
}



// ******************************* JOGADA **********************************//

function jogada(colunaAlvo){ 

    if (window.matchMedia("(max-width: 769px)").matches) {
        disableClick()
    }
 
    const cxLeft = document.querySelector("#cxLeft")
    const leftBall = cxLeft.querySelectorAll(`.${jogador.nome}`)

    const cxRight = document.querySelector("#cxRight")
    const rightBall = cxRight.querySelectorAll(`.${jogador.nome}`)

    if (colunaAlvo.childNodes.length < 12 ){

        if (jogador.numero === "1") {

            cxLeft.removeChild(leftBall[0])

        } else {

            cxRight.removeChild(rightBall[0])

        } 
    }
 
    let disco = document.createElement("div")
    disco.classList.add(jogador.nome)
    
  
    //ANIMAÇÃO NO DISCO =========

    let valAnimate = 240
    let tempoAnimacao = 1200

    valAnimate = (valAnimate - ([...colunaAlvo.childNodes].length * 40))
    tempoAnimacao = tempoAnimacao -([...colunaAlvo.childNodes].length * 200)
    
    disco.animate([
        { transform: 'translateY(-'+valAnimate+'px)' },
        { transform: 'translateY(0px)' }
    ], {duration: tempoAnimacao});
    
    

    colunaAlvo.appendChild(disco)

    
    trocarJogador()    
    arrastavel()

    setTimeout(() => {

        imprimeTabuleiro()
        verificaVitoriaVertical()
        verificarVitoriaHorizontal()
        verificaVitoriaDiagonal()
        verificaEmpate()
        
        board = [[], [] ,[], [], [], [], []]
        
    }, 1000);

}

// ***************************** LISTENER: JOGADA MOBILE **************************** //

let listerner = function(e) {  
        
    let colunaAlvo = document.querySelector(`.${e.target.className}`)
    
    jogada(colunaAlvo)  
        
}

tabuleiro.addEventListener("click", listerner)


// ***************************** LISTENER: MUDANÇA DE TELA **************************** //

window.onresize = function() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 769) {
        tabuleiro.addEventListener("click", listerner)
    } else {
        tabuleiro.removeEventListener("click", listerner)
    }
}



// ****************************** DESABILITAR CLICK ***********************************//

function disableClick(){
    
    tabuleiro.removeEventListener("click", listerner)
    
    setTimeout(() => {

    tabuleiro.addEventListener("click", listerner)
    }, 1000);

}

// ***************************** ALTERNANDO O jogador **************************** //

function trocarJogador() {

    if (jogador.numero === '1') {      

        jogador.nome = jogador2Id;
        jogador.numero = '2';
        tableGameJogador.textContent = `Posse de bola: ${jogador.nome}`

    } else {

        jogador.nome = jogador1Id;
        jogador.numero = '1';
        tableGameJogador.textContent = `Posse de bola: ${jogador.nome}`
        
    }

}


// ***************************** LISTENER: BOTÃO RESET **************************** //

function reset(){
    
    jogadorDiv.textContent = "O primeiro jogador escolhe:"
    tableGameJogador.textContent = `Posse de bola do jogador ${jogador.nome}`
    jogador.nome = jogador1Id;
    jogador.numero = '1';
    countClick = 0

    cxLeft.innerHTML= ""
    cxRight.innerHTML= ""

    tabuleiro.innerHTML = ""

    stylejogador1Selecionado.style.boxShadow = "none"
    stylejogador2Selecionado.style.boxShadow = "none"

    vencedorDiv.style.visibility = "visible"

    jogadas = 0
   
}

buttonReset.addEventListener("click", function(){
    reset()
    criarTabuleiro()
})


// ***************************** LISTENER: BOTÃO START **************************** //


buttonStart.addEventListener("click", function(e){

    if (countClick === 2) {

    container__players.style.display = "none"
    container__tableGame.style.display = "flex"

    let jogador1 = document.querySelector(".jogadorEscolhido1Container")
    let jogador2 = document.querySelector(".jogadorEscolhido2Container")

    document.body.removeChild(jogador1)
    document.body.removeChild(jogador2)
    
    criarTabuleiro()
    
    } else {
        jogadorDiv.textContent = "Por favor! Escolha uma seleção:"
    }
})
// ***************************** LISTENER: BOTÃO JOGAR DE NOVO **************************** //


buttonJogarNovamente.addEventListener("click", function(e){

    container__vitoria.style.display = "none"
    container__tableGame.style.display = "flex"

    reset()
    criarTabuleiro()
})

// ***************************** LISTENER: ESCOLHER NOVOS JOGADORES **************************** //

buttonEscolherJogadores.addEventListener("click", function(){
    stylejogador1Selecionado.style.border = "none"//resetar estilo
    stylejogador2Selecionado.style.border = "none"
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__jogadors.style.display = "flex"
    
    reset()
})

buttonEscolherJogadoresVitoria.addEventListener("click", function(){
    stylejogador1Selecionado.style.border = "none"//resetar estilo
    stylejogador2Selecionado.style.border = "none"
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__jogadors.style.display = "flex"
    
    reset()
})