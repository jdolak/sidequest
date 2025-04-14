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

### Production Deployment

To run the production ready version of sidequest, just run:
```sh
make
```
This optimizes the frontend with `npm run build` and serves the static files using nginx.

### Development Deployment

To run the development deployment of sidequest, just run:
```sh
make dev
```
This serves the files using `npm start` and nginx is used as a reverse proxy. Changes should appear live from the editor on save.
