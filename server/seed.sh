#!/bin/bash
HOST=localhost
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5444
set -ex

export PG_PASSWORD="$(echo $POSTGRES_PASSWORD)" && psql -v ON_ERROR_STOP=1 -h "$HOST" --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -p "$POSTGRES_PORT" < seed.sql
