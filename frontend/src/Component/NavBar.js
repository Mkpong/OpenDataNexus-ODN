import React from "react";
import { Nav, Container, Navbar, Button, NavDropdown, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
import { useState } from "react";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserAction from "../Actions/UserAction";
import allActions from "../Store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar({toggleSidebar}){
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      console.log(currentUser);
    } ,[currentUser])

    const logout = () => {
      const confirmLogout = window.confirm("정말 로그아웃하시겠습니까?");
      if (confirmLogout) {
          dispatch(allActions.UserAction.logoutUser());
          navigate("/");
      }
    }

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
            {!currentUser.login ? <Button as={Link} to="/login" variant="light" className={styles.button1}>로그인/회원가입</Button> : 
            <><Button variant="light" className={styles.buttonEmail}>{currentUser.user.email}님</Button>
              <Button onClick={logout} variant="light" className={styles.button1}>로그아웃</Button>
            </> }
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