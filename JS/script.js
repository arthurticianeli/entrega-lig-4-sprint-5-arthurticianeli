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
const audioJogo = document.querySelector(".audioJogo")
const audioJogada = document.querySelector(".audioJogada")
const apito = document.querySelector(".apito")
let limiteEmpate = 0

let jogador = {
    nome: "",
};


// ******************* ESCOLHER JOGADORES ********************//
let countClick = 0
let jogador1Class = ""
let jogador2Class = ""
let nomeExibir = ""

function trocarExibir(jogadorNome) {

    nomeExibir = jogadorNome.replace("_", " ")
    
}

times.addEventListener("click", function(e){

    
    let containerTimes = [...times.childNodes]
    
    if (countClick === 0 && containerTimes.includes(e.target)){
        
        jogador.nome = e.target.className
        jogador1Class = e.target.className
        trocarExibir(e.target.className)

        tableGameJogador.innerText = `Posse de bola: ${nomeExibir}`
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
        jogadorEscolhido1Time.innerText = `${nomeExibir}`

        jogadorEscolhido1Container.appendChild(jogadorEscolhido1Text)
        jogadorEscolhido1Container.appendChild(jogadorEscolhido1)
        jogadorEscolhido1Container.appendChild(jogadorEscolhido1Time)

        document.body.appendChild(jogadorEscolhido1Container)
        
        jogadorDiv.className = "Escolha a segunda seleção:"

    } else if (countClick === 1 && e.target.className !== jogador.nome && containerTimes.includes(e.target)){

        jogador2Class = e.target.className
        trocarExibir(e.target.className)

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
        jogadorEscolhido2Time.innerText = `${nomeExibir}`

        jogadorEscolhido2Container.appendChild(jogadorEscolhido2Text)
        jogadorEscolhido2Container.appendChild(jogadorEscolhido2)
        jogadorEscolhido2Container.appendChild(jogadorEscolhido2Time)

        document.body.appendChild(jogadorEscolhido2Container)
        
        jogadorDiv.className = "Escolha a segunda seleção:"

        jogadorDiv.className = "Aperte start para começar!"
    }
})



// **************************** CRIAR TABLE **************************** //



function criarTabuleiro() {
    
    for(let i = 1; i <= 7; i++){

        let coluna = document.createElement("div")
        coluna.classList.add(`coluna${i}`)      
        tabuleiro.appendChild(coluna)

    }
    
    caixasLaterais()
}

function caixasLaterais(){

    let caixaEsquerda = document.getElementById("cxLeft")
    let caixaDireita = document.getElementById("cxRight")
  
        for(let i = 0 ; i < 21 ; i++){

            let jogador1 = document.createElement("div")
           
                jogador1.classList.add(`${jogador1Class}`)
                jogador1.style.cursor = 'pointer'
                jogador1.draggable = true
                
                let jogador2 = document.createElement("div")
                
                jogador2.classList.add(`${jogador2Class}`)
                jogador2.cursor = 'pointer'

            
            caixaEsquerda.appendChild(jogador1)
            caixaDireita.appendChild(jogador2)

        }

}

/******************************* INSTRUÇÃO JOGADA ********************/


function msgDesktop(){

    let tabuleiros = document.querySelector("#tabuleiros")
    let msg = document.createElement("span")
    msg.textContent = "Arraste a bola da sua seleção para um dos alvos acima!"
    msg.classList.add("msg")

    tabuleiros.appendChild(msg)

    // setTimeout(function() {
    //     tabuleiros.removeChild(msg)
    // },5000)
   

}

function msgMobile(){
    
    let msg = document.createElement("span")
    msg.textContent = "Toque abaixo dos alvos para jogar!"
    msg.classList.add("msg")

    tabuleiros.appendChild(msg)

    // setTimeout(function() {
    //     tabuleiros.removeChild(msg)
    // },5000)

}

// ********************************* DND *********************************** //

function arrastar() {
    
    let jogadorAtual

    document.addEventListener("drag", function(event) {
    }, false);

    document.addEventListener("dragstart", function(event) {
       
        jogadorAtual = event.target.className
        
    }, false);

    document.addEventListener("dragend", function(event) {
   
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

            console.log(colunaAlvo)

            jogada(colunaAlvo)
        }

    }, false);
}


function arrastavel() {

    if(jogador.nome === jogador1Class) {

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
                
                trocarExibir(board[i][j])
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
                    trocarExibir(board[i][j])
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

                trocarExibir(board[i][j])
                mostrarVitoria()
                
            }
           }   

        // diagonal para para esquerda

            if(i < 4 && j > 2){ 
            
            if(board[i][j] === board[i+1][j-1] && board[i][j] === board[i+2][j-2] && board[i][j] === board[i+3][j-3]){ 

                trocarExibir(board[i][j])
                mostrarVitoria()

            }
            }
           
        })
            
    })

}

function mostrarVitoria(){

    nomeJogador.textContent = nomeExibir

    container__tableGame.style.display = "none"
    container__vitoria.style.display = "flex"

    audioJogo.setAttribute("src",`./assets/music/musicPaises/${nomeExibir}.mp3`)

}

function verificaEmpate() {

    limiteEmpate++

    if (limiteEmpate === 42){ 
        nomeJogador.className = "O jogo terminou empatado!"
        vencedorDiv.style.visibility = "hidden"
        audioJogo.setAttribute("src","./assets/music/empate.mp3")
        mostrarVitoria()
    }
    
}



// ******************************* JOGADA **********************************//

function jogada(colunaAlvo){ 

    audioJogada.play()
    if (window.matchMedia("(max-width: 769px)").matches) {
        disableClick()
    }
 
    const cxLeft = document.querySelector("#cxLeft")
    const leftBall = cxLeft.querySelectorAll(`.${jogador1Class}`)

    const cxRight = document.querySelector("#cxRight")
    const rightBall = cxRight.querySelectorAll(`.${jogador2Class}`)
    
    if (colunaAlvo.childNodes.length < 12 ){

        if (jogador.nome === jogador1Class) {

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

    valAnimate = valAnimate - ([...colunaAlvo.childNodes].length * 40)
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

let listerner = function(event) {  
   
     if (event.target.tagName == "DIV") {

        jogada(event.target)
    }
}

let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
if (w < 769) {
    tabuleiro.addEventListener("click", listerner)
}

// ***************************** LISTENER: MUDANÇA DE TELA **************************** //

window.onresize = function() {
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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
    }, 1200);

}

// ***************************** TROCA O JOGADOR **************************** //

function trocarJogador() {


    if (jogador.nome === jogador1Class) {      

        jogador.nome = jogador2Class;
        trocarExibir(jogador.nome)
        tableGameJogador.innerText = `Posse de bola: ${nomeExibir}`

    } else {

        jogador.nome = jogador1Class;
        trocarExibir(jogador.nome)
        tableGameJogador.innerText = `Posse de bola: ${nomeExibir}`
        
    }

}


// ***************************** LISTENER: BOTÃO RESET **************************** //

function reset(){
    
    jogadorDiv.innerText = "O primeiro jogador escolhe:"
    trocarExibir(jogador1Class)
    tableGameJogador.innerText = `Posse de bola: ${nomeExibir}`
    countClick = 0

    cxLeft.innerHTML= ""
    cxRight.innerHTML= ""

    tabuleiro.innerHTML = ""

    vencedorDiv.style.visibility = "visible"

    jogadas = 0
    audioJogo.setAttribute("src","./assets/music/musicaFundo.mp3")

}

buttonReset.addEventListener("click", function(){
    reset()
    criarTabuleiro()
})


// ***************************** LISTENER: BOTÃO START **************************** //


buttonStart.addEventListener("click", function(e){

    if (w < 769) {

        msgMobile()

    } else {
        
        msgDesktop()

    }
    

    if (countClick === 2) {
        audioJogo.play()
        audioJogo.volume = 0.2
        apito.play()

    container__players.style.display = "none"
    container__tableGame.style.display = "flex"

    let jogador1 = document.querySelector(".jogadorEscolhido1Container")
    let jogador2 = document.querySelector(".jogadorEscolhido2Container")

    document.body.removeChild(jogador1)
    document.body.removeChild(jogador2)
    
    criarTabuleiro()
    arrastar()
    
    } else {
        jogadorDiv.className = "Por favor! Escolha uma seleção:"
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
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__players.style.display = "flex"
    
    reset()
})

buttonEscolherJogadoresVitoria.addEventListener("click", function(){
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "none"
    container__players.style.display = "flex"
    
    reset()
})


