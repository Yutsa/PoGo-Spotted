#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging
import os

curr_dir = os.path.dirname(__file__)
logfile = os.path.join(curr_dir, '../logging.log')

logger = logging.getLogger("pogo-spotted")
logger.setLevel(logging.DEBUG)

fh = logging.FileHandler(logfile)
fh.setLevel(logging.DEBUG)

ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG) #TO CHANGE WHEN IN PRODUCTION

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)

logger.addHandler(fh)
logger.addHandler(ch)
