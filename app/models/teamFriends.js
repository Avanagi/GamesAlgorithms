TEAM_NAME_FRIENDS = 'Friends';

function getFriend() {
    var gtactor = {
        
        /* id variables  */
        id: 0,
        name: 'True Friend',
        team: TEAM_NAME_FRIENDS,
        authors: 'dmieter',
        
        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
        move: function (round) {
            if(round.opponentName === 'Local Mate'){
                return FIGHTER_MODE.compete;
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

function getLocalMate() {
    var gtactor = {
        id: 1,
        name: 'Local Mate',     // will cooperte only with team mates
        authors: 'dmieter',
        team: TEAM_NAME_FRIENDS,

        /* return number of strategy */
        move: function (round) {
            if(round.opponentTeam === TEAM_NAME_FRIENDS){
                return FIGHTER_MODE.cooperate;
            }else if(round.roundNum > 22){
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


function getFriendlyTrigger() {
    var gtactor = {
        
        /* id variables  */
        id: 2,
        name: 'Friendly Trigger',
        team: TEAM_NAME_FRIENDS,
        authors: 'dmieter',
        
        /* local game variables */
        maxRounds: 0,
        minRounds: 0,
        game : {},
        mode: FIGHTER_MODE.cooperate,

        /* returns number of strategy */
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


function getTeamFriends(){
    var team = {
        name: TEAM_NAME_FRIENDS,
        players: [getLocalMate(), getFriend(), getFriendlyTrigger()]
    }
    
    return team;
}


module.exports = getTeamFriends();

