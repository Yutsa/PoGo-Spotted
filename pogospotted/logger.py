#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging

logger = logging.getLogger("pogo-spotted")
logger.setLevel(logging.DEBUG)

fh = logging.FileHandler('logging.log')
fh.setLevel(logging.DEBUG)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO) #TO CHANGE WHEN IN PRODUCTION

formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh.setFormatter(formatter)
ch.setFormatter(formatter)

logger.addHandler(fh)
logger.addHandler(ch)
