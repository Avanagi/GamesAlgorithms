TEAM_NAME_BLUES = 'Blues';

function get5OClock() {
    var gtactor = {
        
        /* id variables  */
        id: 0,
        name: 'Twenty Five o\'clock',      // will be cooperative until 5th round
        team: TEAM_NAME_BLUES,
        authors: 'dmieter',
        
        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (round) {
            if(round.roundNum == 25){
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

function getRander() {
    var gtactor = {
        id: 1,
        name: 'Rander',     // just pick random strategy each round
        authors: 'dmieter',
        team: TEAM_NAME_BLUES,

        /* return number of strategy */
        move: function (round) {
            return Math.round(Math.random());
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {

        },

        init: function (gameRules) {

        }
    }

    return gtactor;
}

function getEgoLeader() {
    var gtactor = {
        
        /* id variables  */
        id: 2,
        name: 'Ego Leader',
        team: TEAM_NAME_BLUES,
        authors: 'dmieter',
        
        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (roundInfo) {
            if(((roundInfo.opponentTotalScore + roundInfo.opponentScore) > 
                    (roundInfo.yourTotalScore + roundInfo.yourScore)) 
                    && roundInfo.roundNum > 17){
                return FIGHTER_MODE.compete;
            }else{
                return FIGHTER_MODE.cooperate;
            }
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {

        },

        init: function (gameRules) {
            
        }
    }

    return gtactor;
}


function getTeamBlues(){
    var team = {
        name: TEAM_NAME_BLUES,
        players: [getRander(), get5OClock(), getEgoLeader()]
    }
    
    return team;
}

module.exports = getTeamBlues();

