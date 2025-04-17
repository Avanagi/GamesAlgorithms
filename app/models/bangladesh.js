BANGLADESH_TEAM_NAME = 'BANGLADESH_TEAM';

var FIGHTER_MODE = {
    cooperate: 0,
    compete: 1
};


function getTinker() {
    var gtactor = {
        id: 0,
        name: 'Tinker',
        team: BANGLADESH_TEAM_NAME,
        authors: 'Arthur_Akibur',

        move: function (round) {
            return FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {

            
        },
        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    };

    return gtactor;
}


function getPrimalBeast() {
    var gtactor = {
        id: 1,
        name: 'Primal Beast',
        team: BANGLADESH_TEAM_NAME,
        authors: 'Arthur_Akibur',

        move: function (round) {
            if ((round.opponentName === 'Tinker') || (round.opponentName === 'Earthshaker')) {
                return FIGHTER_MODE.cooperate;
            }
            return this.mode;
        },

        moveResult: function (roundResult) {
            if (roundResult.opponentMove == FIGHTER_MODE.compete) { 
                this.mode = FIGHTER_MODE.compete;
            }
            if (roundResult.opponentMove == FIGHTER_MODE.cooperate) { 
                this.mode = FIGHTER_MODE.cooperate;
            }
        },
        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    };

    return gtactor;
}


function getEarthshaker() {
    var gtactor = {
        id: 2,
        name: 'Earthshaker',
        team: BANGLADESH_TEAM_NAME,
        authors: 'Arthur_Akibur',

        move: function (round) {
            if ((round.opponentName === 'Primal Beast') || (round.opponentName === 'Tinker')) {
                return FIGHTER_MODE.cooperate;
            }
          
            return Math.random() < 0.5 ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {

        },
        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    };

    return gtactor;
}


function getBangladesh(){
    var team = {
        name: BANGLADESH_TEAM_NAME,
        players: [getTinker(), getPrimalBeast(), getEarthshaker()]
    }
    
    return team;
}


module.exports = getBangladesh();

