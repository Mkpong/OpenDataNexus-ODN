import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {loginUser, logoutUser} from '../../Actions/UserAction';
import allActions from '../../Store';

// userLogin, userLogout 추가 해야함

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 로그인 요청을 보내고 처리하는 로직을 구현합니다.
    axios.post("http://220.149.232.224/api/user/login" , {"email": email, "passwd": password})
    .then((response) => {
      console.log(response.data);
      const token = response.data.token;
      const userData = {"email": response.data.email, "token": token};
      dispatch(allActions.UserAction.loginUser(userData));
      navigate("/");
    }).catch((error) => {
      if(error.response.status === 401){
        alert("아이디 또는 비밀번호가 일치하지 않습니다!");
      }
    })
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
            <Button as={Link} to="/register" variant="secondary" className={styles.signupButton}>
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
