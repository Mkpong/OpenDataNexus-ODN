import React from "react";
import { Nav, Container, Navbar, Button, NavDropdown, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import { useState } from "react";
import SideBar from "./SideBar";

function NavBar({toggleSidebar}){
    return(
        <Container className='mb-2'>
        <Navbar bg="light" expand="lg" className={styles.navbar}>
          <Navbar.Brand href="/" className={styles.logo}>
            <img src="../../image/mainlogo.png" className={styles.mainImage} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Nav>
            <Button as={Link} to="/login" variant="light" className={styles.button1}>로그인/회원가입</Button>
            </Nav>
            <Button variant="light" onClick={toggleSidebar}>
                <img src="../../image/dropdown.png" alt="Dropdown Image" className={styles.dropdownImage}/> {/* 이미지 */}
            </Button>
          </Navbar.Collapse>
          
      </Navbar>
      </Container>
    );
}

export default NavBar;