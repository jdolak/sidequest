#include ./.env

TARGET = run.py
PROJECT = sidequest
SOURCES = $(wildcard ./app/*)

all: up

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


up: build env-setup
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d

build: $(SOURCES) Dockerfile
	PROJECT=$(PROJECT) docker build -f Dockerfile -t jdolakk/$(PROJECT) .

down:
	PROJECT=$(PROJECT) docker compose -f ./deploy/docker/docker-compose.yml -p $(PROJECT) down

run: env-setup
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d

env-setup:
	sh ./tools/scripts/env_setup.sh
