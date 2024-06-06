import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // react-router-dom의 useParams 훅을 사용하여 URL 매개변수에 접근합니다.
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DetailTop from './DetailTop';
import DetailBody from './DetailBody';
import axios from 'axios';

const DetailMain = () => {
  const { id } = useParams(); // URL에서 id 매개변수를 가져옵니다.
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    axios.get(`http://220.149.232.224/api/dataset/one?id=${id}`)
    .then((response) => {setDataset(response.data)})
    .catch((error) => console.log(error))
  }, [id]);

  if (!dataset) {
    return <div>Loading...</div>; // 데이터셋이 로딩 중일 때 표시됩니다.
  }

  return (
    <Container className="mt-4">
        <DetailTop dataset={dataset} />
        <DetailBody dataset={dataset}></DetailBody>
    </Container>
  );
};

export default DetailMain;
