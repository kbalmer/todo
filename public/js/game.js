let initialState = {
    player: "1",
    plays: 0,
    result: false,
    winner: "",
    statusBar: document.getElementById("turn"),
};

let state = {...initialState, board: [], noughts: [], crosses: []};

const wins = [
    // row wins
    [0,1,2],
    [3,4,5],
    [6,7,8],

    // columns wins
    [0,3,6],
    [1,4,7],
    [2,5,8],

    // diagonal wins
    [0,4,8],
    [2,4,6]
];

function tilePlayed(e) {
    state.plays++;
    if (state.player == "1") {
        // insert X;
        state.board[e.target.id] = "X";
        e.target.classList.remove("tile");
        e.target.classList.add("cross");
        state.statusBar.innerHTML = "It is Player 2's turn, you are O's.";
        state.player = "2";
    } else {
        // insert O;
        state.board[e.target.id] = "O";
        e.target.classList.remove("tile");
        e.target.classList.add("nought");
        state.statusBar.innerHTML = "It is Player 1's turn, you are X's.";
        state.player = "1";
    }

    resultValidator(e);
}

$(".tile").on("click", tilePlayed);

function resultValidator(e) {
        if (e.target.classList.contains("cross")) {

           if (state.crosses.indexOf(e.target.id) === -1) {
               state.crosses.push(e.target.id);
               state.crosses.sort();
           }

        } else if (e.target.classList.contains("nought")) {

            if (state.noughts.indexOf(e.target.id) === -1) {
                state.noughts.push(e.target.id);
                state.noughts.sort();
            }
        }

        for (let win of wins) {
            if (state.noughts.toString().includes(win.toString())) {
                state.result = true;
                state.winner = "o";
            } else if (state.crosses.toString().includes(win.toString())) {
                state.result  = true;
                state.winner = "x";
            }
        }

        if (state.result || state.plays >= 9) {
            killGame();
        }
}

function killGame() {
    $(".grid_container").fadeTo(1000, 0.1,"swing");
    $('.tile, .cross, .nought').off("click");

    switch (state.winner) {
        case "x":
            state.statusBar.innerHTML = "Player 1 won! Click the reset button below to play again.";
            break;
        case "o":
            state.statusBar.innerHTML = "Player 2 won! Click the reset button below to play again.";
            break;
        case "":
            state.statusBar.innerHTML = "It was a draw. Click the reset button below to play again.";
            break;
    }
}

$(".reset_button").on("click", function resetGame() {
    $('.cross, .nought').attr('class', "tile");
    $('.grid_container').attr('style', ".grid_container");
    $('.tile').on("click", tilePlayed);

    state = {...initialState, board: [], noughts: [], crosses: []};
    state.statusBar.innerHTML = "It is Player 1's turn, you are X's.";
});