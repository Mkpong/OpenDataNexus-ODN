import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import styles from './DetailTop.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const handleDownload = (bucketName, bucketId) => {
  // 서버에 GET 요청을 보냅니다.
  axios({
    url: 'http://220.149.232.224/api/transfer/download/all/' + bucketId,
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
    axios.put(`http://220.149.232.224/api/dataset/data/downloadcnt/${bucketId}`)
  }).catch(error => {
    // 파일 다운로드가 실패했을 때의 처리
    alert("다운로드 할 수 없습니다!")
  });
};

const DetailTop = (props) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const currentUser = useSelector(state => state.currentUser);

  const handleUpdate = (bucketName, id) => {
    navigate(`/update/${id}`);
  }

  useEffect(() => {
    if(currentUser.login){
      setUserEmail(currentUser.user.email);
    }
  }, [])

  const handleDelete = () => {
    axios.delete(`http://220.149.232.224/api/dataset/metadata?id=${props.dataset.id}`)
    .then((response) => {
      console.log(response);
      window.location.href = "/";
    }).catch((error) => console.log(error));
  }

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
                <Col md={2} className={styles.tag}>#Tag1</Col>
                <Col md={2} className={styles.tag}>#Tag2</Col>
                <Col md={2} className={styles.tag}>#Tag3</Col>
                <Col md={2} className={styles.tag}>#Tag4</Col>
              </Row>
              <Row className={styles.datasetTitle}>{props.dataset.bucketName}</Row>
              <Row className={styles.datasetInfo}>
                분야: {props.dataset.field} , 유형: {props.dataset.type}
              </Row>
              <Row className={styles.datasetDetails}>
                구축일자: {props.dataset.createAt}, {props.dataset.updateAt && <>갱신일자: {props.dataset.updateAt}, </>}
                다운로드: {props.dataset.downloadCnt}회, 
                용량: {props.dataset.size}MB
              </Row>
              <Row className={styles.buttons}>
                <Col md={{span:4, offset:8}} className="d-flex justify-content-end">
                {props.dataset.isModify && (
                  <Button variant="primary" className={styles.downloadButton} onClick={() => handleUpdate(props.dataset.bucketName, props.dataset.id)}>추가</Button>
                )}
                {(userEmail === props.dataset.userEmail) && (<Button variant="primary" className={styles.downloadButton} onClick={() => handleDelete()}>삭제</Button>)}
                <Button variant="danger" className={styles.downloadButton} onClick={() => handleDownload(props.dataset.bucketName, props.dataset.bucketId)}>다운로드</Button>
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
