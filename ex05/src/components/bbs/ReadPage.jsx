import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom'
import ReplyPage from './ReplyPage';


const ReadPage = () => {

    const location = useLocation();
    //console.log("로케이션 : ",location);

    const search = new URLSearchParams(location.search);
   // console.log("써치 : ",search);

    const isCnt = search.get('isCnt');
    //console.log(isCnt);
    
    const [form, setForm] = useState("");
    const {bid} = useParams();

    const callAPI= async()=>{
        const res=await axios.get(`/bbs/${bid}?isCnt=${isCnt}`);
        //console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[]);
    
    const onDelete=async()=>{
        if(!window.confirm(`${bid}번 게시글을 삭제 하실래요?`)) return;
        await axios.post(`/bbs/delete/${form.bid}`);
        alert("게시글 삭제 완료!");
        window.location.href="/bbs/list";
    }

    return (
        <div className=''>
            <h1 className='my-5'> 게시글 정보 </h1>
            <Row className='justify-content-center my-5'>
                <Col xs={12} md={12} lg={10}>
                    <Card className='text-start'>
                        <Card.Header>
                            <Row>
                                <Col>
                                    [{bid}] {form.title}
                                </Col>
                                <Col className='text-end'>
                                    조회수 : {form.viewcnt}
                                </Col>
                            </Row>
                            
                        </Card.Header>
                        <Card.Body style={{whiteSpace:'pre-wrap'}}>
                            {form.contents}
                        </Card.Body>
                        <Card.Footer className='text-muted text-end'>
                            Created by {form.uname} on {form.regDate}
                        </Card.Footer>
                    </Card>
                    {sessionStorage.getItem('uid') == form.uid && 
                        <div className='my-3 text-end'>
                            <Link to={`/bbs/update/${form.bid}`}><Button className='w-25'>수정</Button></Link>
                            <Button onClick={onDelete} className='w-25 ms-3' variant='outline-primary'>삭제</Button> 
                        </div>
                    }
                </Col>
            </Row>
            <ReplyPage bid={bid}/>
        </div>
    )
}

export default ReadPage