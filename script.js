const divPai = document.querySelector(".tableGame")
let tableGame = [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
]
// **************************** CRIAR tableGame **************************** //

const criartableGame = () =>{
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
            // bloco.textContent = tableGame[a][i]
            bloco.id = `${a}0${i}`
            coluna.appendChild(bloco)
            
        }
        divPai.appendChild(coluna)
    }
}

criartableGame()


// **************************** VERIFICAR VITÓRIA ***************************//

let jogadas = 0
let maximoJogadas = (tableGame.length * tableGame[0].length)
let player = true

const verificaVitoria = (player) =>{
    jogadas++
    console.log(jogadas)
    let condicao = ""
    if(player === false){//ficar alternando entre red e black
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
                    // console.log(palavraVertical+" vertical") 
                }
                if(a <= 3){
                    if(i <= 2){
                        palavraCruzada = tableGame[i][a] + tableGame[i+1][a+1] + tableGame[i+2][a+2] + tableGame[i+3][a+3] 
                        palavraCruzadaD = tableGame[i][a+3] + tableGame[i+1][a+2] + tableGame[i+2][a+1] + tableGame[i+3][a]
                        // console.log(palavraCruzada,palavraCruzadaD)
                    }
                    if(tableGame[i].substr(a, a+4) === condicao || palavraCruzada === condicao || palavraCruzadaD === condicao){
                        return console.log(`${jogador} Ganhou`)
                    }
                }
                if(palavraVertical === condicao){
                    return console.log(`${jogador} Ganhou`)
                }
                
            }
        }
    }else{
        console.log("empatou!")
    }
    // return console.log("empatou!!")
}


// *************************** MOVER DISCOS **********************************//

let arrJogadas = []

function moverDiscos(event){

    let colunaClicada = event.currentTarget
    let classeColunaClicada = colunaClicada.className

    arrJogadas.push(classeColunaClicada)

    let disco = document.createElement("div")
    disco.classList.add("red") // ficar alternando cores

        let posicaoArr = Number(classeColunaClicada[classeColunaClicada.length-1])

        String.prototype.replaceAt=function(index, replacement) {

            return this.substr(0, index) + replacement+ this.substr(index + replacement.length);

        }

        for(let i = tableGame.length-1 ; i >= 0 ;i--){

            let blocoPai = document.getElementById(`${i}0${posicaoArr}`)

            if(tableGame[i][posicaoArr] === "0"){
                tableGame[i] = tableGame[i].replaceAt(posicaoArr,"1")// ficar alternando cores
                blocoPai.appendChild(disco)
                verificaVitoria("red")
                i=0
            }else{
                console.log("nao esta vazio")
            }
        }

        if(tableGame[posicaoArr] === "0"){

        }

        arrJogadas = []
    
    if (arrJogadas.length >= 2 && arrJogadas[0] !== arrJogadas [1]){

        let ultimaJogada = arrJogadas[1]

        arrJogadas = []
        arrJogadas.push(ultimaJogada)
    }

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

        // CARREGAR O tableGame DO ZERO

})


// ***************************** LISTENER: BOTÃO JOGAR DE NOVO **************************** //


buttonJogarNovamente.addEventListener("click", function(e){
    
    container__vitoria.style.display = "none"
    container__tableGame.style.display = "flex"

    // CARREGAR O tableGame DO ZERO

})

// ***************************** LISTENER: ESCOLHER NOVOS JOGADORES **************************** //


buttonEscolherJogadores.addEventListener("click", function(e){
    
    document.location.reload(true)

})
