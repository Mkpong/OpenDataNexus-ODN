import React from "react";
import styles from './SearchMain.module.css';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function SearchForm() {
    return (
        <Container className={styles.searchMainContainer}>
            <Row className={styles.searchTitle}>
                <Col md={8}>
                    데이터 셋 검색
                </Col>
            </Row>
            <Row className={styles.inputForm}>
                <Col md={3}>
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
                </Col>
                <Col md={3}>
                    <Form.Select aria-label="Default select example">
                        <option>---</option>
                        <option>이미지</option>
                        <option>텍스트</option>
                        <option>비디오</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select aria-label="Default select example">
                        <option>---</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className={styles.inputForm}>
                <Col md={7}>
                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" />
                </Col>
                <Col md={1}>
                <Button variant="light">
                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                </Button>
                </Col>
            </Row>
        </Container>
    );
}

function Dataset() {
    return (
        <>
            <Col lg={3}>
            <Card className={styles.card}>
            <a href={`/datasets/1`}>
            <Card.Body>
                <Row>
                    <Col lg={3}>
                    <div className={styles.roundLabel}>Label</div>
                    </Col>
                </Row>
                <Card.Text className={styles.cardTitle}>Dataset Name</Card.Text>
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
                <Row className={styles.tagRow}>
                    <>
                    <Col lg={3}>
                        <div className={styles.tagLabel}>#hello</div>
                    </Col>
                    </>
                </Row>
                <Row>
                    <Col>
                        <img src="../../../image/download.png" className ={styles.downloadImg} />
                        1423
                    </Col>
                </Row>
            </Card.Body>
            </a>
            </Card>
            </Col>
        </>
    );
}


function SearchMain() {
    return (
        <Container>
            <SearchForm />
            <hr />
            <Container className={styles.resultMainContainer}>
            <Row className={styles.resultRow}>
                <Col md={9} className={styles.resultTitle}>
                데이터 셋(12)
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
                <Dataset />
                <Dataset />
                <Dataset />
                <Dataset />
            </Row>
            </Container>
        </Container>
    );
}

export default SearchMain;