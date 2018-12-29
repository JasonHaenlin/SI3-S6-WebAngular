export interface NotificationModel {
	id_notification: number;
	id_incident:number,
	auteur:string,
	destinataires:string[],
	description:string,
}
