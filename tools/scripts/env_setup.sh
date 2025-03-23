#!/bin/bash

if [ ! -e "./.env" ]; then
    echo "\n[ WARNING ] .env file does not exist, creating file with defaults, HOWEVER, you must add secrets manually\n"

cat << EOF >> ./.env
HOST_PORT=8080
APP_PORT=8080
FLASK_APP=run.py
EOF

fi
