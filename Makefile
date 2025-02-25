TARGET = src/main.py

install: requirements.txt
	python3 -m venv ./.venv
	./.venv/bin/python3 -m pip install -r requirements.txt

lint:
	@echo "\nLinting python code...\n"
	@\
	. ./.venv/bin/activate; \
	python3 -m pip install ruff; \
	ruff check .; \

run:
	@\
	. ./.venv/bin/activate; \
    python3 $(TARGET); \
