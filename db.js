var MongoClient = require('mongodb').MongoClient;

class db{
	constructor() {
		this.db = null;
	}

	connect = (connection_string) => {
		var self = this;

		return new Promise(function(resolve, reject){
			if(self.db){
				resolve();
			}
			else{
				var _self = self;
				
				MongoClient.connect(connection_string)
				.then(
					function(database){
						_self.db = database;

						resolve();
					},
					function(err){
						console.log('Error connecting: ' + err.message);

						reject(err.message);
					}
				)
			}
		});
	}

	close = () => {
		if(this.db){
			this.db.close()
			.then(
				function(){},
				function(error){
					console.log('failed to close the connection to the database: ' + error.message);
				}
			)
		}
	}

	// attempts to insert data given collection and response object
	insertOne = (collectionName, req, res) => {
		var self = this;

		return new Promise(function(resolve, reject){
			self.db.collection(collectionName, function(err, collection){
				if(err){
					console.log("Could not access collection: " + err.message);
					reject(err.message);
				}
				else{
					collection.insertOne(req, function(err, req){
						if(err){
							res.status(500).send("Failed to add record to database " + err);
							reject(err.message);
						}
						else if(req.insertedCount === 1){
							// success send back a status code and maybe the id of the object
							res.status(200).send("Added to " + collectionName + " database");
							resolve();
						}
						else{
							res.status(500).send("Failed to add record to database");
							reject(err.message);
						}
					})
				}
			})
		});
	}

}

export default db
