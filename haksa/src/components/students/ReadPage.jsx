import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'

const ReadPage = () => {
    const [student, setStudent] = useState('');
    const {scode} = useParams();
    const callAPI=async()=>{
        const res = await axios.get(`/stu/${scode}`);
        console.log(res.data);
        setStudent(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const {sname,dept,birthday,advisor,pname,year} = student;
    return (
        <div>
            <h1 className='my-5'>{scode}번 학생정보</h1>
            
            <div className='text-end'><Link to={`/stu/update/${scode}`}>정보수정</Link></div>
            <Table bordered hover>
                <tbody >
                    <tr >
                        <td className='bg-light'>학번 </td>
                        <td>{scode}</td>
                        <td className='bg-light'>성명</td>
                        <td>{sname}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td colSpan={2} className='bg-light'>생년월일 </td> 
                        <td colSpan={2}>{birthday}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td className='bg-light'>학년 </td>
                        <td>{year}</td>
                        <td className='bg-light'>학과 </td>
                        <td>{dept}</td>
                    </tr>
                    <div style={{height:"10px"}}>&nbsp;</div>
                    <tr>
                        <td colSpan={2} className='bg-light'>담당교수</td>
                        <td colSpan={2}>{pname && `${pname} (${advisor})`}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ReadPage