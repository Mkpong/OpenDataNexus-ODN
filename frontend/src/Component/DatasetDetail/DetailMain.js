import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // react-router-dom의 useParams 훅을 사용하여 URL 매개변수에 접근합니다.
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DetailTop from './DetailTop';
import DetailBody from './DetailBody';

const DetailMain = () => {
  const { id } = useParams(); // URL에서 id 매개변수를 가져옵니다.
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    // id를 사용하여 API를 호출하고 해당 데이터셋을 가져옵니다.
    // 예를 들어, fetch나 axios를 사용하여 API 호출을 수행할 수 있습니다.
    const fetchDataset = async () => {
      try {
        const response = await fetch(`API_URL/${id}`); // API_URL은 실제 API 엔드포인트의 URL로 대체해야 합니다.
        const data = await response.json();
        setDataset(data);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
    };

    fetchDataset();
  }, [id]); // id가 변경될 때마다 useEffect가 실행됩니다.

//   if (!dataset) {
//     return <div>Loading...</div>; // 데이터셋이 로딩 중일 때 표시됩니다.
//   }

  return (
    <Container className="mt-4">
        <DetailTop />
        <DetailBody></DetailBody>
    </Container>
  );
};

export default DetailMain;
