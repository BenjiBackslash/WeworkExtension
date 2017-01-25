SYNCANO_API_KEY = "3019540e5c2a045ad745b4e52741041adeea3a10";
var connection = Syncano({apiKey: SYNCANO_API_KEY, userKey: "1"});
var SYNCANO_INSTANCE_NAME = "water-misty-3516";
var city = '';
var fav_list = [];

function set_status(button, fav) {
	// console.log('seetting button status ' + fav )
	if (fav == 1) {		
		button.innerHTML = "In your favourites";
	} else {
		button.innerHTML = "add to favourites";
	}
}

function update_local_fav_list(city, name, link, fav ) {
	city = city.toUpperCase();
	name = name.toUpperCase();	
	var i=0;
	for (i=0; i < fav_list.length; i++) { 
		if (fav_list[i].city == city && fav_list[i].name == name) {
			fav_list[i].fav = fav;
			return;
		}							
	}
	fav_list.push({city: city, name: name, fav: fav, link: link });
}


function check_location(city,name) {
	city = city.toUpperCase();
	name = name.toUpperCase();	
	var i=0;
	for (i=0; i < fav_list.length; i++) { 
		if (fav_list[i].city == city && fav_list[i].name == name) {
			return fav_list[i].fav;
		}							
	}
	return 0;
}

function toggle_location(city, name, link, button) {  
	// console.log('toggle_location starts');
	// console.log('city:' + city);
	// console.log('name:' + name);
	var ScriptEndpoint = connection.ScriptEndpoint;

	var query = {instanceName: SYNCANO_INSTANCE_NAME, name: 'toggle_location'};
	var payload = {"payload":{ "user_profile_id": 1, "city": city, "name": name, "link": link }};

	ScriptEndpoint.please().run(query, payload).then(function(res) {
		json_ = JSON.parse(res.result.stdout);
		set_status(button, json_.result_status );
		update_local_fav_list(city, name, link, json_.result_status );
	});	
}

function set_buttons() {
	var x = document.getElementsByClassName("component__buildingCard__1BNLK");
	var i;
	bodyRect = document.body.getBoundingClientRect();
	for (i = 0; i < x.length; i++) {
		nameElem = x[i].getElementsByClassName("title__buildingCard__TKgTF")
		name = nameElem[0].getElementsByTagName('h2')[0].textContent;
		//addressElem = x[i].getElementsByClassName("address__buildingCard__2Qrsi caption")
		//address = addressElem[0].content;
		fav = check_location(city,name);
		link = "";
		linkElem = x[i].getElementsByClassName("SL_norewrite link__buildingCard__1Fa6h");
		if (linkElem.length > 0) {
			link = linkElem[0].href;
		}
		elemRect = x[i].getBoundingClientRect();
		offsetTop = elemRect.top - bodyRect.top;
		offsetLeft = elemRect.left - bodyRect.left;
		var button = document.createElement("Button");	
		set_status(button, fav);
		button.onclick = (function(city,name,link,button) {
			return function() {		
				// console.log('cliecked in button of ' + city + '   ' + name);
				toggle_location(city,name,link, button);
			}
		})(city,name,link,button);
		button.style = "top:" + (elemRect.top + 5) + ";" + "left:" + (elemRect.left + 5) + ";" +" position:absolute;zIndex=9999;"
		x[i].appendChild(button);
	}
}

function extract_city_name() {
	 return document.getElementsByClassName("breadcrumb__breadcrumbs__-PfiP last__breadcrumbs__1Yyfh")[0].getElementsByClassName("SL_norewrite link__breadcrumbs__1Hh6U caption")[0].textContent;
}

var error = function(error) {
  console.log(error);
}

var success = function(res) {
	var i=0;
	for (i=0; i < res.length; i++) {
		fav_list.push({city: res[i].location.city, name: res[i].location.name, fav: res[i].fav, link: res[i].location.link });
	}
	set_buttons();
}

function load_fav_list() {
	var DataEndpoint = connection.DataEndpoint;
	var list = {instanceName: SYNCANO_INSTANCE_NAME, name: "de_user_locations"};
	var filter = {"user_profile_id":{ "_eq" : 1}};
	DataEndpoint.please().fetchData(list).then(success).catch(error);
}


function my_main(evt) {
	city = extract_city_name();
	load_fav_list();
}

my_main(null);