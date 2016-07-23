# Dashbutton Network Listener

## Setup & Installation
```
npm install https://github.com/yorhodes/dashbutton
cd dashbutton
npm install
npm start
```

## Configuration
See [sample_config.json](https://github.com/yorhodes/dashbutton/blob/master/sample_config.json) for example formatting.
### Buttons
`config.json` should be populated with a buttons array
```
{
	"buttons": []
}
```
Sample button object:
```
{
	"name": "sample_button_name",
	"id": "da:sh:bu:tt:on:id",
	"action": "samp_action",
  	"slack": {
		"webhook": "url_here",
  		"message": "customize msg here",
	  	"customize": {
  			"channel": "#channel_name",
  			"username": "custom_name",
    			"icon_url": "img_url_here"
		}
  	}
}
```
#### ID
The id key value is the MAC address of the amazon dash button. This can be found by using [Wireshark](https://www.wireshark.org/) to monitor ARP traffic on the network when the button is pressed, or using node-dash-button's [`bin/findButton`](https://github.com/hortinstein/node-dash-button) function.

#### Actions
See the index.js `doAction` structure to see available actions, and add new ones
```
"action": "gong"
```
#### Slack customize
The slack customize object can be ommitted to use the defaults configured on the slack webhook
```
"customize": {
  			"channel": "#channel_name",
  			"username": "custom_name",
    			"icon_url": "img_url_here"
		}
```
