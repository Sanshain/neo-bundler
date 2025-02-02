# changelog

## 4.1.15a 

 - fixed: #7 wrong transformation if dynImp varname is not at the end
 - fixed: callstack error on dirs cycle of dyn-imports

## 4.1.14a 

 - fixed: dynamic import vars for relative paths support
 - tests: some tests enhancing

## 4.1.12a 

 - fixed some bin errors and reduced bin output filename's logs

## 4.1.8a 

 - fixed treeShaking bin's error & changed require within esm skipping to warning 

## 4.1.7a 

 - fix bin ts auto install
 - bins up
 - benchmark table is finished
 - compare with webpack
 - bench test correction 
 - bench test for esbuild
 - remove benchmarks and fix some errors  after extractDefaultExpr defenition
 - optimize exportsApply
 - made namedImportsExpRegex global, chanhged doNothing option, mv extensions outside, added allFilesAre and ignoreDyncmicImports options to optimize,declared refineExtension and isSymbolLink to optimize via dirlist caching
 - redesign benchStore
 - benchMark object
 - move commonjsExportsApply to separate file
 - exportsApply optimization 

## 4.1.2a 

 - refactoring and little source cleaning

## 4.1.1a 

 - bin update
 - fix isbuilt mode for no t/sh mode
 - mark withCondition as experimental option
 - improved tree shaking & add suport of default and named import togather & Uppy is been assemling & async functions is supporting now & attempts to defeat conditional common exports  & exprementally improved support of built packages & fix troubles with default t/sh
 - fastShaker concept is introduced 
 - test hyperapp
 - test in browser
 - refix default reexports 

## 4.0.3a 

 - on swiper tested
 - incapsulate more logic in getFileStoreName
 - fixed `export default {...{}}`
 - temp fix for getFileStoreName
 - exports section suports 
 - exports { ... as default } fixeed
 - bin ups
 - cjs treesaking fixed
 - bins update
 - uppy is luckly built
 - fix multiline commet erasing inside oneline string
 - fixed {as default} and {default as} confuses
 - redesign tree shake and fix error comments releasing on \// regexp
 - attempts to retreeshake

## 3.2.0a 

 - fixed common reexport
 - reexport optimization
 - fixed treeshaking error on empty export
 - fixes re treeshaking and supports multiline reexport
 - hot fix of hardcoded word
 - bin update
 - update tests
 - added support of allover reexport
 - foreign builders integration support
 - exported classes treeshake support

## 3.1.8a 

 - tree_shaking for functions is it
 - changelog update

## 3.1.7a 

 - dynamic vars support
 - refinement of a fileStoreName naming
 - `export default Array.from` support and fix genfileStoreName with relative paths

## 3.1.5a 

 - npm-changekig update

## 3.1.4a 

 - tests update
 - directory auto creation
 - dynamic import of pnpm module
 - merge after stash
 - color update

## 3.1.3a 

 - color update
 
## 3.1.2a 

 - update info about purgeDebug

## 3.1.1a 

 - release mode honing
 - added esbuild to pnpm test for a speed comparision

## 3.1.0a 

 - statHolder is implemented
 - fixed dynamic imports
 - pnpm support 
 - colored time meassurement
 - time measurement is added
 
## 3.0.6a 

 - time measurement is added

## 3.0.5a 

 - fix empty advanced option field 

## 3.0.3a 

 - fix release mode build with auto removing one-line comments and console.log
 - update bins
 - fix sourcemaps for statically compiled files
 - fix nested static imports inside dynamiccally atached files
 - dynamic import predefined
 - refix problem with fileStoreName
 - es6 import names  fixed
 - cjs export experimantal support
 - temp fix of confuse
 - finished on confuse
 - turned out to do @uppy import but with some unsolvable confuses ( } for imported object
 - rebuild browser bundle and browser retest
 - fix imports inside nested folfer
 - support default anonimous object exports 
 - 2.2.45 -> fix : types up
 - build up
 - shift option append
 - extractEmbedMap browser support
 - exports mergeFlatMaps
 - ready scratch in bin 
 - drop @babel/plugin-transform-react-jsx and accorn
 - buble vs babel
 - types up
 - types update
 - logging finished raw mappings as option
 - fix build bug
 - proper rebuild
 - feat-fix: sourcemaps browser support
 - bundles up
 - added support for a simple post-processing plugins
 - bundles up
 - by default modules cleaning
 - reset rootOffset and sourcemaps on recompile
 - fix last
 - fix: types up
 - prepared to checking for injectTo option
 - tests revive
 - fix sourcemap lines alignment
 - feat: require same as import
 - revive ts tests
 - npm update
 - revive tests
 - merge maps and sourceMapInfo example
 - refix entrypoint sourcemap gen ch by ch
 - fix entryPoint source map gener
 - charByChar as optional option
 - repo up
 - bin rebuild
 - bin -m support
 - sourcemaps works with sourcemap-codec
 - attempt map ch by ch
 - catching line number with error through getSourceMap callback
 - each c to map attempt to work
 - attempt multichar sm
 - map sketches
 - approximate type coverage via tsc cli
 - fix bin log
 - bin settings
 - js tests
 - fix default named export
 - mocha tests fixed
 - mocha test 
 - mocha init