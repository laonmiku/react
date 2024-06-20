
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table,Card,InputGroup,Form,Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../../context/BoxContext';

const UpdatePage = () => {
    const navi=useNavigate();
    const {setBox} = useContext(BoxContext);
    const {lcode} = useParams();
    const [list,setList] = useState([]);
    const [course,setCourse]=useState({});
    const [form, setForm] = useState('');
    const {lname,dept,room,instructor,hours,capacity} = form;

    const callAPI= async()=>{
        const res = await axios.get(`/cou/${lcode}`);
        console.log(res.data);
        setForm(res.data);
        setCourse(res.data);

        const res1=await axios.get(`/pro?page=1&size=100&word=${res.data.dept}`);
        setList(res1.data.list);
        console.log(res1.data.list);
    }
    useEffect(()=>{
        callAPI();
        
    },[]);
    const onChangeForm=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onClickCancel =()=>{
        if(JSON.stringify(course)===JSON.stringify(form)) return;
        setBox({
            show:true,
            message:'정보수정을 취소하실래요?',
            action:()=>setForm(course)
        })
    }
    const onClickUpdate =()=>{
        if(JSON.stringify(course)===JSON.stringify(form)) return;
        setBox({
            show:true,
            message:'입력된 정보로 수정하실래요??',
            action:async()=>{
                await axios.post(`/cou/update`,form);
                navi(`/cou/read/${lcode}`);
            }
        })
    }
    return (
        <div>
            <h1 className='my-5'>{lcode}번 강좌 수정하기</h1>
            <Card>
                <Card.Body className='justify-content-center' >
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='w-25 ' >강좌번호</InputGroup.Text>
                        <Form.Control className='bg-light' name='lcode' value={lcode}  readOnly/>
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text  className='w-25 '>강좌이름</InputGroup.Text>
                        <Form.Control name='lname' value={lname} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='w-25 '>개설학과</InputGroup.Text>
                        <Form.Select className='bg-light' value={dept} readOnly>
                            <option value='전산'>컴퓨터정보학과</option>
                            <option value='전자'>전자공학과</option>
                            <option value='건축'>건축공학과</option>
                        </Form.Select>
				    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>강의실</InputGroup.Text>
                        <Form.Control  name='room' value={room} onChange={onChangeForm}  />
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>강의시간</InputGroup.Text>
                        <Form.Control  name='hours' value={hours} onChange={onChangeForm}  />
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>최대수강인원</InputGroup.Text>
                        <Form.Control  name='capacity' value={capacity} onChange={onChangeForm}  />
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>지도교수</InputGroup.Text>
                        <Form.Select value={instructor}  name='instructor' onChange={onChangeForm} >
                            {list.map(pro=>
                                <option key={pro.pcode} value={pro.pcode}> {pro.pname} ( {pro.pcode} : {pro.dept} )</option>
                            )}
                        </Form.Select>
                    </InputGroup>
                    <div className='text-center my-3'>
                        <Button onClick={onClickUpdate}  className='px-5 me-3' variant='outline-primary'>수정</Button>
                        <Button onClick={onClickCancel} className='px-5 ' variant='outline-danger'>취소</Button>
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default UpdatePage