//user.js
'use strict';

module.exports = class User {

  constructor() {}

  badAuth(array, user_schema) {
    var selected_user = "";
    array.forEach(element => {
      if ((element.user === user_schema.name) && (element.password === user_schema.password))
        selected_user = element.user;
    });
    return selected_user;
  }

  buildUsersJSON(array) {
    var list_users = [];
    var admin;
    array.forEach(element => {
      if (element.admin == null) admin = false;
      else admin = true;
      list_users.push({
        id: element.id,
        nom: element.nom,
        admin: admin,
        avatar: element.img
      });
    });
    return list_users;
  }

  BuildAdminsJson(array) {
    var admins = [];
    array.forEach(element => {
      admins.push({
        nom: element.user
      });
    });
    return admins;
  }
}
