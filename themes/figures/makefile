all: figures

figures: sass

sass:
	sass source/sass/main.sass static/css/main.min.css --style compressed

watch:
	sass --watch source/sass/main.sass:static/css/main.min.css --style compressed
