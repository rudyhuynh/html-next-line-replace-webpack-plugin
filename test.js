var HTMLNextLineReplace = require('./index')
var path = require('path')

var plugin = new HTMLNextLineReplace({
	assets: './../../somewhere/noidea',
	src: path.join(__dirname, '../../../templates/dev'),
	dest: path.join(__dirname, '../../../templates/dist')
})

var mockCompiler = {
	plugin: function(name, callback){
		var mockStats = {
			toJson: function(){
				return {
					assetsByChunkName: {
					  "account_setting": [
					    "account_setting.js",
					    "./../styles/account_setting.css"
					  ],
					  "create_communication": [
					    "create_communication.js",
					    "./../styles/create_communication.css"
					  ],
					  "communication_detail": [
					    "communication_detail.js",
					    "./../styles/communication_detail.css"
					  ],
					  "subscriber": [
					    "subscriber.js",
					    "./../styles/subscriber.css"
					  ],
					  "app_setting": [
					    "app_setting.js",
					    "./../styles/app_setting.css"
					  ],
					  "create_subscriber": [
					    "create_subscriber.js",
					    "./../styles/create_subscriber.css"
					  ],
					  "communication": [
					    "communication.js",
					    "./../styles/communication.css"
					  ],
					  "dashboard": [
					    "dashboard.js",
					    "./../styles/dashboard.css"
					  ],
					  "app_list": [
					    "app_list.js",
					    "./../styles/app_list.css"
					  ],
					  "registration": "registration.js",
					  "login": "login.js"
					}
				}
			}
		}
		callback(mockStats)
	}
}

plugin.apply(mockCompiler)
console.log('Done!')