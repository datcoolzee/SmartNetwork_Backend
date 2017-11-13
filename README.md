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

## REFERENCES 
* Setup for database class [Part 2: Using MongoDB with Node.js](https://www.mongodb.com/blog/post/the-modern-application-stack-part-2-using-mongodb-with-nodejs)
* MongoDB documentation [MongoDB](http://mongodb.github.io/node-mongodb-native/2.2/api/)
* Chainable Routing using express.js [Express Routing](https://expressjs.com/en/guide/routing.html)
* Schema for validation of fields [npm json-validation](https://npm.runkit.com/json-validation)
