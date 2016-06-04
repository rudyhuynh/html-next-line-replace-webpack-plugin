## About this
A Webpack plugin which helps to replace script tag and href tag HTML files with new tag that has appropriate path to your build js and css files.

This is usefull when you build your js and css assets using `[chunkhash]` in output file name.

## What it does
It will read the HTML files, replace the line has the `<!--@replace()-->` annotation and the line next to with appropricate script tag (for js) or href tag (for css), then save new HTML files into new place.

## Installation
````
npm i html-next-line-replace-webpack-plugin --save-dev

````

## Usage
### In HTML files:
````
	<!--@replace(js, entry_name)-->
 	<script src="/any/path/to/script.js"></script>
 
 	<!--@replace(css, entry_name)-->
 	<link rel="stylesheet" href="/any/path/to/styles.css">
 		
	<!--@replace(css, entry_name)-->
	[empty_line]
````
### In Wepback config file:
````
	var HTMLNextLineReplace = require('html-next-line-replace-webpack-plugin')
	module.exports = {
		entry: [...],
		output: {
			publicPath: '...',
			filename: '[name].[chunkhash].js'
		},
		plugins: [
 			new HTMLNextLineReplace({
 				root: '/',
 				src: 'path/to/html/src/directory',
 				dest: 'path/to/html/dest/directory'
 			})
		]
	}
````

## API

* new HTMLNextLineReplace({root, src, dest})
    * root: will be add to the begining of the path in new script tag or css tag.
    * src: path to HTML files to run this plugin.
    * dest: path to where to save new HTML files.