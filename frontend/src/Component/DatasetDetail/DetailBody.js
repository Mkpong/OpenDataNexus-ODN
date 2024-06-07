import React from "react";
import styles from './DetailBody.module.css';
import { Container,Row,Col,Tabs,Tab,Form,Button } from "react-bootstrap";
import { useState } from "react";
import InformationTab from "./InformationTab";
import CommentTab from "./CommentTab";

function DetailBody(props) {

    const [activeTab, setActiveTab] = useState('tab1');

      
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return(
        <div>
            <Container>
                <Row className='mt-3'>
                    <Col md={{ span: 10, offset: 1 }}>
                    <Row>
                        <Tabs
                        id="controlled-tab-example"
                        activeKey={activeTab}
                        onSelect={(k) => handleTabChange(k)}
                        >
                        <Tab eventKey="tab1" title="Information" className='mt-2'>
                            <InformationTab dataset={props.dataset} />
                        </Tab>
                        <Tab eventKey="tab2" title="Comment" className="mt-2">
                            <CommentTab dataset={props.dataset} />
                        </Tab>
                        </Tabs>
                    </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailBody;