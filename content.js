var Syncano = require('syncano');
// Create a connection with a user key
var connection = Syncano({apiKey: "a1e68ba6dff4ada950ff8883320282098a80fa81", userKey: "1"});

var x = document.getElementsByClassName("component__buildingCard__1BNLK");
var i;
bodyRect = document.body.getBoundingClientRect();

for (i = 0; i < x.length; i++) {
	//x[i].style.backgroundColor = "red";
	elemRect = x[i].getBoundingClientRect();
	offsetTop   = elemRect.top - bodyRect.top;
	offsetLeft = elemRect.left - bodyRect.left;
	var button = document.createElement("Button");
	button.innerHTML = "Add to favourites";
	button.style = "top:" + elemRect.top + ";" + "left:" + elemRect.left + ";" +" position:absolute;zIndex=9999;"
	x[i].appendChild(button);
}

//document.body.style.background = 'red';

//alert("wework");
