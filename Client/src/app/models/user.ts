export interface UserInfoModel {
  id: number;
  nom: string;
  admin: boolean;
  avatar: string;
}

export interface AvatarModel {
  id_image : number;
  image_file : string;
}

export interface UserWithPassword {
  id: number;
  nom: string;
  admin: boolean;
  avatar: string;
  password : string;
}