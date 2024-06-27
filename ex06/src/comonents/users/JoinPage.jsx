import axios from 'axios';
import React, { useState } from 'react'
import {Row, Col, Card, Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const JoinPage = () => {
  const navi = useNavigate();
  const [form,setForm] = useState({
    uid:'red',
    upass:'pass',
    uname:"김레드"
  });
  const{uid,upass,uname} = form;

  const onChangeForm=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const onSubmit = async(e)=>{
    e.preventDefault();
    if(!window.confirm("정말로 가입 하실래요?")) return;
    await axios.post('/users/insert', form);
    alert("회원가입완료!");
    navi('/users/login');
  }

  return (
    <Row className='justify-content-center my-5'>
      <Col xs={8} md={6} lg={4}>
        <Card>
          <Card.Header><h3 className='text-center'>회원가입</h3></Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <Form.Control onChange={onChangeForm} value={uid} name='uid' placeholder='아이디' className='mb-2'/>
              <Form.Control onChange={onChangeForm} value={upass} name='upass' placeholder='비밀번호' className='mb-2'/>
              <Form.Control onChange={onChangeForm} value={uname} name='uname' placeholder='성명' className='mb-2'/>
              <Button className='w-100' type='submit'>회원가입</Button>
            </form>
            <div className='mt-2 text-end'>
              <Link to='/users/login'>로그인</Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default JoinPage