import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import styles from './MainBody.module.css';
import { useState, useEffect } from "react";
import axios from "axios";

function MainBody() {

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        axios.get("http://220.149.232.224:30080/api/dataset/all")
        .then((response) => setDatasets(response.data))
        .catch((error) => console.log(error))
    } , []);

    return (
        <Container>
            <Row className={styles.title}>
                DataSet({datasets.length}개)
            </Row>
            <Row>
        {datasets && datasets.map((item, index) => (
            <>
            <Col lg={3}>
            <Card key={index} className={styles.card}>
            <a href={`/datasets/${item.id}`}>
            <Card.Body>
                <Row>
                    <Col className={styles.labelCol}>
                    <div className={styles.fieldLabel}>{item.field}</div>
                    </Col>
                </Row>
                <Card.Text className={styles.cardTitle}>{item.bucketName}</Card.Text>
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
                <Row className={styles.tagRow}>
                    <Col lg={3}>
                        <div className={styles.tagLabel}>{item.isModify ? <>#Public</> : <>#Private</>}</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img src="../../../image/download.png" className ={styles.downloadImg} />
                        {item.downloadCnt}
                    </Col>
                </Row>
            </Card.Body>
            </a>
            </Card>
            </Col>
            </>
        ))}
            </Row>
        </Container>
    );
}

export default MainBody;