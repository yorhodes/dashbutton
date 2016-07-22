#! /usr/bin/env node
console.log('\033c');
console.log("-=Starting node server=-");

console.log("fetching requirements...");
var config = require('./config.json'),
	dash_button = require('node-dash-button'),
	//_ = require('lodash'),
	request = require('request');

config.buttons.forEach(function(button){
	var dash = dash_button(button.id, button.ifn, 60000);
	dash.on("detected", 
		//_.debounce(
		function () {
			console.log("press detected ", buttonInfo(button));
			doAction[button.action](button);	
		}
		//, 50000, true)
	);
	console.log("button created ", buttonInfo(button));
});

function buttonInfo(button) {
	return "id:" + button.id + ", name: " + button.name + ", network: " + button.ifn;
}

var doAction = {
	gong: function(button){
		logAction("GONG", buttonInfo(button));
		var slack = button.slack;
		
		var body = {
			text: slack.message
		};
		if ('customize' in slack) {
			body['username'] = slack.customize.username;
			body['channel'] = slack.customize.channel;
			body['attachments'] = slack.customize.attachments;
		}

		var options = {
			url: slack.webhook,
			json: body
		};

		doAction["post"](options);
	},
	post: function(options){
		logAction("POST", JSON.stringify(options));
		request.post(options, function(err, res){
			//console.log(err, res);
		});  
	},
	get: function(url){
		logAction("GET", url);
		request.get(url, function(er, response){
			//console.log(er, response);
		});
	}
};

function logAction(type, src) {
	console.log("\n", type, "action triggered by", src, "\n@", Date.now()/1000);
}
