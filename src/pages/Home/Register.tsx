import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import { useAdicionarUsuarioMutation } from "../../services/apiSlice";
import { useAuth } from "../../services/useAuth";

const Register: React.FC = () => {
  const [adicionarUsuario, { isLoading }] = useAdicionarUsuarioMutation();
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { login, loading, error } = useAuth();

  const traduzirErro = (errorCode: string) => {
    const traducoes: Record<string, string> = {
      PasswordRequiresNonAlphanumeric:
        "As senhas devem ter pelo menos um caractere não alfanumérico.",
      PasswordRequiresLower: "As senhas devem ter pelo menos uma letra minúscula ('a'-'z').",
      PasswordRequiresUpper: "As senhas devem ter pelo menos uma letra maiúscula ('A'-'Z').",
      DuplicateUserName: "O nome de usuário já está em uso.",
    };
    return traducoes[errorCode] || "Erro ao validar os dados fornecidos.";
  };

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const dadosCreate = {
        login: values.username,
        senha: values.password,
      }

      const result = await adicionarUsuario(dadosCreate);

      if ("data" in result) {
        setServerMessage({ type: "success", message: "Usuário registrado com sucesso!" });
        await login(dadosCreate);
        navigate("/produtos");
      } 
      else if ("error" in result) {
        const errorResponse = (result.error as any)?.data;
        if (Array.isArray(errorResponse)) {
          const firstError = errorResponse[0];
          const mensagem = traduzirErro(firstError.code);
          setServerMessage({ type: "error", message: mensagem });
        } else {
          setServerMessage({ type: "error", message: "Erro ao registrar usuário!" });
        }
      }
    } catch (error) {
      setServerMessage({ type: "error", message: "Erro desconhecido ao registrar usuário." });
    }
  };

  return (
    <div className="register-container">
      <Form name="register" className="register-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Nome de Usuário"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu nome de usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirme a Senha"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Por favor, confirme sua senha!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("As senhas não coincidem!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {serverMessage && (
          <Form.Item>
            <Alert
              message={serverMessage.message}
              type={serverMessage.type}
              showIcon
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
            loading={isLoading}
          >
            Registrar
          </Button>
        </Form.Item>

        <div className="login-link">
          <p>
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
