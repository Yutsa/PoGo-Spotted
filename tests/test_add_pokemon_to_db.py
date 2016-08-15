from pogospotted.app import add_pokemon_to_db
import sqlite3

def test_pokemon_added():
    id = 2
    enc_date = "2016-08-13 12:01"
    lat = 49.4545
    lng = 4.5454
    args = (2, enc_date)
    add_pokemon_to_db(id, enc_date, lat, lng, "pogo_spotted.db")

    conn = sqlite3.connect("pogo_spotted.db")
    c = conn.cursor()
    c.execute("SELECT pokemon_id, enc_date "\
                       "FROM sightings WHERE "\
                       "pokemon_id=? AND enc_date=?", args)

    answer = c.fetchone()
    assert answer != None
    assert answer[0] == id
    assert answer[1] == enc_date

    c.execute("DELETE FROM sightings WHERE pokemon_id=? AND "\
              "enc_date=?", args)
    conn.commit()
