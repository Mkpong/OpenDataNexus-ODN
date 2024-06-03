import React from "react";
import styles from './MainTop.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";

function MainTop() {

    const [activeTab, setActiveTab] = useState('tab1');

      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return(
        <div>
            <Container fluid className={styles.containerMain}>
                <Row >
                    <Col className={styles.maintext}>Find Dataset</Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                    <Container className={styles.containerSub}>
                        <Tabs
                        id="controlled-tab-example"
                        activeKey={activeTab}
                        onSelect={(k) => handleTabChange(k)}
                        >
                        <Tab eventKey="tab1" title="이미지">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" />
                                </Col>
                                <Col lg={1}>
                                <Button variant="light">
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="tab2" title="비디오">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" />
                                </Col>
                                <Col lg={1}>
                                <Button variant="light">
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="tab3" title="텍스트">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" />
                                </Col>
                                <Col lg={1}>
                                <Button variant="light">
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        </Tabs>
                    </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MainTop;