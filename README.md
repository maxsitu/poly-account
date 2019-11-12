# Poly account
## Description
This project is one testing project setup based on typecript, typeorm, graphql, etc.
It aims to create an account service providing user create/login/authenticate/authorize functions.

## Preparation
### Setting up locally
Install [Docker for Mac](https://www.docker.com/docker-mac)

Create the directories where Postgres databases will be stored
```
sudo mkdir -p /opt/poly-account
sudo chown -R $(whoami) /opt/poly-account
```

Add
    1. `/opt/poly-account`
to Docker -> Preferences -> File Sharing

You should be good to go to bring up DB

`docker-compose up`

### Nuke the database and start from scratch
Go through following steps to make sure old DB is cleaned up:
1. Make sure there is no running docker processes by running 

   ```
   docker-compose down
   ```
1. Remove and re-create DB folder:
   ```
   sudo rm -rf /opt/poly-account/
   sudo mkdir -p /opt/poly-account
   sudo chown -R $(whoami) /opt/poly-account
   ```
1. Start docker-compose environment

   ```
   docker-compose up
   ```
1. Apply previous migrations:
   ```
   npm run typeorm migration:run
   ```
1. Generate new migration (Optional):
   ```
   npm run typeorm migration:generate -- -n MIGRATION_NAME
   ```
1. Apply new generated migration (Optional):
   ```
   npm run typeorm migration:run
   ```