export interface Usuario {
    id: string;
    login: string;
  }
  
export interface AuthResponse {
    auth: string;
    usuario: Usuario;
  }
  
export interface UsuarioRequest {
    login: string;
    senha: string;
  }