# Development server

- ### Set environment variables

  - `cp .env.example .env`

- ### Build docker

  - `docker-compose build`

### Set up front-end

- ### Install node modules for client

  - `docker-compose run client yarn`
 

### Set up back-end 

- ### Run docker

  - `docker-compose up`

- ### Make migrations

  - `docker-compose run server alembic revision --autogenerate -m "Migration"`

- ### Apply migrations

  - `docker-compose run server alembic upgrade head`
 