build-vue:
	yarn --cwd vue build

build-hugo:
	hugo --minify
	rm -r public/assets
	cp -r vue/dist/assets public/assets

build: build-vue
build: build-hugo

server:
	hugo serve --disableFastRender

serve:
	npx serve public