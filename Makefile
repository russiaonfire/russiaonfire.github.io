build:
	rm -rf public
	hugo --minify	

serve:
	hugo serve --disableFastRender --port 3000
