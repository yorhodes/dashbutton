# Dashbutton Network Listener

## Setup & Installation
```
npm install <github ssh/https link>
cd dashbutton
npm install
```

## Configuration
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
