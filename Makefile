test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

build:
	@component build \
		--standalone block \
		--out dist \
		--name block

gzip: build
	@mkdir -p build
	@uglifyjs dist/block.js -m -c hoist_vars=true -o build/block.min.js
	@gzip -c -9 build/block.min.js > build/block.min.js.gz

.PHONY: test build gzip