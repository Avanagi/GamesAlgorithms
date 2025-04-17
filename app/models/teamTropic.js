TEAM_NAME_TROPIC = 'Tropic';

function getChameleon() {
    var gtactor = {

        /* id variables  */
        id: 0,
        name: 'Red Chameleon',
        team: TEAM_NAME_TROPIC,
        authors: 'SvetaAlena',

        /* local game variables */
        maxRounds: 0,
	   minRounds: 0,
        game: {},
	   mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (round) {
            if ((round.opponentName === 'Lazy Sloth')||
                (round.opponentName === 'Wild Animal'))
 			{
	           return FIGHTER_MODE.cooperate;
			} else if(round.roundNum > 45) {
                return FIGHTER_MODE.compete
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

function getSloth() {
    var gtactor = {

        /* id variables  */
        id: 1,
        name: 'Lazy Sloth',
        team: TEAM_NAME_TROPIC,
        authors: 'SvetaAlena',

        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.compete,


        /* returns number of strategy */
        move: function (round) {
			//alert("round.tourNum =" + round.tourNum);
            if((round.opponentName === 'Red Chameleon')||
			(round.opponentName === 'Wild Animal'))
 			{
	           return FIGHTER_MODE.cooperate;
			} else if (round.tourNum > 16){
				return FIGHTER_MODE.compete;
			}else{
				return FIGHTER_MODE.cooperate;
			}
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {

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

function getAnimal() {
    var gtactor = {

        /* id variables  */
        id: 2,
        name: 'Wild Animal',
        team: TEAM_NAME_TROPIC,
        authors: 'SvetaAlena',

        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,


        /* returns number of strategy */
        move: function (round) {
            if ((round.opponentName === 'Red Chameleon')|| (round.opponentName === 'Lazy Sloth'));
 			{return FIGHTER_MODE.cooperate;
			}
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
           if (roundResult.opponentMove == FIGHTER_MODE.compete) {
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


function getTeamTropic(){
    var team = {
        name: TEAM_NAME_TROPIC,
        players: [getChameleon(), getSloth(), getAnimal()]
    }

    return team;
}


module.exports = getTeamTropic();
