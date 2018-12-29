export interface incidentStatesModel {
  id_avancement: number;
  etat: string;
};

export interface userModel {
  id_utilisateur: number;
  nom: string;
};

export interface criticiteModel {
  id_criticite: number;
  ampleur: string;
}

export interface localisationModel {
  id_localisation: number;
  lieu: string;
}
