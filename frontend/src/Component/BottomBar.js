import React from 'react';
import { Container, Row , Col } from 'react-bootstrap';
import styles from './BottomBar.module.css';

function BottomBar() {
    return (
        <>
        <Container className='mt-3'>
            <Row>
                <Col className='text-center'>
                    <a href='https://github.com/Mkpong'>Github</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='#'>광고문의</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='#'>이용약관</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='#'>개인정보 처리방침</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='#'>찾아오시는 길</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <a href='#'>공지사항</a>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default BottomBar;