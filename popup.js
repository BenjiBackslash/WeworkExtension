var SYNCANO_INSTANCE_NAME = "water-misty-3516";
SYNCANO_API_KEY = "3019540e5c2a045ad745b4e52741041adeea3a10";
var connection = Syncano({apiKey: SYNCANO_API_KEY, userKey: "1"});

var fav_list = [];

function fill_list() {
	// alert('hello from fill list');
	var ul = document.getElementById("ct");
	for( var i = 0; i < fav_list.length; i++ )
	{ 
		o = fav_list[i];
		if (o.fav == 1) {
			var a = document.createElement('a');
			var linkText = document.createTextNode(o.name);
			a.appendChild(linkText);
			a.title = o.name;
			a.href = o.link;
			var li = document.createElement("li");
			li.appendChild(a);
			ul.appendChild(li);     
		}
	}
}

var success = function(res) {
	// alert('helllo from sucess');
	var i=0;
	for (i=0; i < res.length; i++) {
		fav_list.push({city: res[i].location.city, name: res[i].location.name, fav: res[i].fav, link: res[i].location.link });
	}
	fill_list();
}

var error = function(error) {
}

function load_fav_list() {
	var DataEndpoint = connection.DataEndpoint;
	var list = {instanceName: SYNCANO_INSTANCE_NAME, name: "de_user_locations"};
	var filter = {"user_profile_id":{ "_eq" : 1}};
	DataEndpoint.please().fetchData(list).then(success).catch(error);	
}

document.addEventListener('DOMContentLoaded', load_fav_list);