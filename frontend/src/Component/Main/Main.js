import React from 'react';
import { Container } from 'react-bootstrap';
import MainTop from './MainTop';
import MainBody from './MainBody';

function Main(){
    return(
        <div>
            <MainTop />
            <Container className={StyleSheet.mainContainer}>
                <MainBody />
            </Container>
        </div>
    );
}

export default Main;