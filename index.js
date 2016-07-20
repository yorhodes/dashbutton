#! /usr/bin/env node

var config = require('./config'),
	dash_button = require('node-dash-button'),
	request = require('request');

config.buttons.forEach(function(button){
	if (button.name == "sample_button_name")
		continue;

	let dash = dash_button(button.id);
	dash.on("detected", function () {
		doAction[button.action](button);
	});
});

var doAction = {
	gong: function(button){
		let slack = button.slack;
		
		let body = {
			text: slack.message
		};
		if (slack_obj.customize) {
			body['username'] = slack.customize.username;
			body['channel'] = slack.customize.channel;
		}

		let options = {
			url: slack_obj.webhook,
			json: body
		};

		doAction["post"](options);
	},
	post: function(options){
		request.post(options, function(err, res){
			console.log(err, res);
		});  
	},
	get: function(url){
		request.get(url, function(er, response){
			console.log(er, response);
		});
	}
};
