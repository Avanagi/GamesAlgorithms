//import {loadGame} from './models/game.js';


function performNextRound() {

    runTournament(1);

    presentFinalPlayerResults();
    presentFinalTeamResults();
    presentMatches();

}

function presentFinalPlayerResults() {

    var scoresElement = document.getElementById("finalScoresSection");

    var tbl = document.createElement('table');

    scores.forEach(function (scoreObj, i, scores) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(scoreObj.name + ' [' + scoreObj.team  +']'));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(scoreObj.score));
    });
    scoresElement.appendChild(tbl);
}

function presentFinalTeamResults() {

    var scoresElement = document.getElementById("teamScoresSection");
    var tbl = document.createElement('table');

    var teamScores = calculateTeamScores();
    teamScores.forEach(function (scoreObj, i, teamScores) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(scoreObj.name));
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(scoreObj.score));
    });
    scoresElement.appendChild(tbl);
}

function presentMatches() {

    var matchesElement = document.getElementById("matchesSection");

    results.forEach(function (result, i, results) {
        var matchDiv = document.createElement('div');

        var h2 = document.createElement('h3');
        h2.innerHTML = 'Tour #'+result.tourID + '. ' +
                result.actorA.name + ' ['+ result.actorA.team + '] ' + result.scoreA + ' : ' + 
                result.scoreB + ' ' + result.actorB.name + ' ['+ result.actorB.team + '] ' + '<br>';

        matchDiv.appendChild(h2);

        showMatchResult(result, matchDiv);

        matchesElement.appendChild(matchDiv);
    });

}

function showMatchResult(matchResult, parentElement) {
    var tbl = document.createElement('table');

    var roundsNum = matchResult.rounds.length;

    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(""));
    for (var i = 0; i < roundsNum; i++) {
        var round = matchResult.rounds[i];
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(round.moveA));
    }

    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(matchResult.actorA.name));
    for (var i = 0; i < roundsNum; i++) {
        var round = matchResult.rounds[i];
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(round.scoreA));
    }
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(matchResult.scoreA));

    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(matchResult.actorB.name));
    for (var i = 0; i < roundsNum; i++) {
        var round = matchResult.rounds[i];
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(round.scoreB));
    }
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(matchResult.scoreB));

    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(""));
    for (var i = 0; i < roundsNum; i++) {
        var round = matchResult.rounds[i];
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(round.moveB));
    }

    parentElement.appendChild(tbl);
}

function presentTeams() {

    var competitorsElement = document.getElementById("competitorsSection");

    var tbl = document.createElement('table');

	teams.forEach(function (team, i, teams) {
		var tr = tbl.insertRow();
		var td = tr.insertCell();
		var h4TeamName = document.createElement('h3');
		h4TeamName.innerHTML = team.name + ':&nbsp'
		td.appendChild(h4TeamName);
		
		var td = tr.insertCell();
		var names = '';
        team.players.forEach(function (player, i, players) {
            names += player.name + ' &nbsp&nbsp&nbsp '
        });
		
		var teamNames = document.createElement('it');
		teamNames.innerHTML = names;
		td.appendChild(teamNames);

    });
	
    competitorsElement.appendChild(tbl);
}
