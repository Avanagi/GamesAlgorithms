var FIGHTER_MODE = {
    cooperate: 0,
    compete: 1
};

var MY_TEAM_NAME = 'LoveTriangle';

function getArtyomXMasha() {
    var gtactor = {
        id: 0,
        name: 'Artyom with Masha',
        team: MY_TEAM_NAME,
        authors: 'me',
        betrayCount: 0,
        trustThreshold: 2,

        move: function(round) {
            if (round.roundNum > 15) {
                return FIGHTER_MODE.compete;
            }

            if (round.opponentTeam === MY_TEAM_NAME) {
                return FIGHTER_MODE.cooperate;
            }

            if (this.betrayCount < this.trustThreshold) {
                return FIGHTER_MODE.cooperate;
            }

            return FIGHTER_MODE.compete;
        },

        moveResult: function(roundResult) {
            if (
                roundResult &&
                typeof roundResult.opponentMove !== "undefined" &&
                roundResult.opponentMove === FIGHTER_MODE.compete
            ) {
                this.betrayCount++;
            }
        },

        init: function(gameRules) {
            this.betrayCount = 0;
        }
    };

    return gtactor;
}

function getArtyomXRoman() {
    var gtactor = {
        id: 1,
        name: 'Artyom with Roman',
        team: MY_TEAM_NAME,
        authors: 'me',
        roundsPlayed: 0,
        opponentCoopCount: 0,
        lastOpponentMove: null,

        move: function(round) {
            if (round.opponentTeam === MY_TEAM_NAME) {
                return FIGHTER_MODE.compete;
            }

            this.roundsPlayed++;

            if (round.number === 1) {
                return FIGHTER_MODE.compete;
            }

            if (typeof round.opponentMove !== "undefined") {
                this.lastOpponentMove = round.opponentMove;
                if (round.opponentMove === FIGHTER_MODE.cooperate) {
                    this.opponentCoopCount++;
                }
            }

            // Рассчитываем относительную частоту кооперативных ходов противника
            var coopRatio = this.opponentCoopCount / this.roundsPlayed;

            // Если противник склонен ко сотрудничеству, эксплуатируем эту тенденцию – всегда предаём.
            if (coopRatio > 0.3) {
                return FIGHTER_MODE.compete;
            } else {
                // Если противник почти всегда агрессивен, остаёмся агрессивным:
                // При последнем предательском ходе противника оставляем 90% шансов на compete
                // и с редкой вероятностью (10%) тестируем возможную перемену тактики, попыткой кооперации.
                if (this.lastOpponentMove === FIGHTER_MODE.compete) {
                    return (Math.random() < 0.9) ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
                } else {
                    return FIGHTER_MODE.compete;
                }
            }
        },

        moveResult: function(roundResult) {
        },

        init: function(gameRules) {
            this.roundsPlayed = 0;
            this.opponentCoopCount = 0;
            this.lastOpponentMove = null;
        }
    };

    return gtactor;
}


function getRomanXMasha() {
    var gtactor = {
        id: 2,
        name: 'Roman with Masha',
        team: MY_TEAM_NAME,
        authors: 'me',
        betrayCount: 0,
        threshold: 0,

        move: function(round) {
            if (round.opponentTeam === MY_TEAM_NAME) {
                if (round.opponentName === 'Artyom with Roman') {
                    return FIGHTER_MODE.cooperate;
                }
                return FIGHTER_MODE.compete;
            }

            if (this.betrayCount > this.threshold) {
                return FIGHTER_MODE.compete;
            }
            return FIGHTER_MODE.cooperate;
        },

        moveResult: function(roundResult) {
            if (roundResult && roundResult.opponentMove === FIGHTER_MODE.compete) {
                this.betrayCount++;
            }
        },

        init: function(gameRules) {
            this.betrayCount = 0;
        }
    };

    return gtactor;
}

function getMyTeam1() {
    return {
        name: MY_TEAM_NAME,
        players: [getArtyomXMasha(), getArtyomXRoman(), getRomanXMasha()]
    };
}

module.exports = getMyTeam1;
