#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""This script launches the server and handles the routing and so on."""

from flask import Flask, render_template, jsonify, request

import logging

from pogospotted.logger import logger
from pogospotted.app import *

from datetime import datetime
import os.path

app = Flask(__name__)
server_logger = logging.getLogger("pogo-spotted.server")
curr_dir = os.path.dirname(__file__)

DATABASE = os.path.join(curr_dir, 'pogo_spotted.db')

    
gmap_api_key = "AIzaSyBCKNhUxknKzs9doE_m_cSCLJco260CY-s"

@app.route('/')
def index():
    return render_template('index.html')
                

@app.route('/map/')
def map():
    pokemon_list = create_pokemons_list()
    pokemon_dict = create_coord_json(DATABASE)

    return render_template('map.html',
                           pkm_info=pokemon_dict,
                           gmap_api_key=gmap_api_key,
                           pokemons=pokemon_list)

@app.route('/getCoord/')
def getCoord():
    return create_coord_json(DATABASE);

@app.route('/sightings/', methods=['POST', 'GET'])
def sightings():
    if request.method == 'GET':
        pokemon_list = create_pokemons_list()
        curr_time = datetime.now().strftime("%Y-%m-%d %H:%M")
        return render_template('sightings.html',
                               pokemons=pokemon_list,
                               date=curr_time,
                               gmap_api_key=gmap_api_key)
    else:
        add_pokemon_to_db(request.form['pokemon_id'],
                          request.form['date_enc'],
                          request.form['lat'],
                          request.form['lng'],
                          DATABASE)
        
        return render_template('report_complete.html')

@app.route('/nearby/')
def nearby():
    return render_template('nearby.html', gmap_api_key=gmap_api_key)
    
if __name__ == '__main__':
    app.secret_key = 'iTwiaKuelcadBajLanEacikyu'
    app.run(host='0.0.0.0', debug=True)
