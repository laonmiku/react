import React, { useState } from 'react'
import {Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'
import {app} from '../../firebaseInit'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const JoinPage = () => {
    const navi= useNavigate();
    const auth = getAuth(app);

    const [form,setForm] = useState({
        email:'black@test.com',
        pass:'12341234'
    });
    const {email,pass}=form; 

    const onSubmit =(e)=>{
        e.preventDefault();
        if(email==="" || pass===""){
            alert("이메일과 비밀번호를 입력하세요");
        }else{
            createUserWithEmailAndPassword(auth,email,pass)
            .than(success=>{
                navi('/user/login');
            })
            .catch(error=>{
                alert("회원가입오류: "+error);
            })
        }   
    }  
    const onChangeForm =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
  return (
    <Row className='justify-content-center my-5 userLogin'>
        <Col xs={8} nd={6} lg={5} >
            <Card className='text-center'>
                <Card.Header>
                    <h1 >회원가입</h1>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                            <Form.Control name='email' value={email} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup  className='mt-2'>
                            <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                            <Form.Control name='pass' value={pass} type='password' onChange={onChangeForm}/>
                        </InputGroup>
                        <Button type='submit' className='w-100 mt-3'>회원가입</Button>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default JoinPage