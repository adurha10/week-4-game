// Empty Object - will be used to create a copy of chosen fighter to use instead of the original object
var fighter = {};
// Empty Object - Used for the same purpose as "fighter" but with the opponent
var defender = {};
// Used to check if user selected an opponent to battle
var noDefender = true;
// Tracker to keep up with round numbers to display which round the user won so far
var round = 1;
// Tracker to keep up with how many opponents remain if there are 0 then the user wins if he/she wins the fight
var opponentsRemaining = 0;
// Array of all characters and their information - Code should be funtional by adding more objects here to increase the amount of characters (UNTESTED!!)
var characterObjects = [
	mysteryKnight = { 
		name: "mysteryKnight",
		hp: 100,
		atk: 7,
		ctAtk: 15,
		location: "characters",
		imgSrc: "assets/images/laughing_tree.png",
		tooltip: "The Knight of the Laughing Tree was a mystery knight who fought at the tourney at Harrenhal in 281 AC. He defended the honor of a crannogman by challenging and defeating three knights whose squires had bullied the crannogman, demanding that they chastise the squires in order to ransom back their horses and armor. The Knight of the Laughing Tree is so-called because of the blazon on his shield, a smiling heart tree. His true identity remains unknown."
	},
	brandon = {
		name: "brandon",
		hp: 100,
		atk: 7,
		ctAtk: 10,
		location: "characters",
		imgSrc: "assets/images/stark.png",
		tooltip: "Brandon Stark was the oldest son of Lord Rickard Stark and Lady Lyarra Stark and the heir to Winterfell prior to Robert's Rebellion. His younger siblings were Eddard, Lyanna, and Benjen."
	},
	rhaegar = {
		name: "rhaegar",
		hp: 100,
		atk: 25,
		ctAtk: 25,
		location: "characters",
		imgSrc: "assets/images/targaryen.png",
		tooltip: "Prince Rhaegar Targaryen was the eldest son of King Aerys II Targaryen and his sister-wife, Queen Rhaella. As heir-apparent, he was the Prince of Dragonstone and crown prince for the Iron Throne. Rhaegar was popular with the smallfolk during his lifetime, but he died in Robert's Rebellion which was triggered in part by his naming of Lyanna Stark as 'Queen of Love and Beauty' after he won the Tourney at Harrenhal. Lyanna was betrothed to Robert Baratheon at the time. Rhaegar was slain in single combat by Robert Baratheon at the ruby ford during the Battle of the Trident."
	},
	barisstan = {
		name: "barisstan",
		hp: 100,
		atk: 12,
		ctAtk: 15,
		location: "characters",
		imgSrc: "assets/images/selmy.png",
		tooltip: "Ser Barristan Selmy, also called Barristan the Bold, is a knight from House Selmy and the Lord Commander of the Kingsguard of Robert I Baratheon. A celebrated hero, he has served in the Kingsguard since a time when these knights were still considered to be the greatest of the Seven Kingdoms."
	}];

// Event handler for clicks on characters	
function clickHandler(){
		// Checks to see if the character is in the starting row
		if (characterObjects[$(this).attr("id")].location === "characters"){
			// Sets opponents remaining to length of character array
			opponentsRemaining = characterObjects.length - 1;
			// Sets 'fighter' object equal to clicked character
			fighter = characterObjects[$(this).attr("id")];
			// Changes chosen fighter's location to "chosen-one"
			characterObjects[$(this).attr("id")].location = "chosen-one"
			// Sets all other character's location to "opponents"
			for (var j = 0; j < characterObjects.length; j++) {
				if (characterObjects[j].location === "characters"){
				 characterObjects[j].location = "opponents";
		  		} 
			}
			// Updates "instructions" display
			$("#instructions").text("Now choose who you will attack");
		} 
		// Checks to see if click was on opponent and user isn't in a fight already
		if (characterObjects[$(this).attr("id")].location === "opponents" && noDefender === true){
			// Sets 'defender' object equal to clicked charcter
			defender = characterObjects[$(this).attr("id")];
			// Sets tracker to indicate we are currently in a fight
			noDefender = false;
			// Changes chosen opponent's location to "defender"
			characterObjects[$(this).attr("id")].location = "defender";
			// Finds the chosen champion and moves their location to 'fighter'
			for (var j = 0; j < characterObjects.length; j++) {
				if (characterObjects[j].location === "chosen-one"){
				 characterObjects[j].location = "fighter";
		  		} 
			}
			// Updates 'instructions' display
			$("#instructions").text("Click 'Fight' to battle your opponent. Good luck!");
		}
		// Refreshes screen with character's new locations
		ConstructButtons();
}

// Function for creating character buttons and placing them in the appropriate location
function ConstructButtons(){
	// Clears screen before beginning
	$("#charactersRow").empty();
	$("#chosen-oneRow").empty();
	$("#opponentsRow").empty();
	$("#fighterRow").empty();
	$("#defenderRow").empty();
	// Creates a new <div> for each character object
	for (var i = 0; i < characterObjects.length ; i++) {
		var characterButton = $("<div>");
		// Assigns classes to display properly 
		characterButton.addClass("character-button");
		characterButton.addClass("col-xs-3");
		// Assigns class to use as location handler
		characterButton.addClass(characterObjects[i].location);
		// Assigns id to use when passing information from DOM to JS Objects
		characterButton.attr("id", i);

		// Assigns border classes based on location
		if (characterObjects[i].location === "chosen-one" || characterObjects[i].location === "fighter"){
			characterButton.addClass("friend");
		}
		if (characterObjects[i].location === "opponents" || characterObjects[i].location === "defender"){
			characterButton.addClass("foe");
		}
		if (characterObjects[i].location === "characters"){
			characterButton.prop("title", characterObjects[i].tooltip);
		}

		// Assigns click handler function
		characterButton.on("click", clickHandler);

		// Assigns img file used to display
		characterButton.html("<img class = 'img-responsive character-img' src = '" + characterObjects[i].imgSrc +"'>");

		// Appends everything to the DOM
		$("#" + characterObjects[i].location + "Row").append(characterButton);
	}

	// Checks to make sure there is currently a defender 
	if (noDefender === false){
		// Creates fighter and defender health bar
	 	$(".fighter").append("<span id='myProgress'><div id='myBar'></div></span>");
	 	$(".defender").append("<span id='theirProgress'><div id='theirBar'></div></span>");
	 	
	 	// Sets the width of the health bar to current hp
	 	var fighterBar = document.getElementById("myBar");
		fighterBar.style.width = fighter.hp + "%";
		var defenderBar = document.getElementById("theirBar");
		defenderBar.style.width = defender.hp + "%";
	}
}

// Event handler for clicks on the 'fight' button
$("#fight-button").on("click", function(){

	// Checks to make sure user has chosen a fighter and defender
	if(noDefender === false){
	
		// Generate random hit power based on character's current attack or counter attack values
		var fighterHit = Math.floor(Math.random() * fighter.atk);
		var defenderHit = Math.floor(Math.random() * defender.ctAtk);
		
		// Adjusts hp of fighter and defender based on random hit power
		fighter.hp = fighter.hp - defenderHit;
		defender.hp =  defender.hp - fighterHit;

		// Increases fighter's attack power
		fighter.atk = fighter.atk * 1.5;

		// Sets a cap on fighter's attack power
		if (fighter.atk >= 75){
			fighter.atk = 75;
		}

	 	// Sets the width of the health bar to current hp
		var fighterBar = document.getElementById("myBar");
		fighterBar.style.width = fighter.hp + "%";
		var defenderBar = document.getElementById("theirBar");
		defenderBar.style.width = defender.hp + "%";

		// Checks to see if the fighter is still alive
		if (fighter.hp <= 0){
			// If the fighter is dead reset all objects so location is "characters" -- Reset all hp values -- Reset round counter and defender check
			for (var k = 0; k < characterObjects.length; k++) {
				characterObjects[k].location = "characters";
				characterObjects[k].hp = 100;
			}
			noDefender = true;
			round = 1;

			// Updates "instructions" display
			$("#instructions").text("Game Over!! Click a champion to begin again.")
			
		// Check to see if the defender died
		} else if (defender.hp <= 0){
			// If the defender died, reset defender checker, deduct one character from the opponent counter
			noDefender = true;
			opponentsRemaining--;

			// Sets value of "index" to the original object's index number in the CharacterObjects array
			var index = $(".defender").attr("id");

			// Sets location to "dead" so item will not be displayed
			characterObjects[index].location = "dead";

			// Removes "defender" class so item will not be displayed
			$(".defender").removeClass("defender");

			// Checks for other opponents left to fight
			if (opponentsRemaining > 0){
				// When oppenents remain -- update 'instructions' display and add to round counter
				$("#instructions").text("You won round " + round + ". Click your next opponent.");
				round++;
			} else {
				// When all opponents are dead -- congratulate user -- initiate nerd joke
				$("#instructions").text("You won the tourney! You may now name your 'Queen of Love and Beauty' --TRY NOT TO START A WAR!-- Click a new champion if you want to play again.");
				for (var k = 0; k < characterObjects.length; k++) {
				characterObjects[k].location = "characters";
				characterObjects[k].hp = 100;
				}
				noDefender = true;
				round = 1;
			}
		}

		// Refreshes screen
		ConstructButtons();

	}
});

// Initialize the screen to start
ConstructButtons();
