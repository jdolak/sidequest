#!/bin/bash

if [ ! -e "filename" ]; then
    echo "\n[ WARNING ] .env file does not exist, creating file with defaults, HOWEVER, you must add secrets manually\n"

cat << EOF >> ./.env
HOST_PORT=8080
APP_PORT=80
EOF

fi
