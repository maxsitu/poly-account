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

## Run Service
If the developer needs to debug in dev mode, run command below:
```bash
npm run dev:debug
```

Otherwise run in dev mode:
```bash
npm run dev
```

For production, run:
```bash
npm run start
```

## Endpoints
Signup
```graphql
mutation {
  signup(email: "situ.ma@maxsitu.com", password: "abc123") {
    user {
        email
        firstName
    }
  }
}
```

Login
```graphql
mutation {
    login(email: "situ.ma@maxsitu.com", password: "abc123") {
        user {
            email
            firstName
            lastName
        }
    }
}
```

Logout
```graphql
mutation {
  logout {
      status
      message
  }
}
```

Get User
```graphql
{
  user(email: "situ.ma@maxsitu.com") {
    email
    firstName
    lastName
    authRoles
  }
}
```

All Auth Roles
```graphql
{
    authRoles {
        name
        desc
        permissions {
            name
            desc
        }
    }
}
```

Get Auth Role
```graphql
{
    authRole(name: "account.admin") {
        name
        desc
        permissions {
            name
            desc
        }
    }
}
```

All Auth Permissions
```graphql
{
    authPermissions {
        name
        desc
    }
}
```

Get Auth Permissions
```graphql
{
    authPermission(name: "view.auth.role") {
        name
        desc
    }
}
```

Create Auth Role
```graphql
mutation {
    createAuthRole(name: "auth.admin", desc: "admin on auth domain") {
        name
        desc
    }
}
```

Modify Auth Role
```graphql
mutation {
    modifyAuthRole(name: "auth.admin", desc: "admin on auth domain", permissions: ["view.auth.role"]) {
        name
        desc
        permissions {
            name
            desc
        }
    }
}
```

Create Auth Permission
```graphql
mutation {
    createAuthPermission(name: "view.auth.role", desc: "Permission of viewing role") {
        name
        desc
    }
}
```

Modify Auth Permission
```graphql
mutation {
    modifyAuthPermission(name: "view.edit.role", desc: "Permission to view role") {
        name
        desc
    }
}
```