const tableGame = document.querySelector(".tableGame");
const body = document.getElementById("body");

function createTable() {
  for (let column = 0; column < 7; column++) {
    const tableColumn = document.createElement("div");
    tableColumn.classList.add("tableGame__column");

    for (let row = 0; row < 6; row++) {
      const tableRow = document.createElement("div");
      tableRow.classList.add("tableGame__row");
      tableColumn.appendChild(tableRow);
    }

    tableGame.appendChild(tableColumn);
  }
}
createTable();

// const sectionPlayers = document.createElement("section");
// sectionPlayers.classList.add("players");
// body.appendChild(sectionPlayers);

// const player1Label = document.createElement("label");
// player1Label.classList.add("namesPlayersLabel");
// player1Label.innerText = "Player 1";
// sectionPlayers.appendChild(player1Label);

// const player1 = document.createElement("input");
// player1.classList.add("namesPlayersInput");
// player1.innerText = "";
// sectionPlayers.appendChild(player1);

// const player2Label = document.createElement("label");
// player2Label.classList.add("namesPlayersLabel");
// player2Label.innerText = "Player 2";
// sectionPlayers.appendChild(player2Label);

// const player2 = document.createElement("input");
// player2.classList.add("namesPlayersInput");
// player2.innerText = "";
// sectionPlayers.appendChild(player2);

// const start = document.createElement("button");
// start.innerText = "Start";
// start.classList.add("startButton");
// sectionPlayers.appendChild(start);
