let player = {
    Cor : 'red',
    Numero : '1'
};

const divPai = document.querySelector(".tableGame")
let tabuleiro = [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
]

const criarTabuleiro = () =>{
    for(let i = 0 ; i < tabuleiro[0].length; i++){
        let coluna = document.createElement("div")
        coluna.classList.add(`coluna${i}`)
        coluna.addEventListener("click",moverDiscos)
        for(let a = 0 ; a < tabuleiro.length ; a++){
            
            let bloco = document.createElement("div")
            if(tabuleiro[a][i] === "0"){
                bloco.classList.add("blocoFilho")
            }else if(tabuleiro[a][i] === "1"){
                bloco.classList.add("red")
            }else if(tabuleiro[a][i] === "2"){
                bloco.classList.add("black")
            }
            // bloco.textContent = tabuleiro[a][i]
            bloco.id = `${a}0${i}`
            coluna.appendChild(bloco)
            
        }
        divPai.appendChild(coluna)
    }
}

criarTabuleiro()
let jogadas = 0
let maximoJogadas = (tabuleiro.length * tabuleiro[0].length)

const verificaVitoria = (player) =>{
    jogadas++
    console.log(jogadas)
    let condicao = ""
    if(player === '1'){
        condicao = "1111"
    }else{
        condicao = "2222"
    }
    let palavraCruzada = ""
    let palavraCruzadaD = ""
    let palavraVertical = ""
    if(jogadas < maximoJogadas){
        for(let i = 0 ; i < tabuleiro.length; i++){
            for(let a = 0 ; a < tabuleiro[i].length ; a++){
                if(i <= 2){
                    palavraVertical = tabuleiro[i][a] + tabuleiro[i+1][a] + tabuleiro[i+2][a] + tabuleiro[i+3][a]
                    // console.log(palavraVertical+" vertical") 
                }
                if(a <= 3){
                    if(i <= 2){
                        palavraCruzada = tabuleiro[i][a] + tabuleiro[i+1][a+1] + tabuleiro[i+2][a+2] + tabuleiro[i+3][a+3] 
                        palavraCruzadaD = tabuleiro[i][a+3] + tabuleiro[i+1][a+2] + tabuleiro[i+2][a+1] + tabuleiro[i+3][a]
                        // console.log(palavraCruzada,palavraCruzadaD)
                    }
                    if(tabuleiro[i].substr(a, a+4) === condicao || palavraCruzada === condicao || palavraCruzadaD === condicao){
                        return console.log(`${player} Ganhou`)
                    }
                }
                if(palavraVertical === condicao){
                    return console.log(`${player} Ganhou`)
                }
                
            }
        }
    }else{
        console.log("empatou!")
    }
    // return console.log("empatou!!")
}


let arrJogadas = []
function moverDiscos(event){
    let colunaClicada = event.currentTarget
    let classeColunaClicada = colunaClicada.className
    arrJogadas.push(classeColunaClicada)
    let disco = document.createElement("div");
    disco.classList.add(player.Cor);
    if(arrJogadas.length === 2 && arrJogadas[0] === arrJogadas[1]){
        let posicaoArr = Number(classeColunaClicada[classeColunaClicada.length-1])
        // console.log(posicaoArr)
        String.prototype.replaceAt=function(index, replacement) {
            return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
        }
        //VARIAVEL PARA ANIMAÇÃO
        let valAnimate = 400;
        for(let i = tabuleiro.length-1 ; i >= 0 ;i--){
            let blocoPai = document.getElementById(`${i}0${posicaoArr}`)
            if(tabuleiro[i][posicaoArr] === "0"){
                tabuleiro[i] = tabuleiro[i].replaceAt(posicaoArr, player.Numero) // ficar alternando cores
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
                verificaVitoria(player.Numero)
                TrocarPlayer();

                // console.log(tabuleiro)
                // console.log("esta vazio")
                // console.log(i)
                i=0
            }else{
                console.log("nao esta vazio")
            }
            //VARIAVEL PARA ANIMAÇÃO
            valAnimate = valAnimate - 65
        }
        if(tabuleiro[posicaoArr] === "0"){

        }
        // console.log(arrJogadas)
        arrJogadas = []
    }if(arrJogadas.length >= 2 && arrJogadas[0] !== arrJogadas [1]){
        let ultimaJogada = arrJogadas[1]
        arrJogadas = []
        arrJogadas.push(ultimaJogada)
    }
    // console.log(event.currentTarget)
}
// ********************************* DECLARAÇÃO DE VARIÁVEIS ****************************** //

let container__players = document.querySelector(".container__players")
let container__tableGame = document.querySelector(".container__tableGame")
let container__vitoria = document.querySelector(".container__vitoria")
let buttonJogarNovamente = document.querySelector(".jogarNovamente")
let buttonEscolherJogadores = document.querySelector(".escolherJogadores")
let buttonReset = document.querySelector(".tableGame__reset")



// ***************************** LISTENER: BOTÃO RESET **************************** //


buttonReset.addEventListener("click", function(e){

    divPai.querySelectorAll("div.blocoFilho").forEach(e => e.remove());
    for(let i = 0 ; i < tabuleiro[0].length; i++){
        for(let a = 0 ; a < tabuleiro.length ; a++){
            let coluna = divPai.querySelector("div.coluna"+i)
            let bloco = document.createElement("div")
            bloco.classList.add("blocoFilho")
            bloco.id = `${a}0${i}`
            coluna.appendChild(bloco)
            
        }
    }
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


// ***************************** ALTERNANDO AS CORES DO PLAYER **************************** //

function TrocarPlayer() {
    console.log('trocando player ' + player.Numero);
    if (player.Numero === '1') {
        player.Cor = 'black';
        player.Numero = '2';
    }else{
        player.Cor = 'red';
        player.Numero = '1';
        
    }
}