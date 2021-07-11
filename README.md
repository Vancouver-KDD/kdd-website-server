# kdd-website-server
## Installation

**Development environment via Docker-compose**
The application will automatically use .env file on the project root directory instead of using system's environment variables in local environment

First, copy and rename .env.example to .env
```
cp .env.exmaple .env
```

Fill values to .env file. The values may vary depending on your local environment.
```
e.g.)
DATABASE_NAME=main
DATABASE_HOST=db
DATABASE_USER=root
DATABASE_ROOT_PASSWORD=secret
```

Boot up Docker-compose

```
docker-compose up
```

Test your connectivity by typing 'localhost:3000' to your browser url