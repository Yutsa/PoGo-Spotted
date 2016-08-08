PoGo-Spotted
-------------

What is it ?
============

This is a web app that enables you to report when you encounter a
pokemon in Pokemon Go.

You say which pokemon you saw and then you say where (by default the
app will try to geolocalize you). The time of the encounter is the time
of the report, it can't be changed yet.

Then your report is added to a database.

You can then consult a map to see every spawnpoints !

In next releases you'll be able to filter the result to display on the map.

Disclaimer
==========

This is a work in progress and it's mainly done for an educational
purpose.

The app uses Flask own webserver and SQLite so this is not optimized
for deployment in production or anything.

How to use it ?
=================

Execute `start_application.py`, this will launch a webserver.

You can access the webserver by going to `localhost:5000` on your own
computer, `your_local_ip:5000` on a device in the same network
as yours or `your_public_ip:5000` on another device not in the same
network.

**Note**: You have to forward your 5000 port to access the server from a computer outside your network.

The project is configured to use the debug settings for now, you can
change it by remove `debug=True` in `app.run(host='0.0.0.0', debug=True)` (It's inside start_application.py)
