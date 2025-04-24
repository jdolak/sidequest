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
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d sq-frontend

env-setup:
	sh ./tools/scripts/env_setup.sh

frontend-build: $(REACT_SRCS) ./frontend/Dockerfile.frontend
	PROJECT=$(PROJECT) docker build -f ./frontend/Dockerfile.frontend -t jdolakk/$(PROJECT)-frontend ./frontend

dev-build: $(REACT_SRCS) ./frontend/Dockerfile.frontend.dev
	PROJECT=$(PROJECT) docker build -f ./frontend/Dockerfile.frontend.dev -t jdolakk/$(PROJECT)-frontend-dev ./frontend

dev: dev-build
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose-dev.yml -p $(PROJECT) up -d

dev-down:
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose-dev.yml -p $(PROJECT) down

prod:
	PROJECT=$(PROJECT) docker compose --env-file .env -f ./deploy/docker/docker-compose.yml -p $(PROJECT) up -d

chrome-windows:
	"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"

chrome-mac:
	open -na "Google Chrome" --args --disable-web-security --user-data-dir="/tmp/ChromeDevSession"

.PHONY: all install lint run-local flask-up flask-build down run nginx-up env-setup frontend-build dev-build dev
