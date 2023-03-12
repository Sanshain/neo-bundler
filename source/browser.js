//@ts-check


// const fs = require("fs");
// const sock = require('net');
// const path = require('path')

// // const cmd = require("child_process");
// var tss = require('typescript-simple');
// var obfuscator = require("uglify-js");

const build = require('./main').combine;

// function startListen(host, port, options){
// 	host = host || 'localhost'
// 	port = port || 9098
// 	options = options || {}

// 	console.log(`bundler start listen on ${host}:${port}`)    	

// 	sock.createServer(function (socket) {

// 		console.log('connection estableshed')    

// 		socket.on('data', async function(data) {

// 			console.time('Time');		

// 			let filename = data.toString();
// 			console.log(`received task for '${filename}'`)

// 			if (fs.existsSync(filename)){

// 				var content = fs.readFileSync(filename, "utf8");
// 				var result = bundler.combine(content, path.dirname(filename), options)

// 				if (options.tsc)  result = tss(result);		
// 				if (options.minify)	result = obfuscator.minify(result).code.valueOf();				
// 				let pathinfo = path.parse(filename);

// 				fs.writeFileSync(pathinfo.dir + path.sep + pathinfo.name + '.js', result)
// 			}
// 			else throw new Error(`file ${filename} does not exists`)

// 			console.timeEnd('Time');
// 			socket.write('success');

// 		});

// 	}).listen(port, host);

// }

module.exports = { build }



/*
var s = require('net').Socket();
s.connect(8080, 'localhost');
s.write('Hello');
s.end();
//*/