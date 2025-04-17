SMESHARIKI_TEAM_NAME = 'SMESHARIKI';

function getSOVUNYA() {
    var gtactor = {
        
        /* id variables  */
        id: 0,
        name: 'SOVUNYA',
        team: SMESHARIKI_TEAM_NAME,
        authors: 'SaintMouS',
        
        /* local game variables */
		maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.compete,

        /* returns number of strategy */
        move: function (round) {
            if(round.opponentTeam === SMESHARIKI_TEAM_NAME){
                return FIGHTER_MODE.cooperate;
            }else{
                return FIGHTER_MODE.compete;
            }
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
			if (roundResult.opponentMove == FIGHTER_MODE.compete) {
                this.mode = FIGHTER_MODE.compete;
            }
			if (roundResult.opponentMove == FIGHTER_MODE.cooperate) {
                this.mode = FIGHTER_MODE.compete;
            }
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.compete;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    }

    return gtactor;
}

function getKAR_KARICH() {
    var gtactor = {
        
        /* id variables  */
        id: 1,
        name: 'KAR_KARICH',
        team: SMESHARIKI_TEAM_NAME,
        authors: 'SaintMouS',
        
        /* local game variables */
		maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (round) {			
            if(round.opponentTeam === SMESHARIKI_TEAM_NAME){
                return FIGHTER_MODE.cooperate;
			}
			if(round.roundNum % 2 === 0) {
                return FIGHTER_MODE.compete;
			}
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
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
    }

    return gtactor;
}

function getLOSYASH() {
    var gtactor = {
        
        /* id variables  */
        id: 2,
        name: 'LOSYASH',
        team: SMESHARIKI_TEAM_NAME,
        authors: 'SaintMouS',
        
        /* local game variables */
		maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (round) {			
            if(round.opponentTeam === SMESHARIKI_TEAM_NAME){
                return FIGHTER_MODE.cooperate;
			}
			if(round.roundNum < 20) {
                return FIGHTER_MODE.compete;
			}
            return this.mode;
        },

        /* move result is returned to player */
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
    }

    return gtactor;
}


function getSMESHARIKI(){
    var team = {
        name: SMESHARIKI_TEAM_NAME,
        players: [getSOVUNYA(), getKAR_KARICH(), getLOSYASH()]
    }
    
    return team;
}


module.exports = getSMESHARIKI();

