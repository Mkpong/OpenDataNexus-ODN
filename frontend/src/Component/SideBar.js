import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <Container fluid className="sidebar-container">
      <Row>
        <Col md={12}>
          <Nav className="flex-column">
            <Nav.Item className={styles.mainMenu}>
              Dataset
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.mainMenu}>
              AI(Beta)
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">Train Model</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/ai/test/image">Test Model: image</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.mainMenu}>
              MyPage
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link href="/search">myPage</Nav.Link>
            </Nav.Item>          
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
