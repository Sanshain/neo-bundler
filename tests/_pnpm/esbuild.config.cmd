npx esbuild --outfile=./release/app.js ./src/app.js --bundle

@REM {
@REM     "entry": "./src/app.js",
@REM     "outfile": "./release/app.js",
@REM     "minify": false
@REM }

@REM  --minify
@REM  --external:react --external:react-dom
@REM  --loader:.js=jsx --loader:.png=base64