all: site upload

site: figures
	hugo -vD

figures:
	(cd themes/figures && make)

upload:
	rsync -e ssh -avz --delete-after  --exclude="*.DS_Store" public/ ulysse@u31.fr:/usr/share/nginx/www/blog/