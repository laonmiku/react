import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Col, InputGroup, Row ,Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

    const navi = useNavigate();
    const [form, setForm] = useState({
        uid : 'red',
        upass : 'pass'
    });
    const { uid, upass } = form;
    const onChangeForm = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(uid==="" || upass==="") {
          alert("아이디또는 비밀번호를 입력하세요!");
          return;
        }
        //로그인체크
        //console.log(uid, upass);
        const res=await axios.post("/users/login", form);
        //console.log(res.data.result);
        const result= parseInt(res.data.result);
        if(result===0){
            alert("아이디가 존재하지않습니다");
        }else if(result===2){
            alert("비밀번호가 일치하지않습니다");
        }else if(result===1){
            sessionStorage.setItem("uid",uid);
            navi('/');
        }
      }
    

  return (
    <Row className='justify-content-center my-5'>
        <Col xs={8} md={6} lg={4}>
            <Card>
                <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
                <Card.Body>
                    <form  onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='w-25'>아이디</InputGroup.Text>
                            <Form.Control  name="uid" value={uid} onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text className='w-25'  >비밀번호</InputGroup.Text>
                            <Form.Control  name="upass" value={upass} onChange={onChangeForm}/>
                        </InputGroup>
                        <Button className='w-100 bg-light' type="submit"  variant='outline-secondary' >로그인</Button>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage