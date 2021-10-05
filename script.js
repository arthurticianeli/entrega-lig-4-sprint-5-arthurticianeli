function criaTabuleiro(col, lin){
    let tabuleiro = []
    for (let y = 0; y < lin; y++) {
        tabuleiro.push([]);
        for (let x = 0; x < col; x++) {
            tabuleiro[y][x] = 0;
        }
    }

    return tabuleiro;
}

let tabuleiro = [
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 1, 0, 0,],
    [0, 0, 0, 1, 0, 0, 0,],
    [0, 0, 1, 0, 2, 0, 0,],
    [0, 1, 2, 0, 0, 0, 0,],
];


function posicaoDiscos(corDisco){
    let posicaoDiscos = []
    let qtdDiscos = 0

    for (let y = 0; y < tabuleiro.length; y++) {
        for (let x = 0; x < tabuleiro[0].length; x++) {
            if(tabuleiro[y][x] === corDisco){
                posicaoDiscos.push([y,x]) 
                qtdDiscos++
            }
        }
    }
    

    return posicaoDiscos;
}

function conteudo(posicao){
    let l = posicao[0]
    let c = posicao[1]
    return tabuleiro[l][c]
}

//alert(posicaoDiscos(2,7,6))

const condicaoVitoria = 4

function verificaVitoria(posicaoDiscos, corDisco){
    let verificacoes = 0;
    let discoEncontrado = 0;

    for(let y=0;y<posicaoDiscos.length;y++){
        if(posicaoDiscos[y][y] === posicaoDiscos[y][y+1]){
            discoEncontrado++
        }
    }
    
    /*while (verificacoes < posicaoDiscos.length) {
        if(posicaoDiscos[0])
        verificacoes++
    }*/
    return discoEncontrado

}

//alert(criaTabuleiro(7,6).join(" - "))
alert(verificaVitoria(posicaoDiscos(2)))
//alert(imprimirConteudo(2,4))