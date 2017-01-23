//var Syncano = require('syncano');
// Create a connection with a user key
SYNCANO_API_KEY = "3019540e5c2a045ad745b4e52741041adeea3a10";
var connection = Syncano({apiKey: SYNCANO_API_KEY, userKey: "1"});

function set_status(button, fav) {
	console.log('seetting button status ' + fav )
	if (fav == 1) {		
		button.innerHTML = "In your favourites";
	} else {
		button.innerHTML = "add to favourites";
	}
}


function check_location(city,name) {
	city = city.toUpperCase();
	name = name.toUpperCase();	
	// console.log('checking ' + city + ', ' + name)
	var i=0;
	for (i=0; i < fav_list.length; i++) { 
		// console.log('fav list[' + i + ']' + ': ' + fav_list[i])
		// console.log(fav_list[i].city)
		// console.log(fav_list[i].name)
		// console.log(fav_list[i].fav)
		if (fav_list[i].city == city && fav_list[i].name == name) {
			// console.log('match');
			return fav_list[i].fav;
		}							
	}
	return 0;
}

var toggle_callback = function(trace) {
	console.log(trace);
}

function toggle_location(city, name, button) {  
	console.log('toggle_location starts');
	console.log('city:' + city);
	console.log('name:' + name);
	var ScriptEndpoint = connection.ScriptEndpoint;

	var query = {instanceName: SYNCANO_INSTANCE_NAME, name: 'toggle_location'};
	var payload = {"payload":{ "user_profile_id": 1, "city": city, "name": name}};

	ScriptEndpoint.please().run(query, payload).then(function(res) {
		console.log(res);
		
		console.log(res.result.stdout);
		json_ = JSON.parse(res.result.stdout);
		console.log(json_);
		console.log(json_.result_status );
		set_status(button, json_.result_status );
	}
	);
	
}

function extract_city_name() {
		return "New York";
}

function get_fav_file_name() {
	return "fav_list.json";
}


function create_fav_file() {
	
}

// function readTextFile(file)
// {
    // var rawFile = new XMLHttpRequest();
    // rawFile.open("GET", file, false);
    // rawFile.onreadystatechange = function ()
    // {
        // if(rawFile.readyState === 4)
        // {
            // if(rawFile.status === 200 || rawFile.status == 0)
            // {
                // var allText = rawFile.responseText;
                // fav_list = JSON.parse(allText);
            // }
        // }
    // }
    // rawFile.send(null);
// }
var SYNCANO_INSTANCE_NAME = "water-misty-3516";


var error = function(error) {
  console.log(error);
}

var fav_list = [];

var success = function(res) {
	//console.log(res);
	// console.log(res[0].location);
	var i=0;
	for (i=0; i < res.length; i++) {
		fav_list.push({city: res[i].location.city, name: res[i].location.name, fav: res[i].fav });
	}
	// console.log(fav_list.length);
	set_buttons();
	
	
}

function load_fav_list() {
	//readTextFile(get_fav_file_name());
	// var DataObject = connection.DataObject;
	var DataEndpoint = connection.DataEndpoint;

	var list = {instanceName: SYNCANO_INSTANCE_NAME, name: "de_user_locations"};
	var filter = {"user_profile_id":{ "_eq" : 1}};

	DataEndpoint.please().fetchData(list).then(success).catch(error);
    
	
	
	
}



load_fav_list();


var city = extract_city_name();

function set_buttons() {
	var x = document.getElementsByClassName("component__buildingCard__1BNLK");
	var i;
	bodyRect = document.body.getBoundingClientRect();

	for (i = 0; i < x.length; i++) {
		//x[i].style.backgroundColor = "red";
		
		
		nameElem = x[i].getElementsByClassName("title__buildingCard__TKgTF")
		// console.log(nameElem[0]);
		// console.log(nameElem[0].getElementsByTagName('h2'));
		// console.log(nameElem[0].getElementsByTagName('h2')[0]);
		
		name = nameElem[0].getElementsByTagName('h2')[0].textContent;
		// console.log(name);
		
		//addressElem = x[i].getElementsByClassName("address__buildingCard__2Qrsi caption")
		//address = addressElem[0].content;
		
		// console.log('checking location for' + city + ',' + name)
		fav = check_location(city,name);
		
		
		elemRect = x[i].getBoundingClientRect();
		offsetTop   = elemRect.top - bodyRect.top;
		offsetLeft = elemRect.left - bodyRect.left;
		var button = document.createElement("Button");	
		set_status(button, fav);
		button.onclick = (function(city,name,button) {
			return function() {		
				console.log('cliecked in button of ' + city + '   ' + name);
				toggle_location(city,name,button);
			}
		})(city,name,button);
		
			
		button.style = "top:" + elemRect.top + ";" + "left:" + elemRect.left + ";" +" position:absolute;zIndex=9999;"
		x[i].appendChild(button);
	}
}



//document.body.style.background = 'red';

//alert("wework");
