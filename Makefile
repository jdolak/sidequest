#include ./.env

TARGET = ./backend/run.py
PROJECT = sidequest
FLASK_SRCS = $(wildcard ./backend/*)
REACT_SRCS = $(wildcard ./frontend/*)

all: flask-up nginx-up

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

flask-build: $(FLASK_SRCS) ./backend/Dockerfile.flask
	PROJECT=$(PROJECT) docker build -f ./backend/Dockerfile.flask -t jdolakk/$(PROJECT)-flask ./backend

down:
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) down

run: env-setup
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d

nginx-up: frontend-build
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d sq-nginx

env-setup:
	sh ./tools/scripts/env_setup.sh

frontend-build: $(REACT_SRCS) ./frontend/Dockerfile.react
	PROJECT=$(PROJECT) docker build -f ./frontend/Dockerfile.react -t jdolakk/$(PROJECT)-frontend ./frontend

.PHONY: all install lint run-local flask-up flask-build down run nginx-up env-setup react-build nginx-build
