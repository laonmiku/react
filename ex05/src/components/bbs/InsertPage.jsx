import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';

const InsertPage = () => {
    const [form, setForm] = useState({
        uid : sessionStorage.getItem('uid'),
        title:'',
        contents:''
    });
    const {uid,title,contents}=form;
    const onChangeForm=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onReset =()=>{
        setForm({...form,title:'', contents:''});
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post('/bbs/insert',form);
        alert("게시글 등록완료!");
        window.location.href='/bbs/list';
    }
    return (
        <div>
            <h1 className='mb-3'>글쓰기</h1>
            <Row>
                <Col>
                    <form onSubmit={onSubmit}>
                        <Form.Control name="title" value={title} onChange={onChangeForm} placeholder='제목을 입력하세요' className='my-2'/>
                        <Form.Control name="contents" value={contents} onChange={onChangeForm} as="textarea" rows={10} placeholder='내용을 입력하세요'/>
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

export default InsertPage