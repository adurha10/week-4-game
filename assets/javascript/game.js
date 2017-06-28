var clickedObj = [];
var fighter = {};
var defender = {};
var noDefender = true;
var round = 1;
var opponentsRemaining = 0;
var characterObjects = [
	mysteryKnight = { 
		name: "mysteryKnight",
		hp: 100,
		atk: 7,
		ctAtk: 15,
		location: "characters",
		imgSrc: "assets/images/laughing_tree.png"
	},
	brandon = {
		name: "brandon",
		hp: 100,
		atk: 7,
		ctAtk: 10,
		location: "characters",
		imgSrc: "assets/images/stark.png"
	},
	rhaegar = {
		name: "rhaegar",
		hp: 100,
		atk: 25,
		ctAtk: 25,
		location: "characters",
		imgSrc: "assets/images/targaryen.png"
	},
	barisstan = {
		name: "barisstan",
		hp: 100,
		atk: 12,
		ctAtk: 15,
		location: "characters",
		imgSrc: "assets/images/selmy.png"
	}];
function clickHandler(){
		if (characterObjects[$(this).attr("id")].location === "characters"){
			opponentsRemaining = characterObjects.length - 1;
			fighter = characterObjects[$(this).attr("id")];
			characterObjects[$(this).attr("id")].location = "chosen-one"
			for (var j = 0; j < characterObjects.length; j++) {
				if (characterObjects[j].location === "characters"){
				 characterObjects[j].location = "opponents";
		  		} 
			}
			$("#instructions").text("Now choose who you will attack");
		} 
		if (characterObjects[$(this).attr("id")].location === "opponents" && noDefender === true){
			defender = characterObjects[$(this).attr("id")];
			noDefender = false;
			characterObjects[$(this).attr("id")].location = "defender"
			for (var j = 0; j < characterObjects.length; j++) {
				if (characterObjects[j].location === "chosen-one"){
				 characterObjects[j].location = "fighter";
		  		} 
			}
			$("#instructions").text("Click 'Fight' to battle your opponent. Good luck!");
		}
		ConstructButtons();
}
function ConstructButtons(){
	$("#charactersRow").empty();
	$("#chosen-oneRow").empty();
	$("#opponentsRow").empty();
	$("#fighterRow").empty();
	$("#defenderRow").empty()
	for (var i = 0; i < characterObjects.length ; i++) {
		var characterButton = $("<div>"); 
		characterButton.addClass("character-button");
		characterButton.addClass("col-xs-3");
		characterButton.addClass(characterObjects[i].location);
		characterButton.attr("id", i);
		if (characterObjects[i].location === "chosen-one" || characterObjects[i].location === "fighter"){
			characterButton.addClass("friend");
		}
		if (characterObjects[i].location === "opponents" || characterObjects[i].location === "defender"){
			characterButton.addClass("foe");
		}
		characterButton.on("click", clickHandler );
		characterButton.html("<img class = 'img-responsive character-img' src = '" + characterObjects[i].imgSrc +"'>");
		$("#" + characterObjects[i].location + "Row").append(characterButton);
	}
	if (noDefender === false){
	 	$(".fighter").append("<span id='myProgress'><div id='myBar'></div></span>");
	 	$(".defender").append("<span id='theirProgress'><div id='theirBar'></div></span>");
	 	var fighterBar = document.getElementById("myBar");
		fighterBar.style.width = fighter.hp + "%";

		var defenderBar = document.getElementById("theirBar");
		defenderBar.style.width = defender.hp + "%";
	}
}

$("#fight-button").on("click", function(){

	var fighterHit = Math.floor(Math.random() * fighter.atk);
	console.log(fighterHit);
	var defenderHit = Math.floor(Math.random() * defender.ctAtk);
	console.log(defenderHit);
	if(noDefender === false){
		fighter.hp = fighter.hp - defenderHit;
		defender.hp =  defender.hp - fighterHit;

		fighter.atk = fighter.atk * 1.5;
		if (fighter.atk >= 75){
			fighter.atk = 75;
		}

		var fighterBar = document.getElementById("myBar");
		fighterBar.style.width = fighter.hp + "%";

		var defenderBar = document.getElementById("theirBar");
		defenderBar.style.width = defender.hp + "%";

		if (fighter.hp <= 0){

			for (var k = 0; k < characterObjects.length; k++) {
				characterObjects[k].location = "characters";
				characterObjects[k].hp = 100;
			}
			noDefender = true;
			round = 1;
			ConstructButtons();
			$("#instructions").text("Game Over!! Click a champion to begin again.")
		} else if (defender.hp <= 0){
			noDefender = true;
			opponentsRemaining--;
			var index = $(".defender").attr("id");
			characterObjects[index].location = "dead";
			$(".defender").removeClass("defender");
			ConstructButtons();
			if (opponentsRemaining > 0){
				$("#instructions").text("You won round " + round + ". Click your next opponent.");
				round++;
			} else {
				$("#instructions").text("You won the tourney! You may now name your 'Queen of Love and Beauty' --TRY NOT TO START A WAR!--");
				round = 0;
			}
		}

	}
});

ConstructButtons();
