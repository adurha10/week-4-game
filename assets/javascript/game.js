//Declare global variables and character objects

//Character objects - Name, hP, atk, ctAtk, location
var characterObjects = [
	mysteryKnight = { 
		name: "Knight of the Laughing Tree",
		hP: 100,
		atk: 9,
		ctAtk: 15,
		location: "characters",
		imgSrc: "assets/images/laughing_tree.png"
	},
	brandon = {
		name: "Brandon Stark",
		hp: 100,
		atk: 9,
		ctAtk: 9,
		location: "characters",
		imgSrc: "assets/images/stark.jpg"
	},
	rhaegar = {
		name: "Rhaegar Targaryen",
		hp: 150,
		atk: 16,
		ctAtk: 11,
		location: "characters",
		imgSrc: "assets/images/targaryen.png"
	},
	barisstan = {
		name: "Barisstan Selmy",
		hp: 125,
		atk: 10,
		ctAtk: 9,
		location: "characters",
		imgSrc: "assets/images/selmy.png"
}];

function populateRow(rowName){
	for (var i = 0; i < characterObjects.length ; i++) {
		if (rowName === characterObjects[i].location){
			var characterButton = $("<div>"); 
			characterButton.html("<img src = '" + characterObjects[i].imgSrc +"'>")
			$("#characters").append(characterButton);
		}
	}
}
populateRow("characters");
	//Choose character - Move everyone - click event 
// $("characters").click(function(){
// 	this.location = "chosen-one";
// 	for (var i = 0; i < 4; i++) {
// 		4};

//Choose opponent - Move everyone - click event

//Attack - Generate random numbers and calculate HP - Check for death and move if needed - click event on "fight-button"

//Game Over - Reset button to start over