import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from './UpdateMain.module.css';
import { useDispatch } from "react-redux";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateMain() {
    const { id } = useParams(); // URL에서 id 매개변수를 가져옵니다.
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [metadata, setMetadata] = useState({
        "id": null,
        "bucketName" : "",
        "overview": "",
        "details": "",
        "useMethods": "",
        "field": "",
        "type": "",
        "isModify": true
    });

    const [isCheckedPublic, setIsCheckedPublic] = useState(false);
    const [isCheckedPrivate, setIsCheckedPrivate] = useState(false);


    useEffect(() => {
        axios.get(`http://220.149.232.224:30080/api/dataset/one?id=${id}`)
        .then((response) => {
            setMetadata({
                ...metadata,
                ["bucketName"]: response.data.bucketName,
                ["overview"]: response.data.overview,
                ["details"]: response.data.details,
                ["useMethods"]: response.data.useMethods,
                ["field"]: response.data.field,
                ["type"]: response.data.type,
                ["isModify"]: response.data.isModify,
                ['id']: id
            })
            if(metadata.isModify == true){
                setIsCheckedPublic(true);
            }
            else{
                setIsCheckedPrivate(true);
            }
        })
    } ,[])


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

    const handleSave = async (event) => {
        event.preventDefault();

        if(currentUser.login){
            setMetadata({
                ...metadata,
                ["userEmail"]: currentUser.user.email
            })
        }
        // 파일을 처리하는 로직을 여기에 추가합니다.
        try {
            const response = await axios.put('http://220.149.232.224:30080/api/dataset/metadata', metadata);
            const bucketId = response.data.bucketId;
            console.log(response.data);
            selectedFiles.forEach(async (file, index) => {
                const formData = new FormData();
                formData.append(`file` , file);
                try {
                    const response = await axios.post(`http://220.149.232.224:30080/api/dataset/data/${bucketId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (error) {
                }
            })
            axios.put(`http://220.149.232.224:30080/api/dataset/data/size/${bucketId}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
            navigate("/");
        } catch (error) {
        }
    };

    const handleButtonClick = () => {
    fileInputRef.current.click();
    };

    return (
        <Container>
            <Row className={styles.mainTop}>
            <Col md={{span:4, offset:4}} className={styles.mainTitle}>Update Dataset</Col>
            </Row>
            <Container className={styles.topContainer}>
            <Row className={styles.row1}>
                <Col md={2}>
                <Form>
                        <Form.Check
                            type="checkbox"
                            label="Public"
                            checked={isCheckedPublic}
                            disabled={true}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Private"
                            checked={isCheckedPrivate}
                            disabled={true}
                        />
                </Form>
                </Col>
                <Col md={2}>
                    <Form.Group>
                    <Form.Label>Field</Form.Label>
                    <Form.Select aria-label="Default select example" value={metadata.field} id="field" disabled={true}>
                        <option value="">---</option>
                        <option value="한국어">한국어</option>
                        <option value="영상이미지">영상이미지</option>
                        <option value="헬스케어">헬스케어</option>
                        <option value="교통물류">교통물류</option>
                        <option value="재난안전환경">재난안전환경</option>
                        <option value="농축수산">농축수산</option>
                        <option value="문화관광">문화관광</option>
                        <option value="스포츠">스포츠</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group controlId="formSelectExample">
                    <Form.Label>Type</Form.Label> {/* 라벨 추가 */}
                    <Form.Select aria-label="Default select example" value={metadata.type} id="type" disabled={true}>
                        <option value="">---</option>
                        <option value="이미지">이미지</option>
                        <option value="비디오">비디오</option>
                        <option value="텍스트">텍스트</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                    <Form.Label>BucketName</Form.Label>
                    <Form.Control type="text" id="bucketName" value={metadata.bucketName} disabled={true}/>
                    </Form.Group>
                </Col>
                <Col md={2} className={styles.saveButton}>
                    <Button onClick={handleSave}>저장</Button>
                </Col>
            </Row>
            </Container>
            <Container className={styles.bodyContainer}>
                <Row>
                    <Col md={{span: 7, offset:1}}>
                        <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Dataset Overview</Form.Label>
                            <Form.Control as="textarea" rows={4} id="overview" onChange={onChange} value={metadata.overview} />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Dataset Details</Form.Label>
                            <Form.Control as="textarea" rows={4} id="details" onChange={onChange} value={metadata.details} />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Dataset How to use</Form.Label>
                            <Form.Control as="textarea" rows={4} id="useMethods" onChange={onChange} value={metadata.useMethods} />
                        </Form.Group>
                        </Row>
                    </Col>
                    <Col md={3} className={styles.fileForm}>
                        <Row className="mb-3">
                            <Col md={{span:7, offset:2}} className={styles.uploadTitle}>File Upload</Col>
                            <Col md={3}>
                            <form>
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

export default UpdateMain;