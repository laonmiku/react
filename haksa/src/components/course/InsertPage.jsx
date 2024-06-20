import React, { useContext, useState } from 'react'
import { Table, Button, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../../context/BoxContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const InsertPage = () => {
    const [dept,setDept] = useState('교양');
    const [lname,setLname] = useState('');
    const{setBox} = useContext(BoxContext);
    const navi=useNavigate();
    
    const onSubmit=async()=>{
        if(lname===''){
            setBox({
                show:true,
                message:'강좌이름을 적어주세요!'
            });
            return;
        }
        await axios.post('/cou/insert',{dept,lname});
        setBox({
            show:true,
            message:'강좌가 등록되었습니다. 목록페이지로 돌아가실래요?',
            action:()=>navi('/cou')
        });
        setLname('');
    }
    
    return (
        <div>
            <h1>강좌 등록하기</h1>
            <Row>
                <Col>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>개설학과</InputGroup.Text>
                        <Form.Select value={dept} onChange={(e)=>setDept(e.target.value)}>
                            <option value='전산'>컴퓨터정보학과</option>
                            <option value='전자'>전자공학과</option>
                            <option value='건축'>건축공학과</option>
                            <option value='교양'>교양인문학부</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>강좌제목</InputGroup.Text>
                        <Form.Control value={lname} onChange={(e)=>setLname(e.target.value)} />
                    </InputGroup>
                    <div className='text-center my-3'>
                        <Button onClick={onSubmit} className='px-5 me-3' variant='outline-primary'>등록</Button>
                        <Button className='px-5 ' variant='outline-danger'>취소</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default InsertPage