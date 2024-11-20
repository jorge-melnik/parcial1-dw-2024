export interface UsuarioPost {
  username: string;
  email: string;
  contraseña: string;
  contraseña2: string;
}

export interface Usuario {
  id_usuario: number;
  username: string;
  email: string;
  is_admin: boolean;
  image_url: string;
}
