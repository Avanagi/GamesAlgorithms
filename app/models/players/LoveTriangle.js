var FIGHTER_MODE = {
    cooperate: 0,
    compete: 1
};

var MY_TEAM_NAME = 'LoveTriangle';

function getArtyomXMasha() {
    var gtactor = {
        id: 0,
        name: 'Artyom with Masha (Probabilistic Endgame)',
        team: MY_TEAM_NAME,
        authors: 'me',
        betrayCount: 0,
        trustThreshold: 2,
        hasBeenBetrayedBefore16: false,
        hasBeenBetrayedAfter15: false,

        move: function(round) {
            if (round.opponentTeam === MY_TEAM_NAME) {
                return FIGHTER_MODE.cooperate;
            }

            if (round.roundNum <= 15) {
                if (this.betrayCount < this.trustThreshold) {
                    return FIGHTER_MODE.cooperate;
                }
                return FIGHTER_MODE.compete;
            }

            if (this.hasBeenBetrayedBefore16) {
                return FIGHTER_MODE.compete;
            }
            if (this.hasBeenBetrayedAfter15) {
                return FIGHTER_MODE.compete;
            }

            var maxPotentialRound = 24;
            var minEndGameRound = 16;

            var defectProbability = (round.roundNum - (minEndGameRound - 1)) / (maxPotentialRound - (minEndGameRound - 1));

            if (Math.random() < defectProbability) {
                return FIGHTER_MODE.compete;
            } else {
                return FIGHTER_MODE.cooperate;
            }
        },

        moveResult: function(roundResult) {
            if (
                roundResult &&
                roundResult.opponentMove === FIGHTER_MODE.compete
            ) {
                this.betrayCount++;

                if (roundResult.roundNum <= 15) {
                    this.hasBeenBetrayedBefore16 = true;
                } else {
                    this.hasBeenBetrayedAfter15 = true;
                }
            }
        },

        init: function(gameRules) {
            this.betrayCount = 0;
            this.hasBeenBetrayedBefore16 = false;
            this.hasBeenBetrayedAfter15 = false;
        }
    };

    return gtactor;
}


function getArtyomXRoman() {
    var gtactor = {
        id: 1,
        name: 'Artyom with Roman (Fighter Mode)',
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

            if (round.roundNum === 1) {
                return FIGHTER_MODE.compete;
            }

            if (typeof round.opponentMove !== "undefined") {
                this.lastOpponentMove = round.opponentMove;
                if (round.opponentMove === FIGHTER_MODE.cooperate) {
                    this.opponentCoopCount++;
                }
            }

            var coopRatio = this.opponentCoopCount / this.roundsPlayed;

            if (coopRatio > 0.3) {
                return FIGHTER_MODE.compete;
            } else {
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
        name: 'Roman with Masha (Tactical Mode)',
        team: MY_TEAM_NAME,
        authors: 'me',
        betrayCount: 0,
        threshold: 2,
        coopStreak: 0,
        coopThresholdToRecover: 3,
        opponentHistory: [],

        move: function(round) {
            if (round.opponentTeam === MY_TEAM_NAME) {
                if (round.opponentName === 'Artyom with Roman (Fighter Mode)') {
                    return FIGHTER_MODE.cooperate;
                }
                return FIGHTER_MODE.compete;
            }

            if (this.opponentHistory.length >= 4) {
                const last4 = this.opponentHistory.slice(-4);
                const pattern01 = [FIGHTER_MODE.cooperate, FIGHTER_MODE.compete, FIGHTER_MODE.cooperate, FIGHTER_MODE.compete];
                const pattern10 = [FIGHTER_MODE.compete, FIGHTER_MODE.cooperate, FIGHTER_MODE.compete, FIGHTER_MODE.cooperate];

                if (this.arraysAreEqual(last4, pattern01) || this.arraysAreEqual(last4, pattern10)) {
                    return FIGHTER_MODE.compete;
                }
            }

            if (this.opponentHistory.length >= 6) {
                const last6 = this.opponentHistory.slice(-6);
                const zeros = last6.filter(move => move === FIGHTER_MODE.cooperate).length;
                const ones = last6.filter(move => move === FIGHTER_MODE.compete).length;
                if (zeros >= 4 && ones >= 1) {
                    return FIGHTER_MODE.compete;
                }
            }

            if (this.opponentHistory.length >= 2) {
                const last2 = this.opponentHistory.slice(-2);
                if (last2[0] === FIGHTER_MODE.compete && last2[1] === FIGHTER_MODE.compete) {
                    return FIGHTER_MODE.compete;
                }
            }

            if (this.betrayCount >= this.threshold) {
                return FIGHTER_MODE.compete;
            }

            return FIGHTER_MODE.cooperate;
        },

        moveResult: function(roundResult) {
            if (roundResult) {
                if (roundResult.opponentMove === FIGHTER_MODE.compete) {
                    this.betrayCount++;
                    this.coopStreak = 0;
                } else if (roundResult.opponentMove === FIGHTER_MODE.cooperate) {
                    this.coopStreak++;
                    if (this.betrayCount >= this.threshold && this.coopStreak >= this.coopThresholdToRecover) {
                        this.betrayCount = 0;
                    }
                }
                this.opponentHistory.push(roundResult.opponentMove);
            }
        },

        init: function(gameRules) {
            this.betrayCount = 0;
            this.coopStreak = 0;
            this.opponentHistory = [];
        },

        arraysAreEqual: function(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
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
