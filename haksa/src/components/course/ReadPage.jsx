import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import EnrollList from './EnrollList';

const ReadPage = () => {
    const [course,setCourse]=useState('');
    const {lcode} = useParams();
    const {lname,dept,room,pname,instructor,hours,persons,capacity} = course;
    const callAPI= async()=>{
        const res = await axios.get(`/cou/${lcode}`);
        console.log(res.data);
        setCourse(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[]);
    return (
        <div>
            <h1 className='my-5'>강좌정보</h1>
            <div className='text-end'>
                <Link to={`/cou/update/${lcode}`}>정보수정하기</Link>
            </div>
            <Table bordered hover>
                <tbody >
                    <tr >
                        <td className='bg-light'>강좌번호 </td>
                        <td>{lcode}</td>
                        <td className='bg-light'>강좌이름</td>
                        <td>{lname}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td colSpan={2} className='bg-light'> 개설학과 </td> 
                        <td colSpan={2}>{dept}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td className='bg-light'>강의실 </td>
                        <td>{room ? `${room}호`: `-` }</td>
                        <td className='bg-light'>강의시간</td>
                        <td>{hours ? `${hours}시간` : `-`}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td colSpan={2} className='bg-light'>담당교수</td>
                        <td colSpan={2}>{pname ? `${pname} (${instructor})` : `미정`}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td colSpan={2} className='bg-light'>수강자 현황</td>
                        <td colSpan={2}>{persons>0 ? `${persons}/${capacity}명` : `0명`}</td>
                    </tr>
                </tbody>
            </Table>
            <EnrollList lcode={lcode}/>
        </div>
    )
}

export default ReadPage