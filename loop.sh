#!/bin/bash
while true; do
    node app
    echo "Restarting in 1 second, hit Ctrl-C quick if you actually want to exit..."
    sleep 1
done