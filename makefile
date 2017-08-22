all: site

site: figures
	hugo -vD

figures:
	(cd themes/figures && make)
