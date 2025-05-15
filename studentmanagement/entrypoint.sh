#!/bin/bash

mkdir -p /app/photos

if [ ! -f /app/photos/default-photo.jpg ]; then
  cp /app/default-photos/default-photo.jpg /app/photos/default-photo.jpg
fi

exec java -jar app.jar
