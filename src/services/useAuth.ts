import { useState } from "react";
import { AuthResponse, UsuarioRequest } from "../types/Usuario";
import { useAutorizarUsuarioMutation } from "./apiSlice";

export const useAuth = () => {
  const [autorizarUsuario] = useAutorizarUsuarioMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para verificar se o token expirou
  const isTokenExpired = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      const expDate = decoded.exp * 1000;
      return Date.now() >= expDate;
    } 
    catch (e) {
      return true;
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    console.log("Token:" + Boolean(isTokenExpired));
    return token && !isTokenExpired(token);
  };

  const login = async (loginData: UsuarioRequest) => {
    setLoading(true);
    setError(null);

    try {
      const result = await autorizarUsuario(loginData);

      if ("data" in result && result.data) {
        const { auth, usuario } = result.data as AuthResponse;
        localStorage.setItem("token", auth);  // Armazenando o token
        localStorage.setItem("user", JSON.stringify(usuario)); // Armazenando o usuário
        return usuario;
      } 
      else if ("error" in result) {
        setError((result.data as any)?.error || "Erro ao autenticar. Tente novamente mais tarde.");
      }
    } 
    catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } 
    finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const getToken = () => localStorage.getItem("token");

  return { login, logout, isAuthenticated, getToken, loading, error };
};
