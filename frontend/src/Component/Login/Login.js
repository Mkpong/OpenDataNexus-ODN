import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 로그인 요청을 보내고 처리하는 로직을 구현합니다.
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignup = () => {
    // 회원가입 페이지로 이동하는 로직을 추가합니다.
    console.log('Redirect to signup page');
  };

  return (
    <Container className={styles.loginContainer}>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="border p-4">
            <h2 className="mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className={styles.emailForm}>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className={styles.passwordForm}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.loginButton}>
                Submit
              </Button>
            </Form>
            <Row>
                <Col className={styles.registText}>
                아직 회원이 아니신가요?
                </Col>
            </Row>
            <Row>
                <Col>
                    회원가입 후 많은 데이터 셋을 다운받아 보세요!
                </Col>
            </Row>
            <Button as={Link} to="/register" variant="secondary" onClick={handleSignup} className={styles.signupButton}>
              Sign Up
            </Button>
            <div className="mt-3">
              <Button variant="link" className={styles.linkButton}>
                Find Email
              </Button>
              <Button variant="link" className={styles.linkButton}>
                Find Password
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
