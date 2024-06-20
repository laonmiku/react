import React, { useContext, useState } from 'react'
import { Row,Col, InputGroup, Form, Button } from 'react-bootstrap'
import { BoxContext } from '../../context/BoxContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsertPage = () => {
	const navi = useNavigate();
	const{setBox} = useContext(BoxContext);
	const [sname,setSname] = useState("");
	const [dept, setDept] = useState('전자');

	const onSubmit=async()=>{
		if(sname===''){
			setBox({
				show:true,
				message:'학생이름을 입력하세요!'
			});
			return;
		}
		console.log(sname,dept);
		await axios.post('/stu/insert', {dept,sname});
		setBox({
			show:true, 
			message:`${sname} 학생이 등록되었습니다. \n 학생목록으로 이동하실래요?`,
			action:()=>navi('/stu')
		});
		setSname('');
	}
    return (
        <Row>
            <Col>
				<InputGroup className='mb-2'>
					<InputGroup.Text>학생 학과</InputGroup.Text>
					<Form.Select value={dept} onChange={(e)=>setDept(e.target.value)}>
						<option value='전산'>컴퓨터정보학과</option>
						<option value='전자'>전자공학과</option>
						<option value='건축'>건축공학과</option>
					</Form.Select>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>학생 이름</InputGroup.Text>
					<Form.Control value={sname} onChange={(e)=>setSname(e.target.value)}/>
				</InputGroup>
				<div>
					<Button type='submit' onClick={onSubmit} variant='outline-primary' className='me-3 px-5'>학생등록하기</Button>
					<Button  variant='outline-secondary' className=' px-5'>등록취소하기</Button>
				</div>
            </Col>
        </Row>
    )
}

export default InsertPage