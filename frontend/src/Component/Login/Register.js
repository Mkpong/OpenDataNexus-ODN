import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Register.module.css';

const Register = () => {
  const [name, setName] = useState(''); // 이름 상태 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailValidation = () => {
    // 여기서 이메일 중복 확인 로직을 구현합니다.
    if (email === '') {
      setEmailError('이메일을 입력해주세요.');
    } else {
      // 이메일 중복 확인 로직을 호출하고, 결과에 따라 에러 메시지를 업데이트합니다.
      setEmailError('가입 가능한 이메일입니다!');
      setIsEmailValid(true);
    }
  };

  const handlePasswordValidation = () => {
    // 비밀번호가 비밀번호 확인과 일치하는지 확인합니다.
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일 중복 확인 및 비밀번호 일치 여부를 검사합니다.
    handleEmailValidation();
    handlePasswordValidation();

    // 회원가입 요청을 보내고 처리하는 로직을 구현합니다.
    console.log('Name:', name); // 이름 추가
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Container className={styles.registerContainer}>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="border p-4">
            <h2 className="mb-4">Register</h2>
            <Form onSubmit={handleSubmit}>

              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isEmailValid} // 이메일이 유효하면 수정 불가능하도록 설정
                    />
                    <Form.Text className="text-danger">{emailError}</Form.Text>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Button
                    variant="secondary"
                    onClick={handleEmailValidation}
                    className="mt-4"
                    disabled={isEmailValid} // 이메일이 유효하면 버튼 비활성화
                  >
                    이메일 중복 확인
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formBasicName" className={styles.nameForm}> {/* 이름 입력칸 */}
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formBasicPassword" className={styles.passwordForm}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Form.Group controlId="formBasicConfirmPassword" className={styles.passwordForm}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Text className="text-danger">{passwordError}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className={styles.registerButton}>
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
