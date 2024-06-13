import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePage = () => {
    const navi=useNavigate();
    const {bid} = useParams();
    const [form, setForm] = useState({
        bid,
        title:'',
        contents:''
    });
    const {title,contents} = form;
    const callAPI= async()=>{
        const res=  await axios.get(`/bbs/${bid}?isCnt=false`);
        setForm(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const onChangeForm=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onReset=(e)=>{
        if(!window.confirm('수정취소하실래요?')) return;
        callAPI();
    }
    const onSubmit =async(e)=>{
        e.preventDefault();
        if( form===e.target.value){
            alert('수정된 내용이 없습니다.'); //여긴아직안댐 봐야함!!
        }else{
            if(!window.confirm('변경된 내용을 저장하실래요?')) return;
            await axios.post('/bbs/update',form);
            window.location.href=`/bbs/read/${bid}?isCnt=false`;
            navi('/bbs/list');
        }
    }
  return (
    <div className='text-center '>
        <h1 className='my-5'>게시글 수정</h1>
        <Row className='justify-content-center'>
            <Col xs={12} md={10} lg={8}>
                <form onSubmit={onSubmit}  >
                    <Form.Control onChange={onChangeForm} name="title" value={title} className='my-2'/>
                    <Form.Control onChange={onChangeForm} name='contents' value={contents} as="textarea" rows={10}/>
                    <div className='text-center my-3'>
                        <Button className='px-5' type='submit'>등록</Button>
                        <Button onClick={onReset} className='px-5 ms-2' variant='outline-primary'>취소</Button>
                    </div>
                </form>
            </Col>
        </Row>
    </div>
  )
}

export default UpdatePage