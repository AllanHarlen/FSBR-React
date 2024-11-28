import './LayoutPrincipal.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, StepBackwardOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const LayoutPrincipal: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/produtos">Produtos</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/categorias">Categoria</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<StepBackwardOutlined />} onClick={handleLogout}>  {/* Adicionei o evento de logout */}
              Sair
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {/* O conteúdo será injetado aqui com o Outlet */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutPrincipal;
