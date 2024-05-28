import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row,Col, Form,Card,InputGroup,Button} from 'react-bootstrap'
import ModalAddress from './ModalAddress';
import ModalPhoto from './ModalPhoto';

const ReadPage = () => {
    const uid=sessionStorage.getItem('uid');
    const [form,setForm] = useState({
        uid:uid,
        uname:'',
        phone:'',
        address1:'',
        address2:''
    });
    const {uname,phone,address1,address2,photo} = form;
    const callAPI=async()=>{
       
        const url=`/users/read/${uid}`;
        const res=await axios.get(url);
        //console.log(res.data);
        setForm(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
      }

    const onSubmit = async(e)=>{
        e.preventDefault();
        if(uname==="" ){
          alert("이름을 입력하세요!");
          return;
        }
        if(!window.confirm("수정하신 정보를 저장하실래요?")) return;
        //수정처리
        const url='/users/update';
        const res = await axios.post(url,form);
        if(res.data.result==1){
            alert('정보수정완료');
            callAPI();
        }
    }  

    return (
        <Row className='justify-content-center my-5 readPage'> 
            <Col xs={12} md={10} lg={8}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center my-2'>마이페이지</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row className='mt-4'>
                            <Col xs={4} md={4} lg={4}>
                                <div className='text-center'>
                                    <ModalPhoto uid={uid} form={form} callAPI={callAPI} photo={photo} />
                                </div>
                            </Col>    
                            <Col>
                                <form onSubmit={onSubmit}>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text  className='justify-content-center mypage_title' >이름</InputGroup.Text>
                                        <Form.Control name='uname' value={uname}  onChange={(e)=>onChangeForm(e)}/>
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text  className='justify-content-center  mypage_title'>번호</InputGroup.Text>
                                        <Form.Control name='phone' value={phone}  onChange={(e)=>onChangeForm(e)}/>
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text className='justify-content-center  mypage_title'>주소</InputGroup.Text>
                                        <Form.Control name='address1' value={address1}  onChange={(e)=>onChangeForm(e)}/>
                                        <ModalAddress form={form} setForm={setForm}/>
                                    </InputGroup>
                                    <Form.Control placeholder='상세주소' name='address2' value={address2}  onChange={(e)=>onChangeForm(e)}/>
                                    <div className='text-center my-3'>
                                        <Button className='me-2 px-5' variant='outline-primary' type='submit'>수정</Button>
                                        <Button onClick={callAPI} className='px-5' variant='outline-secondary'>취소</Button> 
                                    </div>
                                
                                </form>
                            </Col>
                        </Row>        
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ReadPage