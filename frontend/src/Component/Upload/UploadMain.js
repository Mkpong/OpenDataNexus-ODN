import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from './UploadMain.module.css';
import { useDispatch } from "react-redux";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function UploadMain() {
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
      setMetadata({
        ...metadata,
        ["userEmail"]: currentUser.user.email
    })
    } ,[currentUser])

    const [metadata, setMetadata] = useState({
        "userEmail": "",
        "bucketName" : "",
        "overview": "",
        "details": "",
        "useMethods": "",
        "field": "",
        "type": "",
        "isModify": true
    });

    const [isCheckedPublic, setIsCheckedPublic] = useState(true);
    const [isCheckedPrivate, setIsCheckedPrivate] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
  
    // 'Public' 체크박스가 변경되었을 때 호출되는 함수
    const handlePublicChange = () => {
        if(isCheckedPrivate && !isCheckedPublic){
            setIsCheckedPrivate(false); // 'Private' 체크박스는 해제
        }
        setIsCheckedPublic(!isCheckedPublic); // 상태를 반전시킴
        setMetadata({
        ...metadata,
        ["isModify"]: true
        })
    };
  
    // 'Private' 체크박스가 변경되었을 때 호출되는 함수
    const handlePrivateChange = () => {
        if(isCheckedPublic && !isCheckedPrivate){
            setIsCheckedPublic(false); // 'Public' 체크박스는 해제
        }
        setIsCheckedPrivate(!isCheckedPrivate); // 상태를 반전시킴
        setMetadata({
        ...metadata,
        ["isModify"]: false
        })
    };


    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        if(id === "bucketName"){setIsUpload(false)}
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

    // 데이터 셋 존재 여부 조회
    const handleFind = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://220.149.232.224/api/dataset/one?bucketname=${metadata.bucketName}`)
            if(response.data.message =="생성가능"){
                // 조회버튼 비활성화
                setIsUpload(true);
            }
        } catch(error) {
            if(error.response){
                switch(error.response.status){
                    case 409:
                        alert("이미 존재하는 데이터 셋입니다!");
                        setMetadata({
                            ...metadata,
                            ["field"]: "",
                            ["type"]: "",
                            ["overview"]: "",
                            ["details"]: "",
                            ["useMethods"]: "",
                            ["isModify"]: true,
                        })
                        break;
                    default:
                        alert("알수없는 오류 발생");
                        break;
                }
            }
        }

    }

    const handleSave = async (event) => {
    event.preventDefault();
    // 파일을 처리하는 로직을 여기에 추가합니다.
    try {
        const response = await axios.post('http://220.149.232.224/api/dataset/metadata', metadata);
        const bucketId = response.data.bucketId;
        console.log(response.data);
        console.log(response.data.bucketId);
        console.log(bucketId);
        selectedFiles.forEach(async (file, index) => {
            const formData = new FormData();
            formData.append(`file` , file);
            try {
                const response = await axios.post(`http://220.149.232.224/api/dataset/data/${bucketId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (error) {
            }
        })
        axios.put(`http://220.149.232.224/api/dataset/data/size/${bucketId}`)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        navigate("/");
    } catch (error) {
        console.log(error);
    }
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
                <Col md={2}>
                <Form>
                        <Form.Check
                            type="checkbox"
                            label="Public"
                            checked={isCheckedPublic}
                            onChange={handlePublicChange}
                            disabled={isDisabled}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Private"
                            checked={isCheckedPrivate}
                            onChange={handlePrivateChange}
                            disabled={isDisabled}
                        />
                </Form>
                </Col>
                <Col md={2}>
                    <Form.Group>
                    <Form.Label>Field</Form.Label>
                    <Form.Select aria-label="Default select example" value={metadata.field} onChange={onChange} id="field">
                        <option value="">---</option>
                        <option value="한국어">한국어</option>
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
                    <Form.Select aria-label="Default select example" value={metadata.type} onChange={onChange} id="type">
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
                    <Form.Control type="text" placeholder="데이터 셋 이름을 입력하세요." onChange={onChange} id="bucketName" />
                    </Form.Group>
                </Col>
                <Col md={1} className={styles.saveButton}>
                    <Button onClick={handleFind} disabled={isUpload}>조회</Button>
                </Col>
                <Col md={1} className={styles.saveButton}>
                    <Button onClick={handleSave} disabled={!isUpload}>저장</Button>
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

export default UploadMain;