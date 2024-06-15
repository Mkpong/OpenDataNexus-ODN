import React, { useEffect } from "react";
import styles from './SearchMain.module.css';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function SearchForm({ searchParams, setSearchParams, handleSearch }) {
    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchParams);
        handleSearch();
    };

    return (
        <Container className={styles.searchMainContainer}>
            <Row className={styles.searchTitle}>
                <Col md={8}>
                    데이터 셋 검색
                </Col>
            </Row>
            <Row className={styles.inputForm}>
                <Col md={3}>
                    <Form.Select aria-label="Default select example" id="field" onChange={handleChange} value={searchParams.field}>
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
                </Col>
                <Col md={3}>
                    <Form.Select aria-label="Default select example" id="type" onChange={handleChange} value={searchParams.type}>
                        <option value="">---</option>
                        <option value="이미지">이미지</option>
                        <option value="텍스트">텍스트</option>
                        <option value="비디오">비디오</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className={styles.inputForm}>
                <Col md={7}>
                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" id="keyword" onChange={handleChange} value={searchParams.keyword} />
                </Col>
                <Col md={1}>
                <Button variant="light">
                    <img src="../../../image/searchIcon.png" className={styles.serachIcon} onClick={handleSubmit}/>
                </Button>
                </Col>
            </Row>
        </Container>
    );
}

function Dataset(props) {
    return (
        <>
            <Col lg={3}>
            <Card className={styles.card}>
            <a href={`/datasets/${props.dataset.id}`}>
            <Card.Body>
                <Row>
                    <Col className={styles.labelCol}>
                    <div className={styles.roundLabel}>{props.dataset.field}</div>
                    </Col>
                </Row>
                <Card.Text className={styles.cardTitle}>{props.dataset.bucketName}</Card.Text>
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
                <Row className={styles.tagRow}>
                    <>
                    <Col lg={3}>
                        <div className={styles.tagLabel}>{props.dataset.isModify ? <>#Public</> : <>#Private</>}</div>
                    </Col>
                    </>
                </Row>
                <Row>
                    <Col>
                        <img src="../../../image/download.png" className ={styles.downloadImg} />
                        {props.dataset.downloadCnt}
                    </Col>
                </Row>
            </Card.Body>
            </a>
            </Card>
            </Col>
        </>
    );
}


function SearchMain(props) {
    const [searchParams, setSearchParams] = useState({
        field: "",
        type: "",
        keyword: "",
    });

    const [datasets, setDatasets] = useState([]);
    const location = useLocation();
    

    const handleSearch = async () => {
        console.log(searchParams)
        try {
            const response = await axios.get(`http://220.149.232.224:30080/api/dataset/data/search?type=${searchParams.type}&field=${searchParams.field}&keyword=${searchParams.keyword}`, searchParams);
            setDatasets(response.data);
            // 응답 데이터를 처리하는 로직 추가
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
    
    useEffect(() => {
        if(location.state){
            setSearchParams({
                ...searchParams,
                ['field']: location.state.field,
                ['type']: location.state.type,
                ['keyword']: location.state.keyword
            })
            axios.get(`http://220.149.232.224:30080/api/dataset/data/search?type=${location.state.type}&field=${location.state.field}&keyword=${location.state.keyword}`)
            .then((response) => setDatasets(response.data))
            .catch((error) => console.log(error))
        }
        else{
            axios.get(`http://220.149.232.224:30080/api/dataset/data/search?type=${searchParams.type}&field=${searchParams.field}&keyword=${searchParams.keyword}`)
            .then((response) => setDatasets(response.data))
            .catch((error) => console.log(error))           
        }
    }, [])

    return (
        <Container>
            <SearchForm 
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                handleSearch={handleSearch}
            />
            <hr />
            <Container className={styles.resultMainContainer}>
            <Row className={styles.resultRow}>
                <Col md={9} className={styles.resultTitle}>
                데이터 셋({datasets.length})
                </Col>
                <Col md={3} className={styles.sortCol}>
                <div className={styles.horizontalLayout}>
                <Form.Select aria-label="Default select example" className={styles.sortForm}>
                    <option>---</option>
                    <option>다운로드 순</option>
                    <option>최신 순</option>
                </Form.Select>
                <Button variant="light" className={styles.sortButton}>
                    검색
                </Button>
                </div>
                </Col>
            </Row>
            <Row>
                {datasets && datasets.map((item, index) => (
                    <>
                    <Dataset key={index} dataset={item} />
                    </>
                ))}
            </Row>
            </Container>
        </Container>
    );
}

export default SearchMain;