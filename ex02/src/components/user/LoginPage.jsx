import {Table, Button, InputGroup, Form, Col, Row, Card} from 'react-bootstrap';
import React, { useState } from 'react'
import {app} from '../../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const LoginPage = () => {
    const navi = useNavigate();
    const auth = getAuth(app);
    const [form,setForm] = useState({
        email:'red@test.com', pass:'12341234'
    });
    const {email,pass} = form;
    const onChangeForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        if(email==='' || pass ===''){
            alert("이메일과 비밀번호를 입력하세요");
            return;
        }
        //로그인체크
        //alert(`${email}\n${pass}`);
        signInWithEmailAndPassword(auth,email,pass)
        .then(success=>{
            //alert("성공");
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('uid',success.user.uid);
            navi('/');
        })
        .catch(error=>{
            alert('로그인실패 : '+error);
        })
    }
  return (
    <div className='my-5 userLogin'>
        <Row className='justify-content-center'>
            <Col xs={8} md={6} lg={4}>
                <Card>
                    <Card.Header className='text-center'><h3>로그인</h3></Card.Header>
                    <Card.Body>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center' style={{width:100}}>아이디</InputGroup.Text>
                                <Form.Control name='email' value={email} onChange={onChangeForm} placeholder='이메일'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center' style={{width:100}}>비밀번호</InputGroup.Text>
                                <Form.Control name='pass' value={pass} onChange={onChangeForm} placeholder='비밀번호' type='password'/>
                            </InputGroup>
                            <Button className='w-100' variant='outline-dark' type='submit'>로그인</Button>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default LoginPage