// src/pages/index/Index.jsx

import React from 'react';
import { Layout, Menu, Button, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import './HomePage.css';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">Mi Empresa</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="menu">
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
        
        </Menu>
        <Button type="primary" className="login-button">
          <Link to="/login">Login</Link>
        </Button>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row className="hero" justify="center" align="middle">
            <Col span={24} style={{ textAlign: 'center' }}>
              <h1>Bienvenido a Mi Empresa</h1>
              <p>Tu éxito es nuestro compromiso.</p>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} className="card">
            <Card title="Quiénes Somos">
              <p>Somos una empresa dedicada a brindar soluciones tecnológicas innovadoras.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} className="card">
            <Card title="Información de la Empresa">
              <p>Fundada en 2020, nuestra misión es proporcionar tecnología de vanguardia para empresas de todo el mundo.</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} className="card">
            <Card title="Contáctanos">
              <p>Email: info@miempresa.com</p>
              <p>Teléfono: +1 234 567 890</p>
            </Card>
          </Col>
        </Row>
        <p style={{ marginTop: '20px' }}>&copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
      </Footer>
    </Layout>
  );
};

export default HomePage;
