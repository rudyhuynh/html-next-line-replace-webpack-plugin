/**
 * Author: @rudyhuynh
 * Usage:
 *	HTML:
 *		<!--@replace(js, entry_name)-->
 *		<script src="/any/path/to/script.js"></script>
 *
 *		<!--@replace(css, entry_name)-->
 *		<link rel="stylesheet" href="/any/path/to/styles.css">
 *		
 *		<!--@replace(css, entry_name)-->
 *		[empty_line]
 *
 *	Wepback config:
 *		plugins: [
 *			new HTMLNextLineReplace({
 *				root: '/',
 *				src: 'path/to/html/src/directory',
 *				dest: 'path/to/html/dest/directory'
 *			})
 *		]
 */
var fs = require('fs')
var path = require('path')

function HTMLNextLineReplace(options) {
	if (!options) options = {};
	if (!options.src) {
		console.error('Src path is needed!');
	}
	if (!options.dest){
		console.error('Dest path is needed!');
	}
	this.options = options;
}

HTMLNextLineReplace.prototype.apply = function(compiler){
	this.compiler = compiler
	compiler.plugin('done', function(stats){
		this.assetsByChunkName = stats.toJson().assetsByChunkName;
		var src = this.options.src;
		var dest = this.options.dest;

		var files = fs.readdirSync(src)
		for (var i = 0; i<files.length; i++){
			var fileName = files[i]
			var filePath = path.join(src, fileName)
			var data = fs.readFileSync(filePath, 'utf8')
			var pattern = /<!--\@replace\(([\w\d]+),[ \t]*([\w\d\.-_'"]+)\)-->[ \t]*(\r\n|\n)?[ \t]*(<link.*>|<script.*<\/script>)?/g
			var output = data.replace(pattern, this.replacer.bind(this))
			var destFileName = path.join(this.options.dest, fileName);
			fs.writeFileSync(destFileName, output)
			console.log(fileName+' is build')
		}
	}.bind(this))
}

HTMLNextLineReplace.prototype.replacer = function(match, type, entryName){
	var outputPath = this.compiler.outputPath;
	var srcPath = path.join(this.options.root, outputPath);
	var assetFileName = this.assetsByChunkName[entryName]
	if (!assetFileName){
		throw '[HTMLNextLineReplace] Undefined entry_name '+entryName+' in <!--@replace('+type+', '+entryName+')-->'
	}
	if (type == 'js'){
		if (typeof assetFileName === 'string'){
			srcPath = path.join(srcPath, assetFileName)
		}else{
			srcPath = path.join(srcPath, assetFileName[0])
		}
		return '<script src="'+srcPath+'"></script>'
	}else if (type == 'css'){
		srcPath = path.join(srcPath, assetFileName[1])
		return '<link rel="stylesheet" href="'+srcPath+'">'
	}else{
		throw '[HTMLNextLineReplace] Undefined type '+type+' in <!--@replace('+type+', '+entryName+')-->;'
	}
}

module.exports = HTMLNextLineReplace

