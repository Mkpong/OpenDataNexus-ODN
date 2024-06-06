import React from "react";
import styles from './MainTop.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainTop() {

    const [activeTab, setActiveTab] = useState('이미지');
    const [fieldValue, setFieldValue] = useState("");
    const [keywordValue, setKeywordValue] = useState("");
    const navigate = useNavigate();

      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    const handleSubmit = () => {
        navigate('/search', {state: {type: activeTab, field: fieldValue, keyword: keywordValue}});
    }

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
                        <Tab eventKey="이미지" title="이미지">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setFieldValue(e.target.value)}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" onChange={(e)=>setKeywordValue(e.target.value)}/>
                                </Col>
                                <Col lg={1}>
                                <Button variant="light" onClick={handleSubmit}>
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="비디오" title="비디오">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setFieldValue(e.target.value)}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" onChange={(e)=>setKeywordValue(e.target.value)}/>
                                </Col>
                                <Col lg={1}>
                                <Button variant="light" onClick={handleSubmit}>
                                    <img src="../../../image/searchIcon.png" className={styles.serachIcon}/>
                                </Button>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="텍스트" title="텍스트">
                            <Row className={styles.inputForm}>
                                <Col lg={3}>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setFieldValue(e.target.value)}>
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
                                <Col lg={8}>
                                    <Form.Control type="text" placeholder="원하는 데이터 셋 이름 또는 카테고리를 입력하세요!" onChange={(e)=>setKeywordValue(e.target.value)}/>
                                </Col>
                                <Col lg={1}>
                                <Button variant="light" onClick={handleSubmit}>
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