#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""This script handles the data from the database and so on."""
import sqlite3
import json

import logging
from pogospotted.logger import logger

app_logger = logging.getLogger('pogo-spotted.app')

def create_coord_json(db, id_pokemon):
    """Creates a JSON object of the coordinates of every spawn of the
    pokemon_id supplied. For that it looks into the db database."""
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    id_pokemon = (id_pokemon,)
    answer = cursor.execute('SELECT encounter_id, latitude, longitude, disappear_time FROM pokemon WHERE pokemon_id=?', id_pokemon)

    dict_coord = dict()

    for entry in answer:
        dict_coord[entry[0]] = {"lat": entry[1], "lng": entry[2], "date": entry[3]}

    if not dict_coord:
        app_logger.debug('The dict gotten from the DB request is empty.')
    else:
        app_logger.debug('The dict gotten from the DB request is not empty.')
    coord_json = json.dumps(dict_coord)
    return coord_json

def create_pokemons_list():
    """
    Creates a dict with all pokemon names and their pokemon_id as key
    """
    file = open('static/pokemons.txt', 'r')
    pokemons = list()
    for line in file:
        pkm_list = line.split(',')
        pokemons.append(pkm_list[1])
    return pokemons
    
def add_pokemon_to_db(id, enc_date, lat, lng, db_name):
    """
    Adds a pokemon sighting to the databse
    """
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE IF NOT EXISTS 'sightings'" \
                   "('pokemon_id' INT,"\
                   "'enc_date' TEXT, 'lat' REAL,"\
                   "'lng' REAL)")
    
    request = "INSERT INTO 'sightings' (pokemon_id, enc_date,"\
              "lat, lng) VALUES ({}, "\
                   "'{}', {}, {})".format(
                       id,
                       enc_date,
                       lat,
                       lng
                   )
    cursor.execute(request)
    conn.commit()
