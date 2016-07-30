#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""This script launches the server and handles the routing and so on."""
from flask import Flask, render_template, jsonify, request

import logging
from pogospotted.logger import logger

from pogospotted.app import create_coord_json

app = Flask(__name__)
server_logger = logging.getLogger("pogo-spotted.server")


@app.route('/', methods=['GET', 'POST'])
def accueil():
    gmap_api_key = 'AIzaSyBCKNhUxknKzs9doE_m_cSCLJco260CY-s'
    if request.method == 'GET':
        return render_template('index.html', gmap_api_key=gmap_api_key)
    else:
        try:
            pokemon_id = int(request.form['pokemon_id'])
            server_logger.debug('pokemon_id=' + str(pokemon_id))
            dict_coord = create_coord_json("pogom.db", pokemon_id)
            return render_template('index.html', gmap_api_key=gmap_api_key, coord=dict_coord)
        except ValueError:
            return render_template('index.html', gmap_api_key=gmap_api_key)            
    
if __name__ == '__main__':
    app.secret_key = 'iTwiaKuelcadBajLanEacikyu'
    app.run(debug=True)
