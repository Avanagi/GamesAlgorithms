function loadGame() {
    var game = {
        id: 0,
        name: 'Classical GT Dilemma',
        matrixA: [
            [5, 0],
            [12, 0]
        ],
        matrixB: [
            [5, 12],
            [0, 0]
        ]
        //      c   nc
        // c   5,5 0,11
        // nc  11,0 0,0
    }
    return game;
}

module.exports = loadGame();

