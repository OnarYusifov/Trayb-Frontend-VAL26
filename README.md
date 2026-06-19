# Trayb - Frontend

Trayb is your all-in-one solution for an amazing looking Valorant Tournament Overlay, enabling all Organizers to display information like held gun, available credits etc. with just a single spectator running software.
To learn more and see a live demo, visit [trayb.az](https://www.trayb.az/).

It is comprised of three parts:

- [The Trayb Client](https://github.com/Trayb/Trayb-Client)
  - Running this software on a single in-game observer provides the Trayb Server with all data currently provided by Overwolf.
- [The Trayb Server](https://github.com/Trayb/Trayb-Server)
  - Ingests data from the Observer Client to reproduce the games state, allowing us to have an accurate representation of the game for further use.
- [The Trayb Frontend](https://github.com/Trayb/Trayb-Frontend)
  - Receives the game state from the Server every 100 milliseconds, presenting it in a beautiful manner for viewers to enjoy.

Further updates for new features, as well as a detailed setup guide and an easy to host docker container are in the pipeline!

# Docker Compose tutorial

First, create a seperate folder in your working directory and create a folder `config` inside it:

```
mkdir -p trayb-frontend/config
cd trayb-frontend
```

Create a file named `docker-compose.yml` as follow:

```
---
services:
  valo-trayb-frontend:
    image: "ghcr.io/trayb/overlay"
    ports:
      - "3000:80"
    volumes:
      - ./config:/usr/share/nginx/html/assets/config/
```

You can change `3000` to a different port which you want the frontend accessible outside the container to.

Inside `config` folder, create a file named `config.json` with the following content:

```
{
  "serverEndpoint": "http://localhost:5200",
  "redirectUrl": "https://trayb.az",
  "sponsorImageUrls": ["/assets/misc/logo.webp"],
  "sponsorImageRotateSpeed": 5000,
  "attackerColorPrimary": "#b82e3c",
  "attackerColorSecondary": "#ff4557",
  "attackerColorShieldCurrency": "#ff838f",
  "defenderColorPrimary": "#25ac79",
  "defenderColorSecondary": "#61eab6",
  "defenderColorShieldCurrency": "#61eab6"
}
```

For the most up to date version of the available configuration values, check out the `config.ts` file in the `src/app/shared/config.ts` file.

Replace `https://localhost:5200` with your Trayb Server address and outcoming port (default is 5200).

After that you can start the frontend by running `docker compose up -d` and the frontend are accessible at port `3000` by default.

# DISCLAIMER

Trayb-Frontend isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
