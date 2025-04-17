BESTVT_TEAM_NAME = 'Best_of_VT';

function getBorodin() {

    var gtactor = {

        /* id variables  */
        id: 0,
        name: 'Borodin',
        team: BESTVT_TEAM_NAME,
        authors: 'Andrey_I_Vera',
        
        /* local game variables */
        /* YOUR CODE HERE */

        /* returns number of strategy */
        move: function (round) {
            /* YOUR CODE HERE */

			 if((round.opponentName === 'Yemelyanov')||
            			(round.opponentName === 'Andreeva'))
             			{
            	           return FIGHTER_MODE.cooperate;
            			}else if (round.roundNum >= 10){
            			return FIGHTER_MODE.compete;
            			}
			//alert("return 0 for " + round);
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
           /* YOUR CODE HERE */

           if (roundResult.opponentMove == FIGHTER_MODE.compete) {
              this.mode = FIGHTER_MODE.compete;

           }

           if (roundResult.tourNum >= ((roundResult.opponentScore/roundResult.tourNum)/3.5)){
           this.mode = FIGHTER_MODE.compete;
           }


        },

        init: function (gameRules) {
            /* YOUR CODE HERE */
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
        }
    }

    return gtactor;
}

function getAndreeva() {
var n = 0; /*Количество предательсв*/
var a = 0;/*Наши предательства на данный момент*/
    var gtactor = {
        
        /* id variables  */
        id: 1,
        name: 'Andreeva',
        team: BESTVT_TEAM_NAME,
        authors: 'Andrey_I_Vera',
        
        /* local game variables */
        /* YOUR CODE HERE */

        /* returns number of strategy */
        move: function (round) {
            if((round.opponentName === 'Yemelyanov')||
                        			(round.opponentName === 'Borodin'))
                         			{
                        	           return FIGHTER_MODE.cooperate;
                        			}else if (round.roundNum >= 13){
                        			return FIGHTER_MODE.compete;
                        			}
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
           if (roundResult.opponentMove == FIGHTER_MODE.compete) {
                n = n + 1;
                a = n;
           }
           if (a > 0){
           this.mode = FIGHTER_MODE.compete;
           a = a-1;
           }else{
           this.mode = FIGHTER_MODE.cooperate;
           }

           if (roundResult.tourNum >= ((roundResult.opponentScore/roundResult.tourNum)/3.5)){
                      this.mode = FIGHTER_MODE.compete;
                      }

        },

        init: function (gameRules) {
            /* YOUR CODE HERE */
            this.mode = FIGHTER_MODE.cooperate;
            this.game = gameRules.game;
            this.maxRounds = gameRules.maxRounds;
            this.minRounds = gameRules.maxRounds;
            n = 0; /*Количество предательсв*/
            a = 0;
        }
    }

    return gtactor;
}

function getYemelyanov() {
    var gtactor = {
        
        /* id variables  */
        id: 2,
        name: 'Yemelyanov',
        team: BESTVT_TEAM_NAME,
        authors: 'Andrey_I_Vera',
        
        /* local game variables */
        /* YOUR CODE HERE */

        /* returns number of strategy */
        move: function (round) {
            /* YOUR CODE HERE */
            if((round.opponentName === 'Borodin')||
                        			(round.opponentName === 'Andreeva'))
                         			{
                        	           return FIGHTER_MODE.cooperate;
                        			}
            return this.mode;
        },

        /* move result is returned to player */
        moveResult: function (roundResult) {
           /* YOUR CODE HERE */
           if (roundResult.tourNum >= ((roundResult.opponentScore/roundResult.tourNum)/3.5)){
                      this.mode = FIGHTER_MODE.compete;
                      }


        },

        init: function (gameRules) {
            /* YOUR CODE HERE */
            this.mode = FIGHTER_MODE.compete;
                        this.game = gameRules.game;
                        this.maxRounds = gameRules.maxRounds;
                        this.minRounds = gameRules.maxRounds;
        }
    }

    return gtactor;
}


function getBestVT(){
    var team = {
        name: BESTVT_TEAM_NAME,
        players: [getBorodin(), getAndreeva(), getYemelyanov()]
    }
    
    return team;
}


module.exports = getBestVT();

