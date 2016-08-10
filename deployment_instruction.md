Flask Project Deployment on a VPS
-------------------------------------

1. Host your project on a git repository to access it easily.

2. Install `git` on your VPS as well as `apache2`.
   You'll need to install `mod_wsgi`, but make sure that you
   download the right version. It is `libapache2-mod-wsgi`
   if you're using python2 and `libapache2-mod-wsgi-py3` for
   python3.

3. Clone the project in `/var/www`.

4. Setup a `virtualenv` if you want to.

5. Install `Flask` either in the `virtualenv` or system wide.

6. Change ownership of `/var/www` or `/var/www/yourProject`
   if needed.
   
7. Create the `.wsgi` file. See [Flask's documentation ]
   (http://flask.pocoo.org/docs/0.11/deploying/mod_wsgi/#creating-a-wsgi-file)
   if needed. Note that if you're using a `virtualenv` you'll need to have
   some more lines. It is explained in the documentation.
   
8. Create the apache conf file at `/etc/apache2/sites-available`.
   Here's an exemple for a project using a `virtualenv`:
   
   ```
   WSGIPythonHome /var/www/PoGo-Spotted
   WSGIPythonPath /var/www/PoGo-Spotted/lib/python3.4/site-packages

	<VirtualHost *>
             ServerName example.com

             WSGIScriptAlias / /var/www/PoGo-Spotted/pogospotted.wsgi
             WSGIDaemonProcess pogospotted
             <Directory /var/www/PoGo-Spotted>
                        WSGIProcessGroup pogospotted
                        WSGIApplicationGroup %{GLOBAL}
                        Order deny,allow
                        Allow from all
             </Directory>
             Alias "/static" "/var/www/PoGo-Spotted/static"
             <Directory "/var/www/PoGo-Spotted/static/">
                        Order allow,deny
                        Allow from all
             </Directory>
		</VirtualHost>
	```
	
	In this exemple `/var/www/PoGo-Spotted/` is the `virtualenv`.
	If you're not using a `virtualenv` delete the first two line.
	
9. Now disable the default `apache2` page with `sudo a2dissite 000-default.conf`
   inside the `/etc/apache2/sites-available/` directory.
   
10. Enable your site with `sudo a2ensite yourProject.conf`.

11. Finally reload the `apache2` service with `sudo service apache2 reload`.

