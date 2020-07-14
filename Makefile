.PHONY: all build requirements setup test update-dependencies

all: up

clean:
	docker-compose down -v

# test:
# TODO

up:
	docker-compose up

up-with-data:
	docker-compose -f docker-compose.yml -f docker-compose.seed.yml build
	docker-compose -f docker-compose.yml -f docker-compose.seed.yml up

