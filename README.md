# Sidequest

Sidequest is an incentive-based platform that encourages community and participation within hobby groups.

It enables users to join groups where they can participate in collaborative goal-setting through quests and interactive predictions through bets using a virtual currency system. 

A quest could be made for reaching a level in a video game, attending a soccer game, or finishing a book—with currency rewards for doing so. 
Bets could be placed on a game of chess between group members, who will win the Champions League, or a Mariokart tournament.

Quests motivate users to achieve personal or group goals while bets enable friendly predictions on real or group events. 

The application tracks user engagement, virtual currency flow, and quest/bet outcomes, with potential for mapping virtual currency to real value for informal payments.

Sidequest could be useful for your friend groups, hobby communities, local clubs, or any social circles looking to seek engagement through gamified productivity. 

## Technology Stack

* HTML / CSS
* React / Javascript
* Flask / Python
* NGINX
* Docker

## Usage

The following describes how to host sidequest yourself:

### Prerequisites

Docker is not required but highly encouraged. The following instructions assume you have it installed.  
Instructions on how to download docker can be found at [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

### Setup

First, several environment variables need to be set in a `.env` file in the project's root directory:

```
HOST_PORT=8004
FLASK_APP=run.py
FLASK_SECRET_KEY=somerandomstring
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
MINIO_ROOT_USER=somerootuser
MINIO_ROOT_PASSWORD=somerootpassword
RDMS=oracle
```
`HOST_PORT`: This determines the port in that will be exposed and take HTTP connections.  
`FLASK_APP`: Needed for Flask  
`FLASK_SECRET_KEY`: The key used to sign session cookies, set this to something random and secure  

`S3_ACCESS_KEY` & `S3_SECRET_KEY`: The key access and secret keys, generated from minio, that has read/write access to the upload bucket  
`MINIO_ROOT_USER` & `MINIO_ROOT_PASSWORD`: username and password for the minio object storage root account

`RDMS`: the database system backend of choice, options of `oracle` and `sqlite`

### Production Deployment

To build the production ready version of sidequest, just run:
```sh
make
```
This optimizes the frontend with `npm run build` and serves the static files using nginx.

This will build and attempt to run the containters, however, it will fail. To run, now execute:
```sh
make prod
```

### Development Deployment

To run the development deployment of sidequest, just run:
```sh
make dev
```
This serves the files using `npm start` and nginx is used as a reverse proxy. Changes should appear live from the editor on save.
