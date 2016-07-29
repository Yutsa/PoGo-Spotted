#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify
import sqlite3
import json

app = Flask(__name__)

@app.route('/')
def accueil():
    gmap_api_key = 'AIzaSyBCKNhUxknKzs9doE_m_cSCLJco260CY-s'
    dict_coord = create_coord_json("pogom.db", 10)
    return render_template('index.html', gmap_api_key=gmap_api_key, coord=dict_coord)

def create_coord_json(db, id_pokemon):
    """Creates a JSON object of the coordinates of every spawn of the
    pokemon_id supplied. For that it looks into the db database."""
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    id_pokemon = (id_pokemon,)
    answer = cursor.execute('SELECT encounter_id, latitude, longitude FROM pokemon WHERE pokemon_id=?', id_pokemon)

    dict_coord = dict()


    for entry in answer:
        dict_coord[entry[0]] = {"lat": entry[1], "lng": entry[2]}

    json_data = json.dumps(dict_coord)
    return json_data

if __name__ == '__main__':
    app.secret_key = 'iTwiaKuelcadBajLanEacikyu'
    app.run(debug=True)
