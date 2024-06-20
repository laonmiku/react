import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Table,Card,InputGroup,Form,Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../../context/BoxContext';

const UpdatePage = () => {
    const navi=useNavigate();
    const {setBox} = useContext(BoxContext);
    const [loading, setLoading] = useState(false);
    const [list,setList] = useState([]);
    const [form, setForm] = useState('');
    const [student, setStudent] = useState('');//원래데이터저장
    const {scode} = useParams();
    const {sname,dept,birthday,advisor,pname,year} = form;

    const callAPI=async()=>{
        setLoading(true);
        const res = await axios.get(`/stu/${scode}`);
        console.log(res.data);
        setForm(res.data);
        setStudent(res.data);

        const res1=await axios.get(`/pro?page=1&size=100&word=${res.data.dept}`);
        setList(res1.data.list);
        console.log(res1.data.list);
        setLoading(false);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const onChangeForm =(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onClickCancel =()=>{
        if(JSON.stringify(student)===JSON.stringify(form)) return;
        setBox({
            show:true,
            message:'정보수정을 취소하실래요?',
            action:()=>setForm(student)
        })
    }
    const onClickUpdate =()=>{
        if(JSON.stringify(student)===JSON.stringify(form)) return;
        setBox({
            show:true,
            message:'입력된 정보로 수정하실래요??',
            action:async()=>{
                await axios.post(`/stu/update`,form);
                navi(`/stu/read/${scode}`);
            }
        })
    }

    if(loading) return <h1 className='my-5'>로딩중 ......</h1>
    return (
        <div>
            <h1 className='my-5'>{scode}번 정보수정</h1>
            <Card>
                <Card.Body className='justify-content-center' >
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='w-25 ' >학번</InputGroup.Text>
                        <Form.Control className='bg-light' value={scode} readOnly/>
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text  className='w-25 '>성명</InputGroup.Text>
                        <Form.Control value={sname}  name='sname' onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>생년월일</InputGroup.Text>
                        <Form.Control name='birthday' onChange={onChangeForm} value={birthday || '2005-01-01'} type='date'/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text className='w-25 '>학생 학과</InputGroup.Text>
                        <Form.Select className='bg-light' value={dept} readOnly>
                            <option value='전산'>컴퓨터정보학과</option>
                            <option value='전자'>전자공학과</option>
                            <option value='건축'>건축공학과</option>
                        </Form.Select>
				    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>학년</InputGroup.Text>
                        <Form.Control name='year' onChange={onChangeForm} value={year } />
                    </InputGroup>
                    <InputGroup  className='mb-2'>
                        <InputGroup.Text className='w-25 '>지도교수</InputGroup.Text>
                        <Form.Select value={advisor}  name='advisor' onChange={onChangeForm} >
                            {list.map(pro=>
                                <option key={pro.pcode} value={pro.pcode}> {pro.pname} ( {pro.pcode} : {pro.dept} )</option>
                            )}
                        </Form.Select>
                    </InputGroup>
                    <div className='text-center my-3'>
                        <Button onClick={onClickUpdate} className='px-5 me-3' variant='outline-primary'>수정</Button>
                        <Button onClick={onClickCancel} className='px-5 ' variant='outline-danger'>취소</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UpdatePage