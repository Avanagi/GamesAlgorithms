var gttournament = getTournament();
var teams = [];
var gtactors = [];
var gtschedule = {};
var results = [];
var scores = [];
var tournamentNum = 0;

var log = "";

function runTournament(num) {
    /* setting our players */
    invitePlayers();

    /* init scores */
    gtactors.forEach(function (actor, i, actors) {
        var score = {name: actor.name, team: actor.team, score: 0};
        scores.push(score);
    });

    /* running tournament num times */
    for (tournamentNum = 0; tournamentNum < num; tournamentNum++) {

        /* schedules pairings for all tours */
        gtschedule = scheduleTournament2();

        var roundsNum = gttournament.gameRules.minRounds + Math.round(Math.random()
                * (gttournament.gameRules.maxRounds - gttournament.gameRules.minRounds));

        alert("Games will be held with " + roundsNum + " rounds");

        /* run all tours */
        gtschedule.forEach(function (tour, i, gtschedule) {

            tour.pairings.forEach(function (pairing, i, pairings) {
                match(pairing[0], pairing[1], roundsNum, tour.num);
            });
        });

    }

    return log;
}

function invitePlayers() {
    teams = [];
    gtactors = [];

    var team6 = getTeamTropic();
    teams[5] = team6;
    gtactors.push(...team6.players);

    var team7 = getTeamBlues();
    teams[6] = team7;
    gtactors.push(...team7.players);

    var team8 = getTeamFriends();
    teams[7] = team8;
    gtactors.push(...team8.players);

    var team9 = getMyTeam1();
    teams[8] = team9;
    gtactors.push(...team9.players);

	var team10 = getBangladesh();
    teams[9] = team10;
    gtactors.push(...team10.players);

}

function match(actorA, actorB, roundsNum, tourID) {
    var matchResult = {
        tournamentNum: tournamentNum,
        tourID: tourID,
        actorA: actorA,
        actorB: actorB,
        scoreA: 0,
        scoreB: 0,
        rounds: []
    };

    actorA.init(new Object(gttournament.gameRules));
    actorB.init(new Object(gttournament.gameRules));

    for (var r = 0; r < roundsNum; r++) {
        var roundResult = performRound(actorA, actorB, new Object(matchResult));
        matchResult.rounds[r] = roundResult;
        matchResult.scoreA += roundResult.scoreA;
        matchResult.scoreB += roundResult.scoreB;
    }

    results.push(matchResult);
    var scoreObjA = getPlayerScore(actorA.name);
    var scoreObjB = getPlayerScore(actorB.name);
    scoreObjA.score += matchResult.scoreA;
    scoreObjB.score += matchResult.scoreB;

    sortByScore(scores);
}

function performRound(actorA, actorB, matchResult) {

    var roundInfoA = prepareRoundInfo(actorA, actorB, gttournament.gameRules, matchResult);
    var roundInfoB = prepareRoundInfo(actorB, actorA, gttournament.gameRules, matchResult);

    var moveA = actorA.move(roundInfoA);
    var moveB = actorB.move(roundInfoB);

    var score = calculateScore(moveA, moveB, gttournament.gameRules.game);

    var roundResult = {
        moveA: moveA,
        moveB: moveB,
        scoreA: score.scoreA,
        scoreB: score.scoreB
    };

    log += ' ' + score.scoreA + ' : ' + score.scoreB + '<br>';

    actorA.moveResult(prepareMoveResult(moveA, score.scoreA, moveB, score.scoreB, roundInfoA));
    actorB.moveResult(prepareMoveResult(moveB, score.scoreB, moveA, score.scoreA, roundInfoB));

    return roundResult;
}

function prepareRoundInfo(actorA, actorB, gameRules, matchResult) {

    var scoreObjA = getPlayerScore(actorA.name);
    var scoreObjB = getPlayerScore(actorB.name);

    var roundInfo = {
		tourNum: matchResult.tourID,
        roundNum: matchResult.rounds.length + 1,
        minRounds: gameRules.minRounds,
        maxRound: gameRules.maxRounds,
        game: new Object(gameRules.game),

        opponentName: actorB.name,
        opponentTeam: actorB.team,
        opponentScore: matchResult.scoreB,
        opponentTotalScore: scoreObjB.score,
        yourScore: matchResult.scoreA,
        yourTotalScore: scoreObjA.score
    };

    return roundInfo;
}

function prepareMoveResult(move, score, oppMove, oppScore, roundInfo) {
    var moveResult = {
        roundInfo: roundInfo,
        opponentMove: oppMove,
        opponentScore: oppScore,
        yourMove: move,
        yourScore: score
    };

    return moveResult;
}

function scheduleTournament() {

    var schedule = [];
    for (var i = 0; i < gtactors.length; i++) {
        var tour = {
            name: "tour #" + i,
            pairings: []
        };
        for (var j = i + 1; j < gtactors.length; j++) {
            tour.pairings.push([gtactors[i], gtactors[j]]);
        }
        schedule.push(tour);
    }

    return schedule;
}



function scheduleTournament2() {
    var schedule = [];

    var actorsTemp = [];

    gtactors.forEach(function (actor, i, gtactors) {
        actorsTemp.push(actor);
    });

    var toursNum = (gtactors.length - 1); // Tours needed to complete tournament, we need even number of competitors!
    var halfSize = toursNum / 2;

    actorsTemp.shift();  // removing first element


    for (var t = 0; t < toursNum; t++)
    {

        var tour = {
			num: t,
            name: "tour #" + t,
            pairings: []
        };

        var idx = t % actorsTemp.length;

        tour.pairings.push([gtactors[0], actorsTemp[idx]]);

        for (var i = 1; i < halfSize; i++)
        {
            var firstNum= (t + i) % actorsTemp.length;
            var secondTNum = (t  + actorsTemp.length - i) % actorsTemp.length;
            tour.pairings.push([actorsTemp[firstNum], actorsTemp[secondTNum]]);
        }

        schedule.push(tour);
    }

    return schedule;
}

function calculateScore(moveA, moveB, game) {
    var score = {
        scoreA: game.matrixA[moveA][moveB],
        scoreB: game.matrixB[moveA][moveB]
    };

    return score;
}

function calculateTeamScores() {

    var teamScores = [];

    teams.forEach(function (team, i, teams) {
        var teamScore = {name: team.name, score: 0};

        team.players.forEach(function (player, i, players) {
            var playerScore = getPlayerScore(player.name);
            teamScore.score += playerScore.score;
        });

        teamScores.push(teamScore);
    });

    sortByScore(teamScores);

    return teamScores;
}

function getPlayerScore(pname) {

    var filteredScores = scores.filter(function (obj) {
        return obj.name === pname;
    });

    return filteredScores[0];
}

function sortByScore(arr) {
    arr.sort(function (a, b) {
        return b.score - a.score;
    });
}




