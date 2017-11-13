# SmartNetwork_Backend
Backend for smartnetwork application

## WHEN YOU FIRST PULL CODE
* run command `npm install`

## TO RUN SERVER
In one terminal window
```
$ mongod
```
In other window
```
$ npm run build
$ npm start
```

Go to [http://localhost:3000/smartRG/v1/](http://localhost:3000/smartRG/v1) to view root page

## DIAGRAM OF DATABASE STRUCTURE
![diagram](https://github.com/stefanagloginic/SmartNetwork_Backend/blob/master/image/backend_diagram.png)

## SMARTRG REST API
| REQUEST | LINK |
| ------ | ------ |
| POST/GET | All Routers: [http://localhost:3000/smartRG/v1/routers](http://localhost:3000/smartRG/v1/routers) |
| POST/GET | All Addresses: [http://localhost:3000/smartRG/v1/addresses](http://localhost:3000/smartRG/v1/addresses) |
| POST/GET | All Heatmaps: [http://localhost:3000/smartRG/v1/heatmaps](http://localhost:3000/smartRG/v1/heatmaps) |
| POST/GET | All Connection Statistics: [http://localhost:3000/smartRG/v1/connection-statistics](http://localhost:3000/smartRG/v1/connection-statistics) |
| POST/GET | All Pindrops: [http://localhost:3000/smartRG/v1/pindrops](http://localhost:3000/smartRG/v1/pindrops) |

