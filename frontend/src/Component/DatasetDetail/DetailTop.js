import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './DetailTop.module.css'
import axios from 'axios';

const handleDownload = (bucketName) => {
  // 서버에 GET 요청을 보냅니다.
  axios({
    url: 'http://220.149.232.224/api/data/download/all/' + bucketName,
    method: 'GET',
    responseType: 'blob'
  }).then(response => {
    console.log(response.data)
    // 파일 다운로드가 성공적으로 완료되었을 때의 처리
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', bucketName + '.zip');  // 실제 파일명을 지정합니다.
    document.body.appendChild(link);
    link.click();
  }).catch(error => {
    // 파일 다운로드가 실패했을 때의 처리
    alert("다운로드 할 수 없습니다!")
  });
};


const DetailTop = () => {
  return (
    <Container className={styles.datasetDetailContainer}>
      <Row className="justify-content-center">
        <Col md={10} className={styles.detailCard}>
          <Row>
            <Col md={2} className="text-center">
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
            </Col>
            <Col md={10}>
              <Row className={styles.tags}>
                <Col md={2} className={styles.tag}>#코퍼스</Col>
                <Col md={2} className={styles.tag}>#감성대화</Col>
                <Col md={2} className={styles.tag}>#감성 챗봇</Col>
                <Col md={2} className={styles.tag}>#우울증 예방</Col>
              </Row>
              <Row className={styles.datasetTitle}>감성 대화 말뭉치</Row>
              <Row className={styles.datasetInfo}>
                분야: 한국어 , 유형: 오디오, 텍스트
              </Row>
              <Row className={styles.datasetDetails}>
                구축년도: 2020, 갱신년월: 2022-12,
                조회수: 82,909, 
                다운로드: 10,136, 
                용량: 20.35 MB
              </Row>
              <Row className={styles.buttons}>
                <Col md={{ span: 2, offset: 10 }} className="d-flex justify-content-end">
                <Button variant="danger" className={styles.downloadButton} onClick={() => handleDownload("test-bucket")}>다운로드</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTop;
