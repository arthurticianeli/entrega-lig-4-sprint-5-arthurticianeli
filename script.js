// ********************************* DECLARAÇÃO DE VARIÁVEIS ****************************** //

let container__players = document.querySelector(".container__players")
let container__tableGame = document.querySelector(".container__tableGame")
let container__vitoria = document.querySelector(".container__vitoria")
let buttonJogarNovamente = document.querySelector(".jogarNovamente")
let buttonEscolherJogadores = document.querySelector(".escolherJogadores")
let buttonReset = document.querySelector(".tableGame__reset")



// ***************************** LISTENER: BOTÃO RESET **************************** //


buttonReset.addEventListener("click", function(e){

        // CARREGAR O TABULEIRO DO ZERO

})


// ***************************** LISTENER: BOTÃO JOGAR DE NOVO **************************** //


buttonJogarNovamente.addEventListener("click", function(e){
    
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "flex"

    // CARREGAR O TABULEIRO DO ZERO

})

// ***************************** LISTENER: ESCOLHER NOVOS JOGADORES **************************** //


buttonEscolherJogadores.addEventListener("click", function(e){
    
    document.location.reload(true)

})