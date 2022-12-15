build-vue:
	yarn --cwd vue build

build-hugo:
	rm -rf public
	hugo --minify	
	cp -r vue/dist/assets public/assets

build: build-vue
build: build-hugo

server:
	hugo serve --disableFastRender

serve:
	npx serve public