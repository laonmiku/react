import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { Button, Table } from 'react-bootstrap';
import { BoxContext } from '../../context/BoxContext';

const EnrollList = ({lcode}) => {
    const [checked,setChecked] = useState(0);
    const{setBox} = useContext(BoxContext);
    const [list,setList] = useState([]);
    const [enroll,setEnroll] = useState([]);
   
    useEffect(()=>{
        let cnt=0;
        list.forEach(stu=>stu.checked && cnt++);
        setChecked(cnt);
    },[list]);
    const callAPI=async()=>{
        const res=await axios.get(`/enroll/lcode/${lcode}`);
        const data=res.data.map(stu=>stu && {...stu, num:stu.grade} );
        setList(res.data);
        setEnroll(data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const onChangeGrade =(e,scode)=>{
        let grade = e.target.value.replace(/[^0-9]/g,'');
        if(grade>100){
            grade=100;
        } 
        const data = list.map(stu=> stu.scode==scode ? {...stu, grade} : stu );
        setList(data);
    }
    const onClickUpdate =(stu)=>{
        if(stu.num == stu.grade) return;
        setBox({
            show:true,
            message:'점수를 수정하실래요?',
            action:async()=>{
                await axios.post('/enroll/update', {lcode,scode:stu.scode,grade:stu.grade});
                callAPI();
            }
        });
    }
    const onChangeAll =(e)=>{
        const data = list.map(stu=> stu && {...stu,checked:e.target.checked});
        setList(data);
    }
    const onChangeSingle =(e,scode)=>{
        const data = list.map(stu=> stu.scode===scode ? {...stu,checked:e.target.checked}: stu);
        setList(data);
    }
    const onClickedUpdate=()=>{
        if(checked === 0){
            setBox({show:true, message:'수정할 학생을 선택하세요.'});
            return;
        }
        setBox({
            show:true, 
            message:'성적을 수정하실래요?',
            action:()=>{
                let cnt=0;
                list.forEach(async stu=>{
                    if(stu.checked){
                        await axios.post('/enroll/update', {lcode,scode:stu.scode,grade:stu.grade});
                        cnt++;
                    }
                    if(cnt===checked) callAPI();
            })
            }
        });
    }
    return (
        <div>
            <h1 className='my-3'>수강생 목록</h1>
            <div className='text-start mb-2'>
                <input type='checkbox' onChange={onChangeAll} checked={list.length===checked}/>
                <Button onClick={onClickedUpdate} className='ms-2 'size='sm' variant='outline-info'>선택항목저장</Button>
            </div>
            <Table className='table table-bordered'>
                <thead>
                    <tr className='table-light'>
                        <td>학번</td>
                        <td>이름</td>
                        <td>전공</td>
                        <td>학년</td>
                        <td>수강신청일</td>
                        <td >점수</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(stu=>
                        <tr key={stu.scode}>
                            <td> <input onChange={(e)=>onChangeSingle(e,stu.scode)} type='checkbox' checked={stu.checked}/></td>
                            <td>{stu.scode}</td>
                            <td>{stu.sname}</td>
                            <td>{stu.dept} (지도교수:{stu.pname})</td>
                            <td>{stu.year}</td>
                            <td>{stu.fmtdate}</td>
                            <td className='text-middle'>
                                <input onChange={(e)=>onChangeGrade(e,stu.scode)} value={stu.grade} size={3} className='text-end '/>
                                <Button onClick={(e)=>onClickUpdate(stu)} variant='outline-info' className='ms-1 mb-1' size='sm'>수정</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default EnrollList