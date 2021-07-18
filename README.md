# kdd-website-server
## Installation

**Development environment via Docker-compose**
In local environment, the application will be using .env file as it's default configuration setting instead of system environment variables.

First, copy and rename .env.example to .env
```
cp .env.exmaple .env
```

Fill values to .env file. The requiring values may vary depending on your local environment settings but DATABASE_HOST must always follow the database service's name written in the Docker-compose.yml file.
```
e.g.)
DATABASE_NAME=main
DATABASE_HOST=db
DATABASE_USER=root
DATABASE_ROOT_PASSWORD=secret
```

Now let's boot up Docker-compose

```
docker-compose up
```

Test your connectivity by typing 'localhost:3000' url on your browser navigator. You're supposed to see the welcome index page.