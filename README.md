# Lunatech E-Shop Web App #

### Prerequisites ###
* Node 8.X (https://nodejs.org/en/download/)
* docker-compose (https://docs.docker.com/compose/install/#install-compose)

### How to ###

# Local dev 
## Build
1. `npm install`
2. `npm run build:client`

## Test
1. `npm install`
2. `npm test`

## Start (separately without docker)
1. `npm run build:client`
2. `npm run start:client`
3. `npm run start:server`
4. Visit http://localhost:8080

## Start (All-in-one with docker)
1. `docker-compose build`
2. `docker-compose up`
3. Visit http://localhost:8080
