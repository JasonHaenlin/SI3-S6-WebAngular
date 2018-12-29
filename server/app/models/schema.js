// schemas.js
'use strict';

var schemas = {
  user: {
    id: null,
    name: null,
    password: null,
    avatar: null,
  },
  notification:{
	id_notification:null,
	id_incident:null,
	id_auteur:null,
	id_destinataires:"",
	description:null,
  }
}


module.exports = schemas;
