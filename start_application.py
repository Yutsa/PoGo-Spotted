#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def accueil():
    gmap_api_key = 'AIzaSyBCKNhUxknKzs9doE_m_cSCLJco260CY-s'
    return render_template('index.html', gmap_api_key=gmap_api_key)

if __name__ == '__main__':
    app.secret_key = 'iTwiaKuelcadBajLanEacikyu'
    app.run(debug=True)
