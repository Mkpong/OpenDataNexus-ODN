import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from './UploadMain.module.css';
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function UploadMain() {
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    // const navigate = useNavigate();

    useEffect(() => {
      console.log(currentUser);
    } ,[currentUser])

    const [metadata, setMetadata] = useState({
        "userEmail": "",
        "bucketName" : "",
        "overview": "",
        "details": "",
        "useMethods": "",
        "field": "",
        "type": "",
    });

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        setMetadata({
          ...metadata,
          [id]:value
        });
      }

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    // 파일을 처리하는 로직을 여기에 추가합니다.

    try {
        const response = await axios.post('http://220.149.232.224/api/dataset/metadata', metadata);
        console.log('metadata uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading metadata:', error);
    }

    selectedFiles.forEach(async (file, index) => {
        const formData = new FormData();
        formData.append("file${index}" , file);
        try {
            const response = await axios.post('http://220.149.232.224/api/dataset/data', metadata);
            console.log('metadata uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading metadata:', error);
        }
    })
};

    const handleButtonClick = () => {
    fileInputRef.current.click();
    };

    return (
        <Container>
            <Row className={styles.mainTop}>
            <Col md={{span:4, offset:4}} className={styles.mainTitle}>Upload Dataset</Col>
            </Row>
            <Container className={styles.topContainer}>
            <Row className={styles.row1}>
                <Col md={{span:2, offset:2}}>
                    <Form.Group>
                    <Form.Label>Field</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>---</option>
                        <option>한국어</option>
                        <option>영상이미지</option>
                        <option>헬스케어</option>
                        <option>교통물류</option>
                        <option>재난안전환경</option>
                        <option>농축수산</option>
                        <option>문화관광</option>
                        <option>스포츠</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group controlId="formSelectExample">
                    <Form.Label>Type</Form.Label> {/* 라벨 추가 */}
                    <Form.Select aria-label="Default select example">
                        <option>---</option>
                        <option>이미지</option>
                        <option>비디오</option>
                        <option>텍스트</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                    <Form.Label>BucketName</Form.Label>
                    <Form.Control type="text" placeholder="데이터 셋 이름을 입력하세요." />
                    </Form.Group>
                </Col>
                <Col md={2} className={styles.saveButton}>
                    <Button onClick={handleSubmit}>저장</Button>
                </Col>
            </Row>
            </Container>
            <Container className={styles.bodyContainer}>
                <Row>
                    <Col md={{span: 7, offset:1}}>
                        <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Dataset Overview</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Dataset Details</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Dataset How to use</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                        </Row>
                    </Col>
                    <Col md={3} className={styles.fileForm}>
                        <Row className="mb-3">
                            <Col md={{span:7, offset:2}} className={styles.uploadTitle}>File Upload</Col>
                            <Col md={3}>
                            <form onSubmit={handleSubmit}>
                                <input
                                type="file"
                                webkitdirectory="true"
                                directory="true"
                                multiple
                                onChange={handleFileChange}
                                ref = {fileInputRef}
                                style={{display:'none'}}
                                />
                                <Button type="button" variant="light" onClick={handleButtonClick}>
                                    <img src="../../../image/plusButton.png" className={styles.uploadImage}></img>
                                </Button>
                            </form>
                            </Col>
                        </Row>
                        <ul className={styles.fileList}>
                            {selectedFiles.map((file, index) => (
                            <li key={index} className={styles.fileItem}>{file.name}</li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>Input Tag</Col>
                </Row>
            </Container>
        </Container>
    );
}

export default UploadMain;