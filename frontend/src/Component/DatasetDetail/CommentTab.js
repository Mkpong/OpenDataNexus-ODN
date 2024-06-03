import React from "react";
import styles from './CommentTab.module.css';
import { Container, Row, Col, Button } from "react-bootstrap";

function Comment() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md={8} className={styles.commentWriter}>
                    leeja042499@gmail.com
                </Col>
            </Row>
            <Row>
                <Col md={8} className="text-start">
                위 예제는 Flask와 SQLAlchemy를 사용하여 MySQL 데이터베이스에서 데이터를 페이징 처리하는 방법을 보여줍니다.
                SQLAlchemy의 paginate 메서드를 사용하여 페이징을 간단하게 구현할 수 있습니다.
                이를 통해 클라이언트 애플리케이션에서 많은 데이터를 효율적으로 관리하고 표시할 수 있습니다.
                </Col>
            </Row>
            {/* 아래 버튼은 작성자만 나타나게 */}
            <Row>
                <Col md={4} className={styles.commentDate}>2024-06-02 17:20</Col>
                <Col md={{span:1, offset:6}} className="d-flex justify-content-end">
                    <Button variant="light" className={styles.downloadButton}>수정</Button>
                </Col>
                <Col md={1} className="d-flex justify-content-start">
                    <Button variant="danger" className={styles.downloadButton}>삭제</Button>
                </Col>
            </Row>
            <hr />
        </Container>
    );
}

function CommentTab() {
    return (
        <div>
            <Comment />
        </div>
    );
}


export default CommentTab;