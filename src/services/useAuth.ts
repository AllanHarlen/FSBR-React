import { useState } from "react";
import { AuthResponse, UsuarioRequest } from "../types/Usuario";
import { useAutorizarUsuarioMutation } from "./apiSlice";

export const useAuth = () => {
  const [autorizarUsuario] = useAutorizarUsuarioMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (loginData: UsuarioRequest) => {
    setLoading(true);
    setError(null);

    try {
      const result = await autorizarUsuario(loginData);

      if ("data" in result && result.data) {
        const { auth, usuario } = result.data as AuthResponse;
        localStorage.setItem("token", auth);
        localStorage.setItem("user", JSON.stringify(usuario));
        return usuario;
      } 
      else if ("error" in result) {
        setError(
          (result.data as any)?.error || "Erro ao autenticar. Tente novamente mais tarde."
        );
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

  return { login, logout, getToken, loading, error };
};
