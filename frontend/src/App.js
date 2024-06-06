import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom"
import { Row, Col } from 'react-bootstrap';
import NavBar from './Component/NavBar';
import { useState } from 'react';
import Main from './Component/Main/Main';
import Login from './Component/Login/Login'
import BottomBar from './Component/BottomBar';
import Register from './Component/Login/Register';
import DetailMain from './Component/DatasetDetail/DetailMain';
import SearchMain from './Component/SearchDataset/SearchMain';
import SideBar from './Component/SideBar';
import UploadMain from './Component/Upload/UploadMain';
import UpdateMain from './Component/Update/UpdateMain';
import TestMain from './Component/AITest/TestMain';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="App">
      <container>
        <Row>
          <Col>
            <NavBar toggleSidebar={toggleSidebar}/>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/datasets/:id" element={<DetailMain />} />
              <Route path="/search" element={<SearchMain />} />
              <Route path="/upload" element={<UploadMain />} />
              <Route path="/update/:id" element={<UpdateMain />} />
              <Route path="/ai/test/:type" element={<TestMain />} />
            </Routes>
            <BottomBar />
          </Col>
          {sidebarOpen && (
            <Col lg={2}><SideBar /></Col>
            )}
        </Row>
      </container>
    </div>
  );
}

export default App;
