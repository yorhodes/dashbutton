#! /usr/bin/env node
console.log('\033c');
console.log("-=Starting node server=-");

console.log("fetching requirements...");
var config = require('./config.json'),
	dash_button = require('node-dash-button'),
	request = require('request');

config.buttons.forEach(function(button){
	var dash = dash_button(button.id, button.ifn);
	dash.on("detected", function () {
		console.log("press detected ", buttonInfo(button));
		doAction[button.action](button);	
	});
	console.log("button created ", buttonInfo(button));
});

function buttonInfo(button) {
	return "id:" + button.id + ", name: " + button.name + ", network: " + button.ifn;
}

var doAction = {
	gong: function(button){
		console.log("GONG action triggered ", buttonInfo(button));
		var slack = button.slack;
		
		var body = {
			text: slack.message
		};
		if ('customize' in slack) {
			body['username'] = slack.customize.username;
			body['channel'] = slack.customize.channel;
		}

		var options = {
			url: slack.webhook,
			json: body
		};

		doAction["post"](options);
	},
	post: function(options){
		console.log("POST action triggered with", JSON.stringify(options));
		/*request.post(options, function(err, res){
			console.log(err, res);
		});*/  
	},
	get: function(url){
		console.log("GET action triggered @", url);
		request.get(url, function(er, response){
			console.log(er, response);
		});
	}
};
