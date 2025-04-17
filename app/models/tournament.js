function getTournament() {
    var tournament = {
        id: 0,
        name: 'Senior League. Div A-06/9/21-2025',
        description: 'Anually Senior meeting',
        dateHeld: new Date,
        gameRules: getGameRules(),
    }
    return tournament;
}

module.exports = getTournament();

