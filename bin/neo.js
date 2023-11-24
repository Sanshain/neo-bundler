#!/usr/bin/env node

"use strict";var require$$0=require("path"),require$$0$1=require("fs"),require$$2=require("perf_hooks"),require$$3=require("child_process");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var require$$0__default=_interopDefaultLegacy(require$$0),require$$0__default$1=_interopDefaultLegacy(require$$0$1),require$$2__default=_interopDefaultLegacy(require$$2),require$$3__default=_interopDefaultLegacy(require$$3);function commonjsRequire(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var __bin={},main={},utils={};const path$2=require$$0__default.default;function deepMergeMap$1(e,t,n){const{outsideMapInfo:o,outsideMapping:a}=t,{sourcesContent:r,files:s}=e;t=e.mapping.map(n=>n&&n.length?(n.forEach((e,t)=>{n[t][1]<s.length-1&&(n[t][1]+=o.sources.length)}),n):[]).map((r,e)=>{return r&&r.length?(r||[]).map((e,t,n)=>{t=a[r[t][2]];return t&&t.length?t[0]:e[1]>o.sources.length-1?e:null}).filter(e=>e):[]});return o.sources=o.sources.concat(s.slice(0,-1)),o.sourcesContent=o.sourcesContent.concat((r||[]).slice(0,-1)),n&&(o.mappings=n(t)),{mergedMap:t,outsideMapInfo:o}}function mergeFlatMaps$1(e,t,n){var r,o,a,{mapStartToken:n,pluginMapping:s,decode:i}=n||{},s=(s?r=s:[r,o,a]=extractEmbedMap$1(e,{sourceMapToken:n,decode:i}),r.map(e=>e?e[0]:[]).map(e=>t[e[2]]));return[a||e,s]}function extractEmbedMap$1(e,t){var n=(t||{})["sourceMapToken"],r=e.lastIndexOf(n=n||"//# sourceMappingURL=data:application/json;charset=utf-8;base64,"),n=e.slice(r+n.length),n=JSON.parse(globalThis.document?globalThis.atob(n):Buffer.from(n,"base64").toString());return[t.decode(n.mappings),n,e.slice(0,r)]}utils.deepMergeMap=deepMergeMap$1,utils.mergeFlatMaps=mergeFlatMaps$1,utils.extractEmbedMap=extractEmbedMap$1,utils.genfileStoreName=function(e,t){e="."!==path$2.dirname(t)?path$2.join(e||"",path$2.dirname(t)):e||"",t=path$2.basename(t);return((e||"").replace("./","")+"__"+t).replace(/[\/\\]/g,"$")};const fs$1=require$$0__default$1.default,path$1=require$$0__default.default,{deepMergeMap,genfileStoreName}=utils,requireOptions={sameAsImport:"same as imports"};let startWrapLinesOffset=1,endWrapLinesOffset=5;const extensions=[".ts",".js",""];var rootOffset=0,exportedFiles=[];let logLinesOption=!1,incrementalOption=!1;function combineContent(e,t,n,r){globalOptions=n;var o=e;return rootOffset=0,sourcemaps.splice(0,sourcemaps.length),Object.keys(modules).forEach(e=>delete modules[e]),logLinesOption=n.logStub,(incrementalOption=!!n.advanced&&n.advanced.incremental)&&(startWrapLinesOffset=3,endWrapLinesOffset=8),exportedFiles=[],n.removeLazy&&((n.sourceMaps||n.getSourceMap)&&(console.warn("[33mremoveLazy option uncompatible with sourceMap generation now. Therefore it`s passed[0m"),n.sourceMaps=null,n.getSourceMap=null),e=removeLazy(e)),e=importInsert(e,t,n),e=mapGenerate({target:n.targetFname,options:n,originContent:o,content:e}),e=n.advanced&&n.advanced.ts?n.advanced.ts(e):e}function buildFile(e,t,n){var r=fs$1.readFileSync(e).toString(),e=path$1.resolve(e),t=t||path$1.parse(e).dir+path$1.sep+path$1.parse(e).name+".js",n=Object.assign({entryPoint:path$1.basename(e),release:!1,targetFname:t},n),r=combineContent(r,path$1.dirname(e),n);return fs$1.writeFileSync(t,r),r}class PathMan{constructor(e,t){this.dirPath=e,this.getContent=t||getContent}}class Importer{pathMan;constructor(e){this.namedImportsApply=namedImports,this.moduleStamp=moduleSealing,this.pathMan=e}}function mapGenerate({options:e,content:n,originContent:r,target:o,cachedMap:a}){let s=!1;if(e.getSourceMap||e.sourceMaps){var i=Object.values(modules),l=a||sourcemaps.map(e=>e.debugInfo).reduce((e,t)=>e.concat(t));if(a||l.push(null),e.getSourceMap&&e.getSourceMap({mapping:l,sourcesContent:i.map(e=>e.split("\n").slice(startWrapLinesOffset,-endWrapLinesOffset).join("\n")).concat([r]),files:sourcemaps.map(e=>e.name)}),e.sourceMaps){let t=l.map(e=>e||[]);e.sourceMaps.shift&&(t=Array(e.sourceMaps.shift).fill([]).concat(t));var a=e.sourceMaps.encode(t),l=path$1&&o?path$1.basename(o):"";const c={version:3,file:l,sources:sourcemaps.map(e=>e.name),sourcesContent:i.map(e=>e.split("\n").slice(startWrapLinesOffset,-endWrapLinesOffset).join("\n")).concat([r]),names:[],mappings:a};e.sourceMaps.injectTo&&(i=e.sourceMaps.injectTo,{mergedMap:r,outsideMapInfo:a}=deepMergeMap({...c,files:c.sources,mapping:t},{outsideMapInfo:i,outsideMapping:i.maps||globalOptions.sourceMaps.decode(i.mappings)}),a.mappings=e.sourceMaps.encode(t=r),c.sources=a.sources,c.sourcesContent=a.sourcesContent),e.plugins&&(s=!0,e.plugins.forEach(e=>{e.bundle&&(n=e.bundle(n,{target:o,maps:c,rawMap:t}))})),e.sourceMaps.verbose&&console.log(c.sources,c.sourcesContent,t),fs$1&&!0===e.sourceMaps.external?(fs$1.writeFileSync(o+".map",JSON.stringify(c)),n+=`
//# sourceMappingURL=${l}.map`):(i=globalThis.document?btoa(JSON.stringify(c)):Buffer.from(JSON.stringify(c)).toString("base64"),n+=`
//# sourceMappingURL=data:application/json;charset=utf-8;base64,`+i)}}return e.plugins&&!s&&e.plugins.forEach(e=>{e.bundle&&(n=e.bundle(n,{target:o}))}),n}let globalOptions=null,nodeModulesPath=null;const nodeModules={};function importInsert(e,t,n){var t=new PathMan(t,n.getContent||getContent),r=!(!n.sourceMaps&&!n.getSourceMap);logLinesOption&&(e=e.replace(/console.log\(/g,function(){var e=arguments[2].slice(0,arguments[1]).split("\n").length.toString();return'console.log("'+n.entryPoint+":"+e+':", '}));const o=n.sourceMaps&&n.sourceMaps.charByChar,a=(e=new Importer(t).namedImportsApply(e,void 0,n.sourceMaps&&n.sourceMaps.charByChar?1:r),e="\n\n//@modules:\n\n\n"+Object.values(modules).join("\n\n")+`


//@${n.entryPoint}: 
`+e,null);return r&&(rootOffset+=5+2*sourcemaps.length+1,sourcemaps[0]&&sourcemaps[0].debugInfo.unshift(a,a,a,a),sourcemaps.forEach(e=>{e.debugInfo.unshift(a)}),t=e.split("\n").slice(rootOffset).map((e,n)=>{return o?[[0,sourcemaps.length,n,0]]:[].map.call(e,(e,t)=>[t,sourcemaps.length,n,t])}),sourcemaps.push({name:n.entryPoint,debugInfo:[a,a,a].concat(t)})),n&&n.release&&(n.sourceMaps&&console.warn("Generate truth sourcemaps with options `release = true` is not guaranteed"),e=(e=(e=e.replace(/console.log\([\s\S]+?\)\n/g,n.sourceMaps?"\n":"")).replace(/\/\/[\s\S]*?\n/g,n.sourceMaps?"\n":"")).replace(/^[\s]*/gm,"")),e}const modules={},sourcemaps=[];function namedImports(e,g,o){const t=new Set;e=e.replace(/^import (((\{([\w, \$]+)\})|([\w, ]+)|(\* as [\w\$]+)) from )?["'](.\/)?([@\w\-\/\.]+)["']/gm,(e,t,n,r,o,a,s,i,l,c,p)=>{var u,m=genfileStoreName(g,l);if(modules[m]||(u=(g||".")+"/"+l,i?h.call(this,l,m):this.pathMan.getContent==getContent&&(nodeModulesPath=nodeModulesPath||findProjectRoot(this.pathMan.dirPath),fs$1.existsSync(nodeModulesPath)?(i=path$1.normalize(u),i=path$1.join(nodeModulesPath,i),f=path$1.join(i,"package.json"),f=JSON.parse(fs$1.readFileSync(f).toString()),nodeModules[u]=path$1.join(i,f.module||f.main),h.call(this,u,m)):console.warn("node_modules doesn`t exists. Use $onModuleNotFound method to autoinstall"))),a&&$(a))return`const { default: ${a} } = $${m.replace("@","_")}Exports;`;if(!a){if(s)return`const ${s.split(" ").pop()} = $${m.replace("@","_")}Exports;`;var d,i=o.split(",").map(e=>(~e.indexOf(" as ")?e.trim().split(" ").shift()+": "+e.trim().split(" ").pop():e).trim());for(d of i)$(d=~d.indexOf(":")?d.split(": ").pop():d);return`const { ${i.join(", ")} } = $${m.replace("@","_")}Exports`}var f=new Error(`Variable '${a}' is duplicated by import './${l}.js'`);f.name="DublicateError",console.log("[31m%s[0m",`Detected ${f.name} during build process: `+f.message,"[0m"),console.log("Fix the errors and restart the build."),process.exit(1)});return globalOptions?.advanced?.require===requireOptions.sameAsImport?(console.log("require import"),e.replace(/(?:const|var|let) \{?[ ]*(?<varnames>[\w, :]+)[ ]*\}? = require\(['"](?<filename>[\w\/\.\-]+)['"]\)/g,(e,t,n)=>{var r=genfileStoreName(g,n=n.replace(/^\.\//m,""));if(!modules[r]&&!h.call(this,n,r))return e;return e.split("=")[0]+`= $${r.replace("@","_")}Exports;`})):e;function h(e,t){let r=this.moduleStamp(e,g||void 0,o);return!!r&&(e=r.lines.map(([n,e],t)=>{return t>=r.lines.length-endWrapLinesOffset||t<startWrapLinesOffset?null:1===o?[].map.call(e,(e,t)=>[t,sourcemaps.length-1+1,n-startWrapLinesOffset,t]):[[0,sourcemaps.length-1+1,n-startWrapLinesOffset,1]]}),sourcemaps.push({name:t.replace(/\$/g,"/")+".js",debugInfo:e}),!0)}function $(e){if(!t.has(e))return t.add(e),1;console.warn("Duplicating the imported name")}}function moduleSealing(t,e,n){let r=this.pathMan.getContent((e?e+"/":"")+t);var o=genfileStoreName(e,t.replace("./",""));if(void 0===r){var a=new Error(`File "${(e?e+"/":"")+t}.js" doesn't found`);if(a.name="FileNotFound",!n||globalOptions.onError&&globalOptions.onError(a))return null;throw a}if(""==r)return null;a=path$1?path$1.dirname(t):t.split("/").slice(0,-1).join("/"),logLinesOption&&(r=r.replace(/console.log\(/g,function(){var e=arguments[2].slice(0,arguments[1]).split("\n").length.toString();return'console.log("'+t+".js:"+e+':", '})),a="."===a?"":a,e=(e?e+(a?"/":""):"")+a;r=this.namedImportsApply(r,e);let s=Array.from(r.matchAll(/^export (class|function|let|const|var) ([\w_\n]+)?[\s]*=?[\s]*/gm)).map(e=>e[2]).join(", ");a=(r=r.replace(/^export default[ ]+(\{[ \w\d,\(\):;'"\n\[\]]*?\})/m,"var _default = $1;\n\nexport default _default;")).match(/^export default ([\w_\$]+)\b( [\w_\$]+)?/m);return a&&(~["function","class"].indexOf(a[1])?(a[2]||(r=r.replace(/^export default \b([\w_]+)\b/m,"export default $1 $default")),s+=`${s&&", "}default: `+(a[2]||"$default")):s+=(s&&", ")+"default: "+a[1]),s=`exports = { ${s=s.startsWith(" ,")?s.slice(2):s} };`+"\n".repeat(startWrapLinesOffset),r="\t"+r.replace(/^export (default ([\w\d_\$]+(?:;|\n))?)?/gm,"").trimEnd()+"\n\n"+s+"\nreturn exports",modules[o]=`const $${o.replace("@","_")}Exports = (function (exports) {
 ${r.split("\n").join("\n\t")} 
})({})`,incrementalOption&&(modules[o]=`
/*start of ${t}*/
${modules[o]}
/*end*/

`),n?(e=modules[o].split("\n"),{fileStoreName:o,updatedRootOffset:rootOffset+=e.length,lines:e.map((e,t)=>[t,e])}):null}function getContent(e){e=nodeModules[e]||path$1.normalize(this.dirPath+path$1.sep+e);for(var t of extensions)if(fs$1.existsSync(e+t)){e+=t;break}if(exportedFiles.includes(e))return console.warn(`attempting to re-import '${e}' into 'base.ts' has been rejected`),"";exportedFiles.push(e);try{var n=fs$1.readFileSync(e).toString()}catch{throw new Error(`File "${e}" doesn't found`)}return n}function removeLazy(e){return e.replace(/\/\*@lazy\*\/[\s\S]*?\/\*_lazy\*\//,"")}function findProjectRoot(e){if(fs$1.existsSync(path$1.join(e,"package.json")))return t=globalOptions.advanced.nodeModulesDirname||"node_modules",path$1.join(e,t);var t=path$1.dirname(e);if(4<t.length)return findProjectRoot(t);throw new Error("Project directory and according node_modules folder are not found")}main.default=main.build=main.buildContent=main.combineContent=combineContent,main.integrate=main.packFile=main.buildFile=buildFile,main.requireOptions=requireOptions;const path=require$$0__default.default,fs=require$$0__default$1.default,execSync=(require$$2__default.default.performance,require$$3__default.default)["execSync"],build=main.buildFile,{mergeFlatMaps,extractEmbedMap}=utils,TS_MAP_Token="//# sourceMappingURL=data:application/json;base64,",cache={};function getArgv(e){e=process.argv.indexOf(e)+1;return e?process.argv[e]:null}~process.argv.indexOf("-h")&&(console.log(`
-s 		- source file name (could be passed as first arg without the flag -s)
-t 		- target file name (required)
-m 		- generate sourcemap file 	(optional)
--time 	- verbose build time  		(optional)
    `),process.exit(0));const helpers={s:"source file",t:"target file"};let source=resolveFile("s",1),target=resolveFile("t",!1);const sourcemapInline=~process.argv.indexOf("--inline-m"),sourcemap=sourcemapInline||~process.argv.indexOf("-m"),minify=sourcemapInline||~process.argv.indexOf("--minify"),jsx__converter=sourcemapInline||~process.argv.indexOf("--jsx-converter"),release=~process.argv.indexOf("-r");release&&sourcemap&&console.log("[34m >> using the -k option in conjunction with - is not recommended, since these options have not been tested together.[0m"),console.time("built in");let result=build(source,target,{release:1==!!release,sourceMaps:sourcemap?(()=>{var t="sourcemap-codec";try{var n=commonjsRequire(t)["encode"]}catch(e){console.log("[33mThe package needed to generate the source map has not been found and will be installed automatically[0m"),console.log(execSync("npm i sourcemap-codec").toString());var n=commonjsRequire(t)["encode"]}return{encode:n,external:1==!!sourcemapInline}})():null,advanced:source.endsWith(".ts")?{ts:e=>{var t=importPackage({packageName:"typescript"}),n=importPackage({packageName:"sourcemap-codec",funcName:"decode"}),[r,o,e]=extractEmbedMap(e,{decode:n}),t=t.transpile(e,{sourceMap:!0,inlineSourceMap:!0,inlineSources:!0,jsx:!0,allowJs:!0});return o?([e,r]=mergeFlatMaps(t,r,{mapStartToken:TS_MAP_Token,decode:n}),n=importPackage({packageName:"sourcemap-codec",funcName:"encode"}),o.mappings=n(r),o.file="",e+"\n"+TS_MAP_Token+Buffer.from(JSON.stringify(o)).toString("base64")):t}}:null,plugins:[].concat(minify?[{name:"neo-minify-plugin",bundle:(e,{maps:t})=>{e=importPackage({packageName:"uglify-js"}).minify({target:e},{sourceMap:sourcemap?{content:JSON.stringify(t),url:sourcemapInline?"inline":target+".map"}:void 0});return sourcemap&&!sourcemapInline&&fs.writeFileSync(target+".map",e.map),e.code}}]:[]).concat(jsx__converter?[{name:"neo-jsx-convert-plugin",bundle:(e,{maps:t})=>{var n=importPackage({packageName:"babel-standalone"}),r=importPackage({packageName:"babel-plugin-transform-react-jsx"}),n=n.transform(e,{inputSourceMap:t,sourceMaps:!0,plugins:[r]});return e=n.code+"\n"+TS_MAP_Token+Buffer.from(JSON.stringify(n.map)).toString("base64")}}]:[])});function importPackage({packageName:t,funcName:n,destDesc:r}){var e=t+"."+(n||"default");if(cache[e])return cache[e];try{var o=n?commonjsRequire(t)[n]:commonjsRequire(t)}catch(e){console.log(`[33mThe package ${t} needed ${r} has not been found and will be tried to install automatically[0m`),console.log(execSync("npm i "+t).toString());o=n?commonjsRequire(t)[n]:commonjsRequire(t)}return cache[e]=o}function resolveFile(e,t){let n=getArgv("-"+e)||(1===t?process.argv[t+1]:null);return n||(e=`the path is not specified (use the -${e} <filename> option for specify ${helpers[e]})`,console.warn("[31m"+e+"[0m"),process.exit(1)),path.isAbsolute(n)||(n=path.resolve(process.cwd(),n)),t&&void 0!==t&&!fs.existsSync(n)&&(console.log(process.cwd),console.warn("[31m"+n+" file not found[0m"),process.exit(1)),n}result&&(console.log(`[34m${source} => ${target}[0m`),sourcemap&&0==!!sourcemapInline&&console.log(`[34m${".".repeat(source.length)} => ${target}.map[0m`),~process.argv.indexOf("--time"))&&console.timeEnd("built in"),module.exports=__bin;
