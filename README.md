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
