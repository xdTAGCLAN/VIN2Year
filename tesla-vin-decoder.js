// After changes, increment version number after "?" in last line of VIN decoder to pull newest version

var currentVin = "";

document.getElementById("position1").addEventListener("change", pos1);
document.getElementById("position4").addEventListener("change", pos4);
document.getElementById("position5").addEventListener("change", pos5);
document.getElementById("position6").addEventListener("change", pos6);
document.getElementById("position7").addEventListener("change", pos7);
document.getElementById("position8").addEventListener("change", pos8);
document.getElementById("position10").addEventListener("change", pos10);
document.getElementById("position11").addEventListener("change", pos11);
document.getElementById("position12").addEventListener("change", pos12);
document.getElementById("position13").addEventListener("change", pos13);


document.getElementById('paste').onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if (charCode == '13') {
		if (this.value.length > 0) {
			updateFields(this.value.toUpperCase());
			// remove all radio button 'checked'
			for (var radioCounter = 0 ; radioCounter < document.getElementsByName('Examples').length; radioCounter++) {
		 		document.getElementsByName('Examples')[radioCounter].checked=false;
			}
			
		}
    	return false;
    } else if (this.value.length == 17) {
		updateFields(this.value.toUpperCase());
		// remove all radio button 'checked'
		for (var radioCounter = 0 ; radioCounter < document.getElementsByName('Examples').length; radioCounter++) {
			document.getElementsByName('Examples')[radioCounter].checked=false;
		}
    	return false;
    }
}


for (var radioCounter = 0 ; radioCounter < document.getElementsByName('Examples').length; radioCounter++) {
    document.getElementsByName('Examples')[radioCounter].onclick = function() {
		// update fields
		updateFields(this.value.toUpperCase());
		document.getElementById('paste').value = "";
	}
}

updateFields("5YJSA1E62NF016329");	// setup default values, Model S Plaid

// button onclick="vinButton()" class="manualVinButton"
// NOTE: the Wordpress editor will erease the onClick event!!!  Insert and save in text mode.
function vinButton() {
	tempVin = document.getElementById('paste').value;
	if (tempVin.length == 17) {
		updateFields(tempVin.toUpperCase());
		// remove all radio button 'checked'
		for (var radioCounter = 0 ; radioCounter < document.getElementsByName('Examples').length; radioCounter++) {
			document.getElementsByName('Examples')[radioCounter].checked=false;
		}
	} else {
		alert('VIN must have 17 characters');
	}
}


function updateFields(vin) {

	currentVin = vin;
	if (vin.length != 17) {
		alert("The VIN number must be 17 characters long. It is only " + vin.length + " characters.");
	} else {
		var vindTable = document.getElementById('vind');
		var vTable = document.getElementById('results');
		
		while (1) {
			group1 = vin.substr(0,3);
			if ((group1 == "5YJ") || (group1 == "7G2") || (group1 == "SFZ") || 
				(group1 == "LRW") || (group1 == "7SA") || (group1 == "XP7")) {
				document.getElementById('position1').value = group1;
			} else {
				alert("Manufacturer does not appear to be Tesla (first 3 characters).");
				break;
			}
	
			group4 = vin.substr(3,1);
			if ((group4 == "C") || (group4 == "R") || (group4 == "S") || (group4 == "T") || 
				(group4 == "X") || (group4 == "3") || (group4 == "Y")) {
				document.getElementById('position4').value = group4;
			} else {
				alert("Unknown make (position 4).");
				break;
			}
			group5 = vin.substr(4,1);
			if ((group5 == "1") || (group5 == "A") || (group5 == "B") || (group5 == "C") || (group5 == "D") || (group5 == "E") || (group5 == "F") || (group5 == "G") || (group5 == "H")) {
				document.getElementById('position5').value = group5;
			} else {
				alert("Unknown body type (position 5).");
				break;
			}
			group6 = vin.substr(5,1);
			if (((group6 >= "1") && (group6 <= "8")) || ((group6 >= "A") && (group6 <= "E")) || 
				(group6 == "G") || (group6 <= "H")) {
				document.getElementById('position6').value = group6;
			} else {
				alert("Unknown character for position 6.");
				break;
			}
				
			group7 = vin.substr(6,1);
			if ((group7 == "A") || (group7 == "B") || (group7 == "C") ||
				(group7 == "D") || (group7 == "E") || (group7 == "F") || (group7 == "H") ||
				(group7 == "S") || (group7 == "V") || (group7 == "1")) {
				document.getElementById('position7').value = group7;
			} else {
				alert("Unknown character for position 7.");
				break;
			}
			group8 = vin.substr(7,1);
			if ((group8 == "A") || (group8 == "B") || (group8 == "C") ||
				(group8 == "D") || (group8 == "E") || (group8 == "F") ||
				(group8 == "G") || (group8 == "J") || (group8 == "K") || 
				(group8 == "L") || (group8 == "N") || (group8 == "P") ||
				(group8 == "R") || (group8 == "S") ||
				((group8 >= "1") && (group8 <= "6"))) {
				document.getElementById('position8').value = group8;
			} else {
				alert("Unknown character for position 8.");
				break;
			}
			group9 = vin.substr(8,1);
			document.getElementById('position9').innerHTML = group9;
			vTable.rows[7].cells[2].innerHTML = group9;
			group10 = vin.substr(9,1);
			if ( ((group10 >= "A") && (group10 <= "H")) || 
				 ((group10 >= "J") && (group10 <= "N")) || (group10 == "P") ||
				 ((group10 >= "R") && (group10 <= "T")) ||
				 ((group10 >= "V") && (group10 <= "Y")) ||
				 ((group10 >= "6") && (group10 <= "9")) ) {
				document.getElementById('position10').value = group10;
			} else {
				alert("Unknown year character for position 10.");
				break;
			}
			group11 = vin.substr(10,1);
			if ((group11 == "1") || (group11 == "3") || (group11 == "A") ||
				(group11 == "B")|| (group11 == "C")|| (group11 == "F") ||
				(group11 == "N") || (group11 == "P") || (group11 == "R") ||
				(group11 == "S")) {
				document.getElementById('position11').value = group11;
			} else {
				alert("Unknown manufacturing character for position 11.");
				break;
			}
			group12 = vin.substr(11,1);
			document.getElementById('position12').value = group12;
			if (((group12 >= "0") && (group12 <= "9")) ||
				(group12 == "A") || (group12 == "B") || (group12 == "E") ||
				(group12 == "F") || (group12 == "M") || (group12 == "O") ||
				(group12 == "P") || (group12 == "R") || (group12 == "S") ||
				(group12 == "V")) {
			} else {
				alert("Unknown character for position 12.");
				break;
			}
			group13 = vin.substr(12,5).replace(/\D/g, '');
			document.getElementById('position13').value = group13;
			vTable.rows[11].cells[2].innerHTML = group13;
				
			pos1();			
			pos4();			
			pos10();			
			pos12();

			document.getElementById('showVin').value = vin;
			checkChar = VinCheckDigit(vin);
			if (checkChar != tempVin.substr(8,1)) {
				vTable.rows[7].cells[2].innerHTML = tempVin.substr(8,1) + " (should be " + checkChar + ")";
				vTable.rows[7].cells[2].style.color = "#FF0000";
			} else {
				vTable.rows[7].cells[2].innerHTML = tempVin.substr(8,1);
				vTable.rows[7].cells[2].style.color = "#008400";
			}
			break;
		} 
	}
}


function pos1() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position1");
	var row = 1; 
	var year = modelYear();

	switch(pos.options[pos.selectedIndex].text) {
		case "5YJ":
			if (year <= "2021") {	
				vTable.rows[row].cells[2].innerHTML = '5YJ = Tesla, Inc.';
			} else {
				//vTable.rows[row].cells[2].innerHTML = '5YJ = Tesla, Inc., for Model S/3';   // not true?
				vTable.rows[row].cells[2].innerHTML = '5YJ = Tesla, Inc.';
			}
			updateCurrentVin("5YJ", 1);
			break;
		case "LRW":
			vTable.rows[row].cells[2].innerHTML = 'LRW = Tesla, China';
			updateCurrentVin("LRW", 1);
			break;
		case "7G2":
			vTable.rows[row].cells[2].innerHTML = '7G2 = Tesla, Inc., Truck';
			updateCurrentVin("7G2", 1);
			break;
		case "7SA":
			vTable.rows[row].cells[2].innerHTML = '7SA = Tesla, MPV, for Model X/Y';
			updateCurrentVin("7SA", 1);
			break;
		case "SFZ":
			vTable.rows[row].cells[2].innerHTML = 'SFZ = Tesla Motors (Roadsters fully assembed in UK)';
			updateCurrentVin("SFZ", 1);
			break;
		case "XP7":
			vTable.rows[row].cells[2].innerHTML = 'XP7 = Tesla, Berlin';
			updateCurrentVin("XP7", 1);
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
}

function pos4() {
	var vTable = document.getElementById('results');
    var vehicle = ctype();
	var row = 2; 
	pos5();
	pos6();
	pos7();
	pos8();
	pos11();
		
	switch(vehicle) {
		case "C":
			vTable.rows[row].cells[2].innerHTML = 'C = Cybertruck';
			break;
		case "R":
			vTable.rows[row].cells[2].innerHTML = 'R = Roadster';
			break;
		case "S":
			vTable.rows[row].cells[2].innerHTML = 'S = Model S';
			break;
		case "T":
			vTable.rows[row].cells[2].innerHTML = 'T = Tesla Semi';
			break;
		case "X":
			vTable.rows[row].cells[2].innerHTML = 'X = Model X';
			break;
		case "Y":
			vTable.rows[row].cells[2].innerHTML = 'Y = Model Y';
			break;
		case "3":
			vTable.rows[row].cells[2].innerHTML = '3 = Model 3';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
	updateCurrentVin(vehicle, 4);
}
function pos5() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position5");
    var vehicle = ctype();
	var row = 3; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
	
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			vTable.rows[row].cells[2].innerHTML = '1 = Unknown type'; // from Model S 100D 5yjs17e23jf248593
			break;
		case "A":
			if ((vehicle != "R") && (vehicle != "X"))  {
				vTable.rows[row].cells[2].innerHTML = 'A = 5 Door Hatchback LHD (Left-Hand Drive)';
			}
			break;
		case "B":
			if ((vehicle == "C") || (vehicle == "T"))  {
				vTable.rows[row].cells[2].innerHTML = 'B = Day Cab';
			} else if ((vehicle != "R") && (vehicle != "X"))  {
				vTable.rows[row].cells[2].innerHTML = 'B = 5 Door Hatchback RHD (Right-Hand Drive)';
			}
			break;
		case "C":
			if (vehicle == "X") {
				vTable.rows[row].cells[2].innerHTML = 'C = Class E (6001-7000 lbs) GVWR / MPV /5 Door (Left-Hand Drive)';
			}
			break;
		case "D":
			if (vehicle == "X") {
				vTable.rows[row].cells[2].innerHTML = 'D = Class E (6001-7000 lbs) GVWR / MPV /5 Door (Right-Hand Drive)';
			}
			break;
		case "E":
			if ((vehicle == "C") || (vehicle == "T"))  {
			  	vTable.rows[row].cells[2].innerHTML = 'E = Truck, Left Hand Drive';
			} else if (vehicle == "R") {
				vTable.rows[row].cells[2].innerHTML = 'E = Convertible (Roadster)';
			} else 	if (vehicle == "3") {
				vTable.rows[row].cells[2].innerHTML = 'E = Sedan 4 Door (Model 3, Left-Hand Drive)';
			} else {
				vTable.rows[row].cells[2].innerHTML = 'E = Sedan 4 Door (Left-Hand Drive)';
			}
			break;
		case "F":
			if (vehicle == "3") {
				vTable.rows[row].cells[2].innerHTML = 'F = Sedan 4 Door (Model 3, Right-Hand Drive)';
			}
			break;
		case "G":
			if (vehicle == "Y") {
				vTable.rows[row].cells[2].innerHTML = 'G = Class D MPV, 5 Door (Left-Hand Drive)';
			}
			break;
		case "H":
			vTable.rows[row].cells[2].innerHTML = 'H = Class D MPV, 5 Door (Right-Hand Drive)';
			break;
		default:
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 5);
}
function pos6() {
	var vTable = document.getElementById('results');
	if (ctype() == "R") {
		vTable.rows[4].cells[1].innerHTML = 'Region/Drive Position';
		pos6_roadster();
	} else if ((ctype() == "C") || (ctype() == "T")) {
		vTable.rows[4].cells[1].innerHTML = 'Gross Vehicle Weight Rating (GVWR)';
		pos6_truck();		
	} else {
		vTable.rows[4].cells[1].innerHTML = 'Restraint System';
		pos6_restraint();
	}
}

function pos6_roadster() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position6");
	var row = 4; 
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			vTable.rows[row].cells[2].innerHTML = '1 = USA (LHD)';
			break;
		case "2":
			vTable.rows[row].cells[2].innerHTML = '2 = Europe (LHD)';
			break;
		case "3":
			vTable.rows[row].cells[2].innerHTML = '3 = Europe (RHD)';
			break;
		case "6":
			vTable.rows[row].cells[2].innerHTML = '6 = Canada (LHD)';
			break;
		case "8":
			vTable.rows[row].cells[2].innerHTML = '8 = Hong Kong (RHD)';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 6);
}
function pos6_restraint() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position6");
	var year = modelYear();
	var row = 4; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';			
	
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			if (year <= "2013") {	
				vTable.rows[row].cells[2].innerHTML = '1 = Manual Type 2 USA Seat Belts, Dual Front Airbags, Front/Rear Side Airbag, Knee Airbags';
			} else if (year == "2014") {
				vTable.rows[row].cells[2].innerHTML = '1 = Manual Type 2 Seat Belts (Front, Rear*3) With Front Airbags, Side Inflatable Restraints, Knee Airbags (Front), PODS';
			} else if (year >= "2015") {
				vTable.rows[row].cells[2].innerHTML = '1 = Manual Type 2 Seat Belts (Front, Rear*3) With Front Airbags, PODS, Side Inflatable Restraints, Knee Airbags (Front)';
			} 
			break;
		case "2":
			if (year <= "2013") {	
				vTable.rows[row].cells[2].innerHTML = '2 = Manual Type 2 EU Seat Belts, Dual Front Airbags, Front/Rear Side Airbag, Knee Airbags';
			} else if (year == "2014") {
				vTable.rows[row].cells[2].innerHTML = '2 = Manual Type 2 Seat Belts (Front, Rear*3) With Front Airbags, Side Inflatable Restraints, Knee Airbags (Front)';
			}
			break;
		case "3":
			if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = '3 = Manual Type 2 Seat Belts (Front, Rear*2) With Front Airbags, Side Inflatable Restraints, Knee Airbags (FR)';
			}
			break;
		case "4":
			if (year == "2015") {	
				vTable.rows[row].cells[2].innerHTML = '4 = Manual Type 2 Seat Belts (Front, Rear*2) With Front Airbags, Side Inflatable Restraints, Knee Airbags (Front)';
			}
			break;
		case "5":
			if (year == "2015") {	
				vTable.rows[row].cells[2].innerHTML = '5 = Manual Type 2 Seat Belts (Front, Rear*2) With Front Airbags, Side Inflatable Restraints';
			}
			break;
		case "6":
			if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = '6 = Manual Type 2 Seat Belts (Front, Rear*3) With Front Airbags, Side Inflatable Restraints';
			}
			break;
		case "7":
			if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = '7 = Type 2 manual seatbelts (Front, Rear*3) with Front Airbags, Side Inflatable Restraints & Active Hood';
			}
			break;
		case "8":
			if (year >= "2015") {	
				vTable.rows[row].cells[2].innerHTML = '7 = Type 2 manual seatbelts (Front, Rear*2) with Front Airbags, Side Inflatable Restraints & Active Hood';
			}
			break;
		case "A":		
			vTable.rows[row].cells[2].innerHTML = 'A = Manual Type 2 Seat Belts (Front Row, Center Row*3, Third Row*2) With Front Airbags, PODS, Side Inflatable Restraints, Knee Airbags (Front)';
			break;
		case "B":	
			vTable.rows[row].cells[2].innerHTML = 'B = Manual Type 2 Seat Belts (Front Row, Center Row*2, Third Row*2) With Front Airbags, PODS, Side Inflatable Restraints';
		case "C":	
			if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = 'C = Manual Type 2 Seat Belts (Front Row, Center Row*2, Third Row*2) With Front Airbags, PODS, Side Inflatable Restraints';
			}
			break;
		case "D":	
			if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = 'D = Manual Type 2 Seat Belts (Front Row, Center Row*3 With Front Airbags, PODS, Side Inflatable Restraints [5-seat]';
			}
			break;
		default:
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 6);
}


function pos6_truck() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position6");
	var row = 4; 

	switch(pos.options[pos.selectedIndex].text) {
		case "E":
			vTable.rows[row].cells[2].innerHTML = 'E = Class 8, Greater than 33,001 lbs.';
			break;
		case "G":
			vTable.rows[row].cells[2].innerHTML = 'G = Class G, Greater than 8,001 - 9,000 lbs.';
			break;
		case "H":
			vTable.rows[row].cells[2].innerHTML = 'H = Class H, Greater than 9,001 - 10,000 lbs.';
			break;
		default:	
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
}



function pos7() {
	var vTable = document.getElementById('results');
	var year = modelYear();
    var pos = document.getElementById("position7");
	var row = 5;
	if (ctype() == "R") {
		vTable.rows[row].cells[1].innerHTML = 'Restraint System';
		pos7_roadster();
	} else {
		if ((year <= "2013") || ((pos.options[pos.selectedIndex].text >= "A") && (pos.options[pos.selectedIndex].text <= "D")) ) {
			vTable.rows[row].cells[1].innerHTML = 'Charger Type';
		} else {
			vTable.rows[row].cells[1].innerHTML = 'Battery Type';
		}
		pos7_charger();
	}
}

function pos7_roadster() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position7");
	var row = 5; 
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			vTable.rows[row].cells[2].innerHTML = '1 = Type 2 USA Seat Belts, Dual Airbags';
			break;
		case "A":
			vTable.rows[row].cells[2].innerHTML = 'A = Type 2 USA Seat Belts, Dual Airbags';
			break;
		case "B":
			vTable.rows[row].cells[2].innerHTML = 'B = Non-USA';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 7);
}
function pos7_charger() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position7");
	var year = modelYear();
	var row = 5; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';			
	
	switch(pos.options[pos.selectedIndex].text) {
		case "A":
			if (year <= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'A = 10kw Charger';
			}
			break;
		case "B":
			if (year <= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'B = 20kw Charger';
			}
			break;
		case "C":
			if (year <= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'C = 10kw Charger, with DC Fast Charge';
			}
			break;
		case "D":
			if (year <= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'D = 20kw Charger, with DC Fast Charge';
			}
			break;
		case "E":	// 60/70/70D/85/85D/P85D/P90D/Truck
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'E = Electric';
			} else if (year >= "2015") {	
				vTable.rows[row].cells[2].innerHTML = 'E = Lithium-Ion Battery - Electric';
			}
			break;
		case "F":	// China battery
			if (year >= "2019") {	
				vTable.rows[row].cells[2].innerHTML = 'F = Lithium Iron Phosphate Battery';
			}
			break;
		case "H":	// 60/85/85P
			if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'H = Lithium-Ion Battery - High Capacity';
			}
			break;
		case "S":
			if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = 'S = Lithium-Ion Battery - Standard Capacity';
			}
			break;
		case "V":
			if (year >= "2015") {	
				vTable.rows[row].cells[2].innerHTML = 'V = Lithium-Ion Battery - Ultra High Capacity';
			}
			break;
		default:
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 7);
}

function pos8() {
	var vTable = document.getElementById('results');
	var year = modelYear();
	var row = 6;
	if (ctype() == "R") {
		vTable.rows[row].cells[1].innerHTML = 'Motor/Drive Unit';
		pos8_roadster();
	} else if ((ctype() == "T") || (ctype() == "C")) {
		vTable.rows[row].cells[1].innerHTML = 'Motor/Drive Unit/Braking System';
		pos8_truck();
	} else {
		if (year <= "2013") {
			vTable.rows[row].cells[1].innerHTML = 'Motor/Drive Unit and Battery';
		} else {
			vTable.rows[row].cells[1].innerHTML = 'Motor/Drive Unit';
		}
		pos8_charger();
	}
}

function pos8_roadster() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position8");
	var row = 6; 
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			vTable.rows[row].cells[2].innerHTML = '1 = Tesla M6B Motor';
			break;
		case "3":
			vTable.rows[row].cells[2].innerHTML = '3 = Tesla M6S Motor';
			break;
		case "B":
			vTable.rows[row].cells[2].innerHTML = 'B = Tesla 56C';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 8);
}

function pos8_charger() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position8");
	var year = modelYear();
	var row = 6; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';			
	
	switch(pos.options[pos.selectedIndex].text) {
		case "A":
			if (year >= "2017") {	
				vTable.rows[row].cells[2].innerHTML = 'A = Single Motor - Standard Model 3';
			}
			break;
		case "B":
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'B = Dual Motor - Standard Model 3';
			} else if (year >= "2018") {	
				vTable.rows[row].cells[2].innerHTML = 'B = Dual Motor - Standard or Performance Model 3';
			}
			break;
		case "C":
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'C = Dual Motor - Performance Model 3';
			} else if (vehicle == "S") {
				vTable.rows[row].cells[2].innerHTML = 'C = Base A/C Motor, Tier 2 Battery (31-40 kWh)';
			}
			break;
		case "D":
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'D = Single Motor - Standard or Performance Model Y';
			}
			break;
		case "E":
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'E = Dual Motor - Standard Model Y';
			}
			break;
		case "F":
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'F = Dual Motor - Performance Model Y';
			}
			break;
		case "G":
			vTable.rows[row].cells[2].innerHTML = 'G = Base A/C Motor, Tier 4 Battery (51-60 kWh)';
			break;
		case "K":
			// guess - from owner of China Model Y LR in 2021
			if (year >= "2021") {	
				vTable.rows[row].cells[2].innerHTML = 'K = Dual Motor';
			}
			break;
		case "J":
			// guess - from owner of China Model 3 SR+ in 2021 (Lithium-Iron batter?)
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'J = Single Motor';
			}
			break;
		case "L":
			// guess - from owner of China Model 3 Performance in 2021 (Lithium-Iron batter?), also Berlin
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = 'L = Dual Motor Performance';
			}
			break;
		case "N":
			vTable.rows[row].cells[2].innerHTML = 'N = Base A/C Motor, Tier 7 Battery (81-90 kWh)';
			break;
		case "P":
			vTable.rows[row].cells[2].innerHTML = 'P = Performance A/C Motor, Tier 7 Battery (81-90 kWh)';
			break;
		case "R":
			// guess - from owner of China Model 3 LR in 2022
			if (year >= "2021") {	
				vTable.rows[row].cells[2].innerHTML = 'R = Single Motor';
			}
			break;
		case "S":
			// guess - from owner of China Model 3 in 2022
			if (year >= "2021") {	
				vTable.rows[row].cells[2].innerHTML = 'S = Motor';  
			}
			break;
		case "T":
			// Model 3
			if (year >= "2024") {	
				vTable.rows[row].cells[2].innerHTML = 'T = Dual Motor Performance';
			}
			break;
		case "1":
			if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = '1 = Single Motor - Three Phase A/C Induction';
			} else if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = '1 = Single Motor - Three Phase A/C Induction<br /> (Standard or Performance prior to 1-Aug-2015;<br /> Standard only starting 1-Aug-2015)';
			}
			break;
		case "2":
			if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = '2 = Dual Motor - Three Phase A/C Induction';
			} else if (year >= "2014") {	
				vTable.rows[row].cells[2].innerHTML = '2 = Dual Motor - Three Phase A/C Induction<br /> (Standard or Performance prior to 1-Aug-2015;<br /> Standard only starting 1-Aug-2015)';
			}
			break;
		case "3":	// from Austrlian VIN
			if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = '3 = Performance Single Motor - Three Phase A/C Induction';
			} else if (year >= "2015") {	
				vTable.rows[row].cells[2].innerHTML = '3 = Performance Single Motor - Three Phase A/C Induction<br /> (only after 1-Aug-2015)';
			}
			break;
		case "4":	// from Austrlian VIN
			if (year >= "2020") {	
				vTable.rows[row].cells[2].innerHTML = '4 = Performance Dual Motor';
			} else if (year >= "2016") {	
				vTable.rows[row].cells[2].innerHTML = '4 = Performance Dual Motor - Three Phase A/C Induction';
			} else if (year >= "2015") {	
				vTable.rows[row].cells[2].innerHTML = '4 = Performance Dual Motor - Three Phase A/C Induction<br /> (only after 1-Aug-2015)';
			}
			break;
		case "5":	
			if (year >= "2021") {	
				vTable.rows[row].cells[2].innerHTML = '5 = P2 Dual Motor';
			}
			break;
		case "6":	
			if (year >= "2021") {	
				vTable.rows[row].cells[2].innerHTML = '6 = P2 Tri Motor';
			}
			break;
		default:
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 8);
}

function pos8_truck() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position8");
	var row = 6; 
	switch(pos.options[pos.selectedIndex].text) {
		case "B":
			vTable.rows[row].cells[2].innerHTML = 'B = Dual Drive Rear Axle, Air Brakes (Semi)';
			break;
		case "D":
			vTable.rows[row].cells[2].innerHTML = 'D = Dual Motor - Standard (Cybertruck)';
			break;
		case "E":
			vTable.rows[row].cells[2].innerHTML = 'E = Triple Motor - Performance (Cybertruck)';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 8);
}



function pos10() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position10");
	var row = 8; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + modelYear();
	updateCurrentVin(pos.options[pos.selectedIndex].text, 10);
}
function pos11() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position11");
    var vehicle = ctype();
	var row = 9; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
	
	switch(pos.options[pos.selectedIndex].text) {
		case "1":
			vTable.rows[row].cells[2].innerHTML = '1 = Menlo Park, CA, USA';
			break;
		case "3":
			vTable.rows[row].cells[2].innerHTML = '3 = Hethel, UK';
			break;
		case "A":
			vTable.rows[row].cells[2].innerHTML = 'A = Austin, Texas, USA';
			break;
		case "B":
			vTable.rows[row].cells[2].innerHTML = 'B = Berlin, Germany';
			break;
		case "C":
			vTable.rows[row].cells[2].innerHTML = 'C = Shanghai, China';
			break;
		case "F":
			vTable.rows[row].cells[2].innerHTML = 'F = Fremont, CA, USA';
			break;
		case "G":
			vTable.rows[row].cells[2].innerHTML = 'G = Berlin, Germany';
			break;
		case "N":
			vTable.rows[row].cells[2].innerHTML = 'N = Reno, NV, USA';
			break;
		case "P":
			vTable.rows[row].cells[2].innerHTML = 'P = Palo Alto, CA, USA';
			break;
		case "R":
			vTable.rows[row].cells[2].innerHTML = 'R = Research';
			break;
		default:
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 11);
}
function pos12() {
	var vTable = document.getElementById('results');
    var pos = document.getElementById("position12");
    var vehicle = ctype();
	var row = 10; 
	vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text + ' = ' + 'Unknown';
	if (pos.options[pos.selectedIndex].text <= "9") {
		vTable.rows[row].cells[1].innerHTML = 'Serial #, 100,000s digit';
	} else {
		vTable.rows[row].cells[1].innerHTML = 'Build Phase Code';
	}
		
	
	switch(pos.options[pos.selectedIndex].text) {
		case "A":
			vTable.rows[row].cells[2].innerHTML = 'A = Alpha Prototype';
			break;
		case "B":
			vTable.rows[row].cells[2].innerHTML = 'B = Beta Prototype';
			break;
		case "E":
			vTable.rows[row].cells[2].innerHTML = 'E = Evaluation Prototype, Roadster';
			break;
		case "F":
			vTable.rows[row].cells[2].innerHTML = 'F = Founder Series Vehicle';
			break;
		case "M":
			vTable.rows[row].cells[2].innerHTML = 'M = Mule, Roadster, early prototype';
			break;
		case "P":
			vTable.rows[row].cells[2].innerHTML = 'P = Production Vehicle';
			break;
		case "R":
			vTable.rows[row].cells[2].innerHTML = 'R = Release Candidate Vehicle';
			break;
		case "S":
			vTable.rows[row].cells[2].innerHTML = 'S = Signature Series Vehicle';
			break;
		case "V":
			vTable.rows[row].cells[2].innerHTML = 'V = Validation Prototype, Roadster';
			break;
		default:
			vTable.rows[row].cells[2].innerHTML = pos.options[pos.selectedIndex].text;
			break;
	}
	updateCurrentVin(pos.options[pos.selectedIndex].text, 12);
}

function pos13() {
	var vTable = document.getElementById('results');
	var row = 11; 
		
	group13 = document.getElementById('position13').value.replace(/\D/g, '');
	vTable.rows[row].cells[2].innerHTML = group13;
	updateCurrentVin(group13, 13);
}


function modelYear() {
    var pos10 = document.getElementById("position10");
	var code = "0";
	try {
		code = pos10.options[pos10.selectedIndex].text;
	} catch (exception) {
		code = "0";
	}
	switch(code) {
		case "6":
			return "2006";
		case "7":
			return "2007";	
		case "8":
			return "2008";	
		case "9":
			return "2009";	
		case "A":
			return "2010";	
		case "B":
			return "2011";	
		case "C":
			return "2012";	
		case "D":
			return "2013";	
		case "E":
			return "2014";	
		case "F":
			return "2015";	
		case "G":
			return "2016";	
		case "H":
			return "2017";	
		case "J":
			return "2018";	
		case "K":
			return "2019";	
		case "L":
			return "2020";	
		case "M":
			return "2021";	
		case "N":
			return "2022";	
		case "P":
			return "2023";	
		case "R":
			return "2024";	
		case "S":
			return "2025";	
		case "T":
			return "2026";	
		case "V":
			return "2027";	
		case "W":
			return "2028";	
		case "X":
			return "2029";	
		case "Y":
			return "2030";	
		default:
			return "Unknown";	
	}
}

// car type "R", "S", etc.
function ctype() {
    var pos4 = document.getElementById("position4");
	var type = pos4.options[pos4.selectedIndex].text
	return (pos4.options[pos4.selectedIndex].text);
}



function VinCheckDigit(zxcip){
	
	var zxcNAry = new Array(['A',1],['B',2],['C',3],['D',4],['E',5],['F',6],['G',7],['H',8],['J',1],['K',2],['L',3],['M',4],['N',5],['P',7],['R',9],['S',2],['T',3],['U',4],['V',5],['W',6],['X',7],['Y',8],['Z',9]);
	
	var zxcWAry=new Array(8,7,6,5,4,3,2,10,9,8,7,6,5,4,3,2);

	var zxcipv = zxcip.toUpperCase();
	zxcip=zxcipv;
	var zxct = true;
	if (zxcipv.match(/I|O|Q/)){
		alert('Letters I, O, or Q are not valid!');
		zxct=false;
	}
	if (zxcipv.length != 17){
		alert('VIN must have 17 characters');
		zxct=false;
	}
	if (!zxct){ return "?"; }

	zxcip1=zxcipv.substring(0,8);
	zxcip2=zxcipv.substring(9,17);
	zxcip3=zxcip1+zxcip2;		
	zxcip4='';
	for (zxc0=0; zxc0 < zxcip3.length; zxc0++){
		zxct = zxcip3.charAt(zxc0);
		for (zxc1=0; zxc1 < zxcNAry.length; zxc1++){
			if (zxct == zxcNAry[zxc1][0]){
				zxct = zxcNAry[zxc1][1];
				break;
			}
		}
		zxcip4 += zxct;
	}
	zxct = 0;
	test3 = 0;
	for (zxc2=0; zxc2 < zxcWAry.length; zxc2++){
		test1 = zxcip4.charAt(zxc2);
		test2 = zxcWAry[zxc2]
		test3 = test1 * test2;			
		zxct += zxcip4.charAt(zxc2)*zxcWAry[zxc2];
	}
	zxct = zxct%11;
	if (zxct == 10) { 
	 	zxct = 'X'; 
	}
	return zxct;
	
	//if (zxct!=zxcip.charAt(8)){
	//alert('InCorrect VIN Number');
	//}
}

// replace the changed characters with str at position pos
function updateCurrentVin(str, posRaw) {
	var strSize = str.length;
	var pos = posRaw - 1;
	if (currentVin.length == 17) {
		if (pos == 0) {
			tempVin = str + currentVin.substring(strSize, currentVin.length);
		} else {
			tempVin = currentVin.substring(0, pos) + str;
			if (pos + strSize < 17) {
				tempVin += currentVin.substring(pos + strSize, currentVin.length);
			}
		}
		currentVin = tempVin;
		//document.getElementById('showVin').value = currentVin;
		showVin.innerHTML = currentVin;
		checkChar = VinCheckDigit(tempVin);
		var vTable = document.getElementById('results');
		if (checkChar != tempVin.substr(8,1)) {
			vTable.rows[7].cells[2].innerHTML = tempVin.substr(8,1) + " (should be " + checkChar + ")";
			vTable.rows[7].cells[2].style.color = "#FF0000";
		} else {
			vTable.rows[7].cells[2].innerHTML = tempVin.substr(8,1);
			vTable.rows[7].cells[2].style.color = "#008400";
		}
		for (var radioCounter = 0 ; radioCounter < document.getElementsByName('Examples').length; radioCounter++) {
			if (document.getElementsByName('Examples')[radioCounter].value == currentVin) {
				document.getElementsByName('Examples')[radioCounter].checked=true;
			} else {
				document.getElementsByName('Examples')[radioCounter].checked=false;
			}
		}
		
	} else {
		document.getElementById('showVin').value = "";
	}
	
	
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}  
