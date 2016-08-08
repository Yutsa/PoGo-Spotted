#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""This script launches the server and handles the routing and so on."""
from flask import Flask, render_template, jsonify, request

import logging
from pogospotted.logger import logger

from pogospotted.app import create_coord_json, create_pokemons_list

app = Flask(__name__)
server_logger = logging.getLogger("pogo-spotted.server")


@app.route('/')
def index():
    return render_template('index.html')
                

@app.route('/map/')
def map():
    return "map"

@app.route('/sightings/', methods=['POST', 'GET'])
def sightings():
    if request.method == 'GET':
        pokemon_list = create_pokemons_list()
        return render_template('sightings.html', pokemons=pokemon_list)
    else:
        return "Got a POST request"
    
if __name__ == '__main__':
    app.secret_key = 'iTwiaKuelcadBajLanEacikyu'
    app.run(host='0.0.0.0', debug=True)
