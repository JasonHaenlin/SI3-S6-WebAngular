//app.routes.js
"use strict";

const Database = require("../config/query.js");
const Schema = require("./models/schema.js");
const Users = require("./models/user.js");

const data = new Database();
const users = new Users();

const prefix = "/bddapi"
var user_schema_user = Schema.user;
var user_schema_notification = Schema.notification;


module.exports = function (app, pool) {

	app.delete(prefix + "/incident/id=:id", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.deleteIncident(req.params.id), function (
				error,
				results,
				fields
			) {
				// And done with the connection.

				// Handle error before the release.
				if (error)
					res.status(400).json([{
						res: "fail",
						detail: error
					}]);
				else
					res.status(200).json([{
						res: "success",
						detail: "item has been deleted"
					}]);

				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.delete(prefix + "/utilisateurs/info/id=:id", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.deleteUser(req.params.id), function (error, results, fields) {
				if (error)
					res.status(400).json([{
						res: "fail",
						detail: error
					}]);
				else
					res.status(200).json([{
						res: "success",
						detail: "user has been deleted"
					}]);
				connection.release();
			})
		})
	})

	app.get(prefix + "/avatars", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.getAvatars(), function (error, results, fields) {
				if (error || Object.keys(results).length == 0) {
					res.status(500).json([{
						res: "fail",
						details: "cannot find that item"
					}]);
				} else res.status(200).json(JSON.parse(JSON.stringify(results)));
				connection.release();

			});
		});
	});

	app.get(prefix + "/incident", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getIncident("*"), function (error, results, fields) {
				// And done with the connection.

				if (error || Object.keys(results).length == 0) {
					res.status(500).json([{
						res: "fail",
						details: "cannot find that item"
					}]);
				} else res.status(200).json(JSON.parse(JSON.stringify(results)));
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});


	app.get(prefix + "/utilisateurs/info", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getUsersInfo(), function (error, results, fields) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					var usersList = users.buildUsersJSON(
						JSON.parse(JSON.stringify(results)),
						user_schema_user
					);
					if (Object.keys(usersList).length == 0)
						res.status(400).json([{
							res: "fail",
							detail: error
						}]);
					else res.status(200).json(JSON.parse(JSON.stringify(usersList)));
				}
				connection.release();
			});
		});
	});

	app.get(prefix + "/incident/utilisateur=:destinataire", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getIncidentsFor(req.params.destinataire), function (
				error,
				results,
				fields
			) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						details: error
					}]);
				} else {
					if (Object.keys(results).length == 0) {
						res.status(400).json([{
							res: "fail",
							details: "cannot find that item"
						}]);
					} else {
						res.status(200).json(JSON.parse(JSON.stringify(results)));
					}
				}
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.get(prefix + "/destinataire/incident=:id", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getDestForIncident("" + req.params.id), function (
				error,
				results,
				fields
			) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						details: error
					}]);
				} else {
					if (Object.keys(results).length == 0) {
						res.status(400).json([{
							res: "fail",
							details: "cannot find that item"
						}]);
					} else {
						res.status(200).json(JSON.parse(JSON.stringify(results)));
					}
				}
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.get(prefix + "/incident/enum/:name", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			if (req.params.name == "admin")
				res.redirect("/incident/enum/utilisateur");
			// Use the connection
			else
				connection.query(data.getTable("" + req.params.name), function (
					error,
					results,
					fields
				) {
					// And done with the connection.
					if (error || Object.keys(results).length == 0) {
						res.status(500).json([{
							res: "fail",
							details: "cannot find that table"
						}]);
					} else res.status(200).json(JSON.parse(JSON.stringify(results)));
					connection.release();

					// Don't use the connection here, it has been returned to the pool.
				});
		});
	});


	//only with passwords
	app.post(prefix + "/auth", (req, res) => {
		user_schema_user.name = req.body.username;
		user_schema_user.password = req.body.password;
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getUsers(), function (error, results, fields) {
				// And done with the connection.
				if (error) {
					res.status(500).json({
						res: "fail",
						detail: error
					});
				} else {
					var authName = users.badAuth(
						JSON.parse(JSON.stringify(results)),
						user_schema_user
					);
					if (Object.keys(authName).length == 0)
						res.status(400).json({
							res: "fail",
							detail: "bad login or password"
						});
					else
						res.status(200).json({
							nom: authName,
							token: "this-is-a-token_trust-me"
						});
				}
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.put(prefix + "/incident/update/:id", (req, res) => {
		// console.log(req.body);
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(
				data.updateIncident(req.body, "" + req.params.id),
				function (error, results, fields) {
					// And done with the connection.

					if (error) {
						res.status(400).json([{
							res: "fail",
							details: error
						}]);
					} else
						res.status(200).json({
							res: "success"
						});
					connection.release();

					// Don't use the connection here, it has been returned to the pool.
				}
			);
		});
	});

	app.post(prefix + "/upload/image", (req, res) => {
		console.log(req.files); // the uploaded file object
		if (!req.files) return res.status(400).send("No files were uploaded.");
		// if (req.files) return res.status(400).send("No files were uploaded.");

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.avatar;
		const format = sampleFile.mimetype;
		if (format == 'image/png' ? false : format == 'image/jpeg' ? false : format == 'image/gif' ? false : true)
			return res.status(400).send("Incorrect file format.");

		// Use the mv() method to place the file somewhere on your server
		sampleFile.mv("/opt/lampp/htdocs/img/avatars/users/" + sampleFile.name,
			function (err) {
				if (err) return res.status(500).send(err);
				res.status(200).send("File uploaded!");
			});
	});


	/*notifications*/


	app.get(prefix + "/notifications/incident=:id", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getNotifications(req.params.id), function (
				error,
				results,
				fields
			) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						details: error
					}]);
				} else {
					if (Object.keys(results).length == 0) {
						res.status(204).json([{
							res: "no notifications"
						}]);
					} else {
						res.status(200).json(JSON.parse(JSON.stringify(results)));
					}
				}
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.get(prefix + "/notifications/notification=:id", (req, res) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.getNotificationsDestinataire(req.params.id), function (
				error,
				results,
				fields
			) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						details: error
					}]);
				} else {
					if (Object.keys(results).length == 0) {
						res.status(400).json([{
							res: "fail",
							details: "cannot find that item"
						}]);
					} else {
						res.status(200).json(JSON.parse(JSON.stringify(results)));
					}
				}
				connection.release();

				// Don't use the connection here, it has been returned to the pool.
			});
		});
	});

	app.post(prefix + '/notifications/add', function (req, res) {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			connection.query(data.addNotification(req.body), function (error, results, fields) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					res.status(200).json({
						res: "success"
					});
				};
				connection.release();
			});
		});

	});

	app.post(prefix + '/notifications/addtargets', function (req, res) {
		var notifId;
		var targetsArray = [];
		var targetsIdArray = []
		req.body.destinataires.forEach(element => {
			targetsArray.push('"' + element + '"');
		});

		pool.getConnection(function (err, connection) {
			if (err) throw err;
			// Use the connection
			var notifIdResponse = connection.query("SELECT MAX(id_notification) AS maxId FROM notification", function (error, results, fields) {
				// And done with the connection.
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					notifId = results[0].maxId;
					console.log("notifId : " + notifId);
					console.log(targetsArray);
					var usersIdResponse = connection.query("(SELECT id_utilisateur AS userId FROM utilisateur WHERE nom IN (" + targetsArray + "))", function (error, results, fields) {
						// And done with the connection.
						if (error) {
							res.status(500).json([{
								res: "fail",
								detail: error
							}]);
						} else {
							results.forEach(element => {
								targetsIdArray.push(element.userId);
							});
							connection.query(data.addNotificaitonTarget(req.body, notifId, targetsIdArray), function (error, results, fields) {
								// And done with the connection.
								if (error) {
									res.status(500).json([{
										res: "fail",
										detail: error
									}]);
								} else {
									res.status(200).json({
										res: "success"
									});
								};
								connection.release();
							});
						};
					});
				};
			});

		});
	});


	/*utilisateurs*/

	app.put(prefix + '/utilisateur/update/admin', function (req, res) {
		console.log(req.body);

		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.updateUserWithAdminChange(req.body), function (error, results, fields) {
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					res.status(200).json({
						res: "success"
					});
				};
				connection.release();
			})
		})
	});

	app.put(prefix + '/utilisateur/update', function (req, res) {
		console.log(req.body);
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.updateUserWithOutAdminChange(req.body), function (error, results, fields) {
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					res.status(200).json({
						res: "success"
					});
				};
				connection.release();
			})
		});
	})

	app.post(prefix + '/utilisateur/add', function (req, res) {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.addUser(req.body), function (error, results, fields) {
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					res.status(200).json({
						res: "success"
					});
				};
				connection.release();
			})
		});
	})

	app.post(prefix + '/incident/add', function (req, res) {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(data.addIncident(req.body), function (error, results, fields) {
				if (error) {
					res.status(500).json([{
						res: "fail",
						detail: error
					}]);
				} else {
					res.status(200).json({
						res: "success"
					});
				};
				connection.release();
			})
		});
	})

}