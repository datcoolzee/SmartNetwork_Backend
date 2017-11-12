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
}

export default db
