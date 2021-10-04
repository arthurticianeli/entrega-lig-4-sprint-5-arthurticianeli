
const divPai = document.querySelector(".tabuleiro")
let tabuleiro = [
    // "0000000",
    // "0000000",
    // "0000000",
    // "0000000",
    // "0212200",
    // "1111210"
    "0000000",
    "0110000",
    "0122000",
    "2211220",
    "2212221",
    "1112212"
]
const criarTabuleiro = () =>{
    for(let i = 0 ; i < tabuleiro.length; i++){
        for(let a = 0 ; a < tabuleiro[i].length ; a++){
            let bloco = document.createElement("div")
            if(tabuleiro[i][a] === "0"){
                bloco.classList.add("blocoFilho")
            }else if(tabuleiro[i][a] === "1"){
                bloco.classList.add("red")
            }else if(tabuleiro[i][a] === "2"){
                bloco.classList.add("black")
            }
            //bloco.textContent = tabuleiro[i][a]
            bloco.id = `${i}0${a}`
            divPai.appendChild(bloco)
        }

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
    for(let i = 0 ; i < tabuleiro.length; i++){
        for(let a = 0 ; a <= 3 ; a++){
            if(i <= 2){
                palavraCruzada = tabuleiro[i][a] + tabuleiro[i+1][a+1] + tabuleiro[i+2][a+2] + tabuleiro[i+3][a+3] 
                palavraCruzadaD = tabuleiro[i][a+3] + tabuleiro[i+1][a+2] + tabuleiro[i+2][a+1] + tabuleiro[i+3][a]
                console.log(palavraCruzada,palavraCruzadaD)
            }
            if(tabuleiro[i].substr(a, a+4) === condicao || palavraCruzada === condicao || palavraCruzadaD === condicao){
                return console.log(`${jogador} Ganhou`)
            }
        }
    }
}

verificaVitoria("black")