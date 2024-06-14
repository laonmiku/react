import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { InputGroup,Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PassModal = () => {
    const uid= sessionStorage.getItem("uid");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setForm] = useState({
        upass:'pass',
        npass:'1234',
        cpass:"1234"
    });
    const {upass,npass,cpass}=form;
    const onChangeForm =(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onClickSave =async(e)=>{
        //현재비밀번호가 일치
        const res= await axios.get(`/users/${sessionStorage.getItem("uid")}`);
        if(res.data.upass!==upass){
            alert("현재 비밀번호가 일치하지 않습니다.");
            return;
        }
        //현재비민번호와 새비밀번호가 같은지
        if(npass=== upass){
            alert("현재 비밀번호와 동일합니다.다른 비밀번호를 설정하세요.");
            return;
        }
        //새 비밀번호와 비밀번호확인이 같은지
        if(npass!== cpass){
            alert("새로운 비밀번호가 일치하지 않습니다.");
            return;
        }
        //새비밀번호로 업데이트
        if(!window.confirm("비밀번호를 변경하실래요?")) return;
        await axios.post('/users/update/pass', {uid, upass:npass});
        alert("비밀번호 변경 완료! 새롭게 로그인해주세요!");
        sessionStorage.clear();
        window.location.href='/users/login';
    }
    return (
        <>
        <Button variant="white" className='border border1 w-100 mt-1 ' size='sm' onClick={handleShow}>
          비밀번호 변경하기
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          top='30%'
        >
          <Modal.Header closeButton>
            <Modal.Title>비밀번호 변경</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <InputGroup  className='mb-2'>
                    <InputGroup.Text className='w-25 '>현재 비밀번호</InputGroup.Text>
                    <Form.Control onChange={onChangeForm} type='password' name='upass' value={upass}/>
                </InputGroup>
                <InputGroup  className='mb-2'>
                    <InputGroup.Text className='w-25 '>새 비밀번호</InputGroup.Text>
                    <Form.Control onChange={onChangeForm} type='password' name="npass" value={npass}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text className='w-25 '>비밀번호 확인</InputGroup.Text>
                    <Form.Control onChange={onChangeForm} type='password' name='cpass' value={cpass}/>
                </InputGroup>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="white" className='border border-1' onClick={handleClose}>
              닫기
            </Button>
            <Button onClick={onClickSave} variant="light" className='border border-1'>저장</Button>
         </Modal.Footer>
        </Modal>
      </>
    )
}

export default PassModal