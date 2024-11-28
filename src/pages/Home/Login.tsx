import "./Login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/useAuth";

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { login: string; senha: string }) => {
    const user = await login(values);
    if (user) {
      navigate("/produtos");
    }
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu login!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
          />
        </Form.Item>
        <Form.Item
          name="senha"
          rules={[
            {
              required: true,
              message: "Por favor, insira sua senha!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        {error && (
          <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
        )}

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar de mim</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Esqueceu sua senha?
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Entrar
          </Button>
          Ou <Link to="/register"> registre-se agora!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
