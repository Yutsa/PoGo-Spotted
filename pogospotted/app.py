#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""This script handles the data from the database and so on."""
import sqlite3
import json
import time
import os
import logging
from pogospotted.logger import logger

app_logger = logging.getLogger('pogo-spotted.app')
here = os.path.dirname(__file__)


def create_coord_json(db):
    """Creates a JSON object of the coordinates of every spawn of the
    pokemon_id supplied. For that it looks into the db database."""
    connection = sqlite3.connect(db)
    cursor = connection.cursor()

    # Create the table if it doesn't exist.
    cursor.execute("CREATE TABLE IF NOT EXISTS 'sightings'" \
                   "('enc_id' INT PRIMARY KEY,"\
                   "'pokemon_id' INT,"\
                   "'enc_date' DATE, 'lat' REAL,"\
                   "'lng' REAL)")

    answer = cursor.execute("SELECT enc_id, pokemon_id, "\
                            "strftime('%d/%m/%Y %H:%M', enc_date) "\
                            "AS enc_date, "\
                            "lat, lng FROM sightings")
        
    dict_coord = dict()

    for entry in answer:
        dict_coord[entry[0]] = {"id": entry[1], "lat": entry[3],
                                "lng": entry[4], "date": entry[2]}

    coord_json = json.dumps(dict_coord)
    connection.close()
    return coord_json

def create_pokemons_list():
    """
    Creates a dict with all pokemon names and their pokemon_id as key
    """
    file = open(os.path.join(here, '../static/pokemons.txt'), 'r')
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
                   "('enc_id' INT PRIMARY KEY,"\
                   "'pokemon_id' INT,"\
                   "'enc_date' TEXT, 'lat' REAL,"\
                   "'lng' REAL)")

    param = (time.time(), id, enc_date, lat, lng)
    cursor.execute("INSERT INTO 'sightings' " \
                   "(enc_id, pokemon_id, enc_date, lat, lng) "\
                   "VALUES (?, ?, ?, ?, ?)", param)

    conn.commit()
    conn.close()
