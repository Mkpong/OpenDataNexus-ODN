import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [confirmPassword , setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    'email': "",
    'name': "",
    'passwd': ""
  });

  const onChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setRegisterData({
      ...registerData,
      [id]:value
    });
  }

  const handleEmailValidation = () => {
    // 여기서 이메일 중복 확인 로직을 구현합니다.
    if (registerData.email === '') {
      setEmailError('이메일을 입력해주세요.');
    } else {
      axios.post("http://220.149.232.224:30080/api/user/register/email" , {'email': registerData.email})
      .then((response) => {
        if(response.data.message === 'Ok'){
          console.log("success");
          setEmailError('가입 가능한 이메일 입니다 :)')
          setIsEmailValid(true);ㅏㅕ
        }
        else{
          console.log("already Existing")
          setEmailError('이미 존재하는 이메일입니다 :(')
        }
      }).catch((error) => console.log(error))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if(registerData.passwd !== confirmPassword){
      alert("비밀번호와 확인이 일치하지 않습니다!")
    }
    else if(!isEmailValid){
      alert("이메일 확인을 진행해주세요")
    }
    else {
    // 회원가입 요청을 보내고 처리하는 로직을 구현합니다.
    axios.post("http://220.149.232.224:30080/api/user/register", registerData)
    .then((response) => {
      console.log(response.data.message);
      navigate("/");
    }).catch((error) => {console.log(error)})
    }
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
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={onChange}
                      id="email"
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
                  <Form.Group className={styles.nameForm}> {/* 이름 입력칸 */}
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      onChange={onChange}
                      id="name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <Form.Group className={styles.passwordForm}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={onChange}
                      id="passwd"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Form.Group className={styles.passwordForm}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
