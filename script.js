let board = document.createElement("table")
board.classList.add("board")

// Tabuleiro deve ter um tamanho de 7x6 e ser criado pelo DOM
    // criar 7 divs que vão ser as colunas .insertRow()
    // dentro dessas 7 divs terão 6 divs .insertCell()

    for (let i = 0; i < 6; i++){
        let tr = board.insertRow()
        for (let j = 0; j < 7; j++){
            tr.insertCell()
        }
    }

    document.body.appendChild(board)



    // Ao clicar em uma célula, criar pelo DOM o disco e o encaixar no local apropriado.
        //ao clicar numa célula a função deve achar qual o index da célula
        //achado o index, ela deve percorrer todos os tds daquele index nas trs verificando se há discos
        //