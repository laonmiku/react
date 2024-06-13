import axios from 'axios';
import React, { useState } from 'react'
import { Card, Col, InputGroup, Row, Form, Button } from 'react-bootstrap'


const LoginPage = () => {
    const [form, setForm] = useState({
        uid:'red',
        upass:'pass'
    });
    const {uid,upass} = form;
    const onChangeForm=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onSubmit= async(e)=>{
        e.preventDefault();
        const res=await axios.get(`/users/${uid}`);
        console.log(res.data);
        if(!res.data) alert("아이디가 존재하지 않습니다");
        else if(upass=== res.data.upass) {
            alert("로그인 성공");
            sessionStorage.setItem("uid", res.data.uid);
            sessionStorage.setItem("uname",res.data.uname);
            if(sessionStorage.getItem('target')) 
                window.location.href=sessionStorage.getItem('target');
            else 
                window.location.href="/";
        }else alert("비밀번호가 일치하지 않습니다");
    }
  return (
    <div>
        <h1>로그인</h1>
        <Row  className='justify-content-center my-5'>
            <Col xs={10} md={6} lg={4}>
                <form onSubmit={onSubmit}>
                    <Card className='text-center'>
                        <Card.Header>
                            로그인
                        </Card.Header>
                        <Card.Body>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title'>아이디</InputGroup.Text>
                                <Form.Control name='uid' value={uid} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup className='mb-4'>
                                <InputGroup.Text className='title'>비밀번호</InputGroup.Text>
                                <Form.Control  name='upass' value={upass} type='password'  onChange={onChangeForm}/>
                            </InputGroup>
                            <Button variant='outline-primary' type='submit' className='w-50'>로그인</Button>
                        </Card.Body>
                    </Card>
                </form>    
            </Col>
        </Row>
    </div>
  )
}

export default LoginPage