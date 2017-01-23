//var Syncano = require('syncano');
// Create a connection with a user key
//var connection = Syncano({apiKey: "a1e68ba6dff4ada950ff8883320282098a80fa81", userKey: "1"});

function check_location_in_local_file(name) {
	//fav_location =  eval("fav_location.json");
	return 1;
}

function toggle_location_in_local_file(name) {
	return 1;
}


var x = document.getElementsByClassName("component__buildingCard__1BNLK");
var i;
bodyRect = document.body.getBoundingClientRect();

for (i = 0; i < x.length; i++) {
	//x[i].style.backgroundColor = "red";
	
	
	nameElem = x[i].getElementsByClassName("title__buildingCard__TKgTF")
	name = nameElem[0].content;
	
	//addressElem = x[i].getElementsByClassName("address__buildingCard__2Qrsi caption")
	//address = addressElem[0].content;
	
	fav = check_location_in_local_file(name);
	
	
	elemRect = x[i].getBoundingClientRect();
	offsetTop   = elemRect.top - bodyRect.top;
	offsetLeft = elemRect.left - bodyRect.left;
	var button = document.createElement("Button");	
	if (fav == 1) {		
		button.innerHTML = "In your favourites";
		
	} else {
		button.innerHTML = "add to favourites";
	}
	button.onclick = function() {
		
	}
		
	button.style = "top:" + elemRect.top + ";" + "left:" + elemRect.left + ";" +" position:absolute;zIndex=9999;"
	x[i].appendChild(button);
}



//document.body.style.background = 'red';

//alert("wework");
