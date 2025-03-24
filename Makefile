#include ./.env

TARGET = ./backend/run.py
PROJECT = sidequest
SOURCES = $(wildcard ./app/*)

all: flask-up

install: requirements.txt
	python3 -m venv ./.venv
	./.venv/bin/python3 -m pip install -r requirements.txt

lint:
	@echo "\nLinting python code...\n"
	@\
	. ./.venv/bin/activate; \
	python3 -m pip install ruff; \
	ruff check .; \

run-local:
	@\
	. ./.venv/bin/activate; \
	. ./.env; \
    PROJECT=$(PROJECT) python3 $(TARGET); \


flask-up: flask-build env-setup
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d sq-flask

flask-build: $(SOURCES) ./backend/Dockerfile
	PROJECT=$(PROJECT) docker build -f ./backend/Dockerfile -t jdolakk/$(PROJECT) ./backend

down:
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) down

run: env-setup
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d

nginx-up:
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d sq-nginx

env-setup:
	sh ./tools/scripts/env_setup.sh
