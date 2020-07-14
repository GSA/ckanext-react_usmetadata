.PHONY: all clean up up-with-data test dev

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

yarn:
	cd app && yarn \

dev:
	docker-compose up -d && \
                   cd app && \
                   yarn start;

cosmos:
	docker-compose up -d && \
                   cd app && \
                   yarn cosmos;

rebuild-app:
	docker-compose up -d && \
                   cd app && \
                   yarn build && \
                   cd .. && \
                   ./deploy_react.sh;
