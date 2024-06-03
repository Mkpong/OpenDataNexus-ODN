import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import styles from './MainBody.module.css';

function MainBody() {

    const Top5Place = [
        { place: '경복궁', source: '../../../image/top1.png' },
        { place: 'N서울타워', source: '../../../image/top2.png' },
        { place: '경주랜드', source: '../../../image/top3.png' },
        { place: '에버랜드', source: '../../../image/top4.png' },
        { place: '경복궁', source: '../../../image/top1.png' },
        { place: 'N서울타워', source: '../../../image/top2.png' },
        { place: '경주랜드', source: '../../../image/top3.png' },
        { place: '에버랜드', source: '../../../image/top4.png' },
      ];

    return (
        <Container>
            <Row className={styles.title}>
                DataSet
            </Row>
            <Row>
        {Top5Place.map((item, index) => (
            <>
            <Col lg={3}>
            <Card key={index} className={styles.card}>
            <a href={`/datasets/${index}`}>
            <Card.Body>
                <Row>
                    <Col lg={3}>
                    <div className={styles.roundLabel}>Label</div>
                    </Col>
                </Row>
                <Card.Text className={styles.cardTitle}>Dataset Name</Card.Text>
                <img src="../../../image/searchIcon.png" className={styles.cardImg} />
                <Row className={styles.tagRow}>
                    <Col lg={3}>
                        <div className={styles.tagLabel}>#hello</div>
                    </Col>
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
        ))}
            </Row>
        </Container>
    );
}

export default MainBody;