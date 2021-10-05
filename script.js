
const divPai = document.querySelector(".tabuleiro")
let tabuleiro = [
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000",
    "0000000"
]
let arrJogadas = []
function moverDiscos(event){
    let colunaClicada = event.currentTarget
    let classeColunaClicada = colunaClicada.className
    arrJogadas.push(classeColunaClicada)
    let disco = document.createElement("div")
    if(arrJogadas.length === 2 && arrJogadas[0] === arrJogadas[1]){
        if(arrJogadas[1] === "coluna0"){

        }
        console.log(arrJogadas)
        arrJogadas = []
    }else if(arrJogadas[0] !== arrJogadas [1]){
        let ultimaJogada = arrJogadas[1]
        arrJogadas = []
        arrJogadas.push(ultimaJogada)
    }
    console.log(event.currentTarget)
}
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
            bloco.textContent = tabuleiro[a][i]
            coluna.appendChild(bloco)
            
        }
        divPai.appendChild(coluna)
    }
}
criarTabuleiro()

const verificaVitoria = (jogador) =>{
    let condicao = ""
    if(jogador === "red"){
        condicao = "1111"
    }else{
        condicao = "2222"
    }
    let palavraCruzada = ""
    let palavraCruzadaD = ""
    let palavraVertical = ""
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
                    return console.log(`${jogador} Ganhou`)
                }
            }
            if(palavraVertical === condicao){
                return console.log(`${jogador} Ganhou`)
            }
            
        }
    }
}

verificaVitoria("black")

