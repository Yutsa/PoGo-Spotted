activate_this = '/var/www/PoGo-Spotted/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

import sys

sys.path.insert(0, "/var/www/PoGo-Spotted")
from start_application import app as application
