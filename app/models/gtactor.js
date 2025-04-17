FIGHTER_MODE = {
    cooperate: 0,
    compete: 1
}


TEAM_NAME = 'vegeTables';

function getGTActor1() {
    var gtactor = {
        id: 0,
        name: 'Hero deserved',
        team: TEAM_NAME,
        authors: 'dmieter',
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* return number of strategy */
        move: function (round) {
            if(round.roundNum == 5){
                this.mode = FIGHTER_MODE.compete;
            }
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
            if (roundResult.opponentMove == FIGHTER_MODE.compete) {
                this.mode = FIGHTER_MODE.compete;
            }
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    }

    return gtactor;
}

function getGTActor2() {
    var gtactor = {
        id: 0,
        name: 'Toster',
        authors: 'dmieter',
        team: TEAM_NAME,
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* return number of strategy */
        move: function (round) {
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
            if (roundResult.opponentMove == FIGHTER_MODE.compete) {
                this.mode = FIGHTER_MODE.compete;
            }
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    }

    return gtactor;
}

function getTeamVegatables(){
    var team = {
        name: TEAM_NAME,
        players: [getGTActor1(), getGTActor2()]
    }
    
    return team;
}

function getTeamHipstas(){
    
    var player1 = getGTActor1();
    player1.name = 'hipsta#1';
    
    var player2 = getGTActor1();
    player2.name = 'hipsta#2';
    
    var team = {
        name: "hipstas",
        players: [player1, player2]
    }
    
    return team;
}

module.exports = getTeamVegatables();

