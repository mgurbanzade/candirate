import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from './LoginForm/LoginForm';
import scss from './Login.module.scss';

const LoginPageComponent = () => {
  return (
    <Container>
      <Row>
        <Col lg="4" />
        <Col lg="4">
          <LoginForm />
        </Col>
        <Col lg="4" />
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
