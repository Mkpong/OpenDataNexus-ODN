import React, { useEffect, useState } from "react";
import styles from './CommentTab.module.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CommentView(props) {
    const currentUser = useSelector(state => state.currentUser);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if(currentUser.login){
            setUserEmail(currentUser.user.email);
        }
    })

    const deleteComment = () => {
        axios.delete(`http://220.149.232.224:30080/api/comment?id=${props.comment.id}`)
        .then((response) => {
            console.log(response)
            window.location.href = `/datasets/${props.datasetid}`;
        })
        .catch((error) => console.log(error));
    }

    const modifyComment = () => {
        props.setComment({
            ...props.comment,
            ['content']: props.comment.content
        })
        props.setIsModify({
            ["status"]: true,
            ["commentId"]: props.comment.id
        });
        props.setIsWrite(true);
    }

    return (
        <Container>
            <Row className={styles.reviewRow}>
                <Col md={8} className={styles.commentWriter}>
                    {props.comment.userEmail}
                </Col>
                {props.comment.userEmail === userEmail && 
                <Col md={{span:2, offset:2}} className="d-flex justify-content-end">
                    <Button variant="light" className={styles.modifyButton} onClick={() => modifyComment()}>수정</Button>
                    <Button variant="danger" className={styles.deleteButton} onClick={() => deleteComment()}>삭제</Button>
                </Col>}
            </Row>
            <Row>
                <Col md={8} className="text-start">
                    {props.comment.content}
                </Col>
            </Row>
            <Row>
                <Col md={4} className={styles.commentDate}>{props.comment.createAt}</Col>
            </Row>
            <hr />
        </Container>
    );
}

function CommentTab(props) {
    const [comment, setComment] = useState({
        "userEmail": "",
        "metadataId": "",
        "content": ""
    });
    const [comments, setComments] = useState();
    const [isWrite, setIsWrite] = useState(false);
    const [isModify, setIsModify] = useState({
        "status": false,
        "commentId": null
    });
    const currentUser = useSelector(state => state.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser.login){
            setComment({
                ...comment,
                ['metadataId']: props.dataset.id,
                ['userEmail']: currentUser.user.email
            })
        }
        if(!isWrite){
        // 리뷰 데이터 불러오기
            axios.get(`http://220.149.232.224:30080/api/comment?id=${props.dataset.id}`)
            .then((response) => {
                console.log(response);
                setComments(response.data);
            })
            .catch((error) => console.log(error));
        }
    }, [isWrite])

    const handleSubmit = () => {
        if(comment.content === "") {
            alert("작성이 필요합니다!")
        }
        else{
            if(isModify.status){
                axios.put(`http://220.149.232.224:30080/api/comment?id=${isModify.commentId}`, comment)
                .then((response)=>{
                    console.log(response.data);
                    window.location.href = `/datasets/${props.dataset.id}`;
                }).catch((error) => console.log(error));
                setIsModify.status(false);
            }
            else{
                axios.post("http://220.149.232.224:30080/api/comment", comment)
                .then((response) => {
                    window.location.href = `/datasets/${props.dataset.id}`;
                })
                .catch((error) => console.log(error))
            }
        }

    }

    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.id]: e.target.value,
        })
    }

    const handleWirteForm = () => {
        if(currentUser.login){
            setIsWrite(true)
        }
        else {
            alert("로그인이 필요한 서비스입니다!")
            navigate("/login");
        }
    }

    return (
        <div>
            
            {!isWrite ? (
                <Row>
                {comments && <><Col className={styles.totalCount}>전체 Comment({comments.length})</Col></>}
                <Col className={styles.writeButton}>
                    <Button onClick={() => handleWirteForm()} variant='info'>리뷰 작성</Button>
                </Col></Row>) : (
                <label className={styles.label}>
                <Row>
                    <Col>
                    
                    <textarea
                        id="content"
                        value={comment.content}
                        onChange={handleChange}
                        className={styles.textAreaInput}
                        required
                    />
                    
                    </Col>
                </Row>
                
                <Row>
                <Col className={styles.writeForm}>
                    <Button className={styles.cancelButton} variant="danger" onClick={() => setIsWrite(false)}>취소</Button>
                    <Button className={styles.submitButton} variant="info" onClick={() => handleSubmit()}>작성</Button>
                </Col>
                </Row></label>
            )}
            <Row>
            {comments ? (comments.map((item, index) => {
               return ( <CommentView comment={item} datasetid={props.dataset.id} setIsWrite={setIsWrite} setComment={setComment} setIsModify={setIsModify} /> );
            })): (
                <>{!isWrite && <div className={styles.notReview}>댓글이 존재하지 않습니다.</div>}</>
            )}
            </Row>
        </div>
    );
}


export default CommentTab;