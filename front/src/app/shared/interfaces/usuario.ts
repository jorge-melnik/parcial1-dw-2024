export interface UsuarioPost {
  username: string;
  email: string;
  is_admin: boolean;
}

export interface Usuario extends UsuarioPost {
  id_usuario: number;
  image_url: string;
}
