// query.js
'use strict';

const mysql = require('mysql');

module.exports = class Query {

	constructor() {}

	getIncident(id) {
		var row = ""
		if (id != "*") {
			row = "WHERE incident.id_incident = " + id;
		}
		return 'SELECT incident.id_incident, incident.date, utilisateur.nom, incident.declaration, criticite.ampleur, localisation.lieu, avancement.etat, incident.date_de_creation ' +
			'FROM incident ' +
			'INNER JOIN criticite ON incident.id_criticite = criticite.id_criticite ' +
			'INNER JOIN localisation ON incident.id_localisation = localisation.id_localisation ' +
			'INNER JOIN utilisateur ON incident.id_auteur = utilisateur.id_utilisateur ' +
			'INNER JOIN avancement ON incident.id_avancement = avancement.id_avancement ' +
			row + ' ORDER BY `incident`.`id_incident` ASC';
	}

	getTable(table) {
		return 'SELECT * FROM ' + table;
	}

	getUsers() {
		return 'SELECT utilisateur.nom AS user, mot_de_passe AS password FROM utilisateur JOIN admin ON utilisateur.id_utilisateur = admin.id_admin';
	}

	getUsersInfo() {
		return 'SELECT u.id_utilisateur AS id, u.nom As nom, a.mot_de_passe AS admin, avatars.image_file AS img FROM utilisateur u LEFT OUTER JOIN admin a ON u.id_utilisateur = a.id_admin ' +
			'INNER JOIN avatars ON u.id_avatar = avatars.id_image';
	}

	//issues with this query
	getAdmins() {
		return 'SELECT u.nom , a.mot_de_passe FROM utilisateur u, admin a ON u.id_utilisateur = a.id_admin WHERE a.mot_de_passe <> null';
	}

	// addIncident(payload) {
	// 	var sql = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
	// 	var params = ['incident', 'date', 'id_auteur', 'declaration', 'id_criticite', 'id_localisation', 'id_avancement', payload.date, payload.id_utilisateur, payload.declaration, payload.id_criticite, payload.id_localisation, payload.id_avancement];
	// 	return mysql.format(sql, params);
	// }

	updateIncident(payload, id) {
		var row = " WHERE i.id_incident = " + id;
		var criticite = '(SELECT id_criticite FROM criticite WHERE ampleur="' + payload.ampleur + '")';
		var localisation = '(SELECT id_localisation FROM localisation WHERE lieu="' + payload.lieu + '")';
		var avancement = '(SELECT id_avancement FROM avancement WHERE etat="' + payload.etat + '")';
		var sql = 'UPDATE incident i SET i.declaration="' + payload.declaration + '",i.id_criticite=' + criticite + ',i.id_localisation=' + localisation + ',i.id_avancement=' + avancement + row;
		// console.log(sql);
		return sql;
	}

	deleteIncident(id) {
		return 'DELETE FROM `attribution_incident` WHERE `id_partage` = ' + id + "; " +
			'DELETE FROM `attribution_notification` WHERE `id_notification` = ' + id + "; " +
			'DELETE FROM `incident` WHERE `id_incident` = ' + id + "; ";
	}

	getIncidentsFor(destinataire) {
		var row = ""
		if (destinataire != "*") {
			row = 'WHERE utilisateur.nom = "' + destinataire + '"';
		}
		return 'SELECT DISTINCT incident.id_incident, incident.date, utilisateur.nom, incident.declaration, criticite.ampleur, localisation.lieu, avancement.etat, incident.date_de_creation ' +
			'FROM incident ' +
			'INNER JOIN attribution_incident ON attribution_incident.id_partage = incident.id_incident ' +
			'INNER JOIN criticite ON incident.id_criticite = criticite.id_criticite ' +
			'INNER JOIN localisation ON incident.id_localisation = localisation.id_localisation ' +
			'INNER JOIN utilisateur ON incident.id_auteur = utilisateur.id_utilisateur ' +
			'INNER JOIN avancement ON incident.id_avancement = avancement.id_avancement ' +
			'WHERE EXISTS (SELECT attribution_incident.id_partage from attribution_incident ' +
			'INNER JOIN utilisateur ON attribution_incident.id_destinataire = utilisateur.id_utilisateur ' +
			row + ' AND attribution_incident.id_partage = incident.id_incident)';
	}

	getDestForIncident(id) {
		var row = ""
		if (id != "*") {
			row = " WHERE attribution_incident.id_partage = " + id;
		}
		return 'SELECT utilisateur.nom from utilisateur INNER JOIN attribution_incident on utilisateur.id_utilisateur = attribution_incident.id_destinataire' +
			row;
	}

	addDestinataire(payload, results) {
		var sql = "INSERT INTO attribution_incident (id_partage,id_destinataire) VALUES ? ";
		var params = [];
		for (var i = 0, len = payload.utilisateurs.length; i < len; i++) {
			params.push([results.insertId, payload.utilisateurs[i]]);
		}
		return mysql.format(sql, [params]);
	}

	getNotificationsDestinataire(dest) {
		var row = ""
		if (dest != "*") {
			row = 'HAVING username = "' + dest + '"';
		}
		return 'SELECT utilisateur.nom FROM utilisateur ' +
			'INNER JOIN attribution_notification ON utilisateur.id_utilisateur = attribution_notification.id_destinataire ' +
			'WHERE attribution_notification.id_notification = ' + dest;
	}

	deleteUser(id) {
		return 'DELETE FROM utilisateur WHERE utilisateur.id_utilisateur = ' + id;
	}

	getNotifications(id_incident) {
		return 'SELECT notification.id_notification, notification.id_incident, notification.id_auteur, notification.description FROM notification' +
			' WHERE notification.id_incident=' + id_incident;
	}

	addNotification(req) {
		var id_auteur = '(SELECT id_utilisateur FROM utilisateur WHERE nom=' + '"' + req.auteur + '")';
		var description = '"' + req.description + '"';
		var sql = "INSERT INTO notification (id_incident,id_auteur,description) VALUES (" + req.id_incident + "," + id_auteur + "," + description + ")";
		return sql;
	}

	addNotificaitonTarget(req, lastNotifId, targetsIdArray) {
		var params = []
		targetsIdArray.forEach(element => {
			params.push("(" + lastNotifId + "," + element + ")");
		});
		var sql = "INSERT INTO attribution_notification (id_notification,id_destinataire) VALUES " + params;
		return sql;

	}

	getAvatars() {
		return "SELECT * FROM avatars";
	}

	updateUserWithOutAdminChange(req) {
		let firstRequest = "";
		console.log(req.password);
		if (req.admin && req.password != "vfeh'iuhu_è_àè)_èè)_fefre_g)re_g") {
			firstRequest = "UPDATE admin SET admin.mot_de_passe = '" + req.password + "' WHERE admin.id_admin = " + req.id + ";";
		}
		const id_avatar = "(SELECT id_image FROM avatars WHERE image_file = '" + req.avatar + "')";
		return firstRequest + "UPDATE utilisateur SET utilisateur.nom = '" + req.nom + "', utilisateur.id_avatar = " +
			id_avatar + " WHERE utilisateur.id_utilisateur = " + req.id;
	}

	updateUserWithAdminChange(req) {
		const id_avatar = "(SELECT id_image FROM avatars WHERE image_file = '" + req.avatar + "')";
		let firstRequest = "";
		if (req.admin) {
			firstRequest = "INSERT INTO admin (id_admin, mot_de_passe) VALUES (" + req.id + ", '" + req.password + "');";
		} else {
			firstRequest = "DELETE FROM admin WHERE admin.id_admin = " + req.id + ";";
		}

		const heartRequest = "UPDATE utilisateur SET utilisateur.nom = '" + req.nom + "', utilisateur.id_avatar = " + id_avatar +
			" WHERE utilisateur.id_utilisateur = " + req.id;
		return firstRequest + heartRequest;
	}

	addUser(req) {
		return "INSERT INTO utilisateur (nom, id_avatar) VALUES ('" + req.nom + "', (SELECT id_image FROM avatars WHERE image_file = '" + req.avatar + "' ));"
	}

	addIncident(req) {
		const declaration = "alarme déclenchée dans " + req.lieu + " à " + req.hour + ":" + req.min;
		return "INSERT INTO incident (declaration, id_auteur, id_criticite, id_localisation, id_avancement, date) " +
			"VALUES ('" + declaration + "', '3', '4', '1', '1', '" + req.date + "')";
	}

}