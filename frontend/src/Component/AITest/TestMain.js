import React from "react";
import { useParams } from "react-router-dom";

function TestMain() {
    const { type } = useParams(); // URL에서 id 매개변수를 가져옵니다.

    return (
        <div>AI Test Main Page - {type}</div>
    );
}

export default TestMain;