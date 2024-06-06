import React from "react";
import styles from './InformationTab.module.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

function Information(props) {
    const content = props.content
    return (
        <>
        {content ? (
        <Row className={styles.infoRow}>
        <Container>
            <Row>
                {props.content}
            </Row>
        </Container>
        </Row>) : (
        <Row className={styles.infoRow}>
        <Container>
            <Row>
                Not Content
            </Row>
        </Container>
        </Row>
        )}
        </>
    );
}

function InformationTab(props) {

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
        <Container>
            <Row className={styles.buttonRow}>
                <Col>
                    <Button variant='none' onClick={() => setOpen1(!open1)} className={styles.infoButton}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>데이터 개요</span>
                            <img src='../../../image/downButton.png' alt="Down" className={styles.downButton} />
                        </div>
                    </Button>
                </Col>
            </Row>
                {open1 && (<Information content={props.dataset.overview} />)}
            <Row className={styles.buttonRow}>
                <Col>
                    <Button variant='none' onClick={() => setOpen2(!open2)} className={styles.infoButton}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>데이터 세부 정보</span>
                            <img src='../../../image/downButton.png' alt="Down" className={styles.downButton} />
                        </div>
                    </Button>
                </Col>
            </Row>
                {open2 && (<Information content={props.dataset.details} />)}
            <Row className={styles.buttonRow}>
                <Col>
                    <Button variant='none' onClick={() => setOpen3(!open3)} className={styles.infoButton}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>활용 방안</span>
                            <img src='../../../image/downButton.png' alt="Down" className={styles.downButton} />
                        </div>
                    </Button>
                </Col>
            </Row>
                {open3 && (<Information content={props.dataset.useMethods} />)}
        </Container>
    );
}

export default InformationTab;